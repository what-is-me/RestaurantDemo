package org.database.restaurant.bean;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    @ApiModelProperty("订单号")
    private Long cid;
    @ApiModelProperty("桌号")
    private String tid;
}
