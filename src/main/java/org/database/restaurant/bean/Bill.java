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
public class Bill {
    @ApiModelProperty("订单号")
    private Long cid;
    @ApiModelProperty("成本")
    private Double cost;
    @ApiModelProperty("应收")
    private Double price;
    @ApiModelProperty("实收")
    private Double received;
    @ApiModelProperty("付款时间")
    private Date time;
}
