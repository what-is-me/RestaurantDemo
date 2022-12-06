package org.database.restaurant.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.database.restaurant.bean.FullOrderLog;
import org.database.restaurant.mapper.BillMapper;
import org.database.restaurant.mapper.TableMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("bill")
@Api(tags = "账单")
@Slf4j
public class BillController {
    @Autowired
    BillMapper billMapper;
    @Autowired
    TableMapper tableMapper;

    @GetMapping("/receipt")
    @ApiOperation("小票")
    @PreAuthorize("hasAnyAuthority('waiter,cashier,admin')")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "cid", value = "订单号(优先)"),
            @ApiImplicitParam(name = "tid", value = "桌号")
    })
    public List<FullOrderLog> receipt(@RequestParam(value = "cid", required = false) Long cid,
                                      @RequestParam(value = "tid", required = false) String tid) {
        if (cid == null) {
            if (tid == null) return new ArrayList<>();
            try {
                cid = tableMapper.tToC(tid).get(0);
            } catch (Exception e) {
                log.error(e.getMessage());
                return new ArrayList<>();
            }
        }
        return billMapper.orderlist(cid);
    }

    @GetMapping("/pay")
    @ApiOperation(value = "结账", notes = "一般false因为这张桌子是空的<br>如果桌子上的客户没有点菜，将直接将桌子置空")
    @PreAuthorize("hasAnyAuthority('cashier,admin')")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "cid", value = "订单号(优先)"),
            @ApiImplicitParam(name = "tid", value = "桌号"),
            @ApiImplicitParam(name = "received", value = "实际付款")
    })
    public Boolean pay(@RequestParam(value = "cid", required = false) Long cid,
                       @RequestParam(value = "tid", required = false) String tid,
                       @RequestParam Double received) {
        if (cid == null && tid == null) return true;
        try {
            if (cid != null) tid = tableMapper.cToT(cid).get(0);
            billMapper.payBill(tid, received);
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
        return true;
    }
}
