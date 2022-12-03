package org.database.restaurant.bean;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderLog {
    @ApiModelProperty("订单号")
    private Long cid;
    @ApiModelProperty("菜品编号")
    private Long did;
    @ApiModelProperty("点了多少")
    private Integer num;
    @ApiModelProperty("点菜时间")
    private Date time;
}
