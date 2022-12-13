package org.database.restaurant.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.database.restaurant.bean.FullOrderLog;
import org.database.restaurant.bean.OrderLog;
import org.database.restaurant.mapper.BillMapper;
import org.database.restaurant.mapper.OrderMapper;
import org.database.restaurant.tools.MailTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;

@Api(tags = "开台点菜")
@RestController
@RequestMapping("waiter")
@PreAuthorize("hasAnyAuthority('waiter','admin')")
@Slf4j
public class WaiterController {
    @Autowired
    OrderMapper orderMapper;
    @Autowired
    BillMapper billMapper;
    @Autowired
    MailTool mailTool;
    @Value("${chef_email}")
    String chefEmail;

    @ApiOperation("开台和点菜")
    @RequestMapping(value = "/order", method = RequestMethod.POST)
    public ResultSet order(@RequestParam String table_id, @RequestBody List<Order> orders) {
        Long cid;
        try {
            cid = orderMapper.selectTable(table_id);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResultSet("餐桌正在被使用或不存在此餐桌");
        }
        try {
            for (Order order : orders) {
                orderMapper.order(order.toOrderLog(cid));
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResultSet("点菜失败");
        }
        List<FullOrderLog> fols = billMapper.orderlist(cid);
        //TODO:发送邮件
        new Thread(() -> {
            StringBuilder content = new StringBuilder();
            content.append("<html><body><table class='table table-hover'>");
            content.append("<thead><tr><th>菜名</th><th>份数</th></tr></thead><tbody>");
            for (FullOrderLog fol : fols) {
                content.append(String.format("<tr><td>%s</td><td>%d</td></tr>", fol.getName(), fol.getNum()));
            }
            content.append("</tbody></table></body></html>");
            try {
                mailTool.sendHTMLMail(chefEmail, "新的订单" + cid.toString(), content.toString());
            } catch (MessagingException e) {
                log.error(e.getMessage());
            }
        }).start();
        return new ResultSet(null, cid, fols);
    }
}

@Data
class Order {
    @ApiModelProperty("菜品编号")
    Long did;
    @ApiModelProperty("菜品数量")
    Integer num;

    public OrderLog toOrderLog(Long cid) {
        return new OrderLog(cid, did, num, null);
    }
}

@Data
@AllArgsConstructor
class ResultSet {
    @ApiModelProperty("报错")
    String error;
    @ApiModelProperty("订单编号")
    Long cid;
    @ApiModelProperty("小票")
    List<FullOrderLog> orderList;

    ResultSet(String error) {
        this.error = error;
    }
}