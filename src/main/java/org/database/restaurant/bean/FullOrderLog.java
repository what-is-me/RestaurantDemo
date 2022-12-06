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
public class FullOrderLog {
    @ApiModelProperty("菜品份数")
    Long num;
    @ApiModelProperty("菜品名称")
    private String name;
    @ApiModelProperty("单价")
    private Double unitPrice;
    @ApiModelProperty("总价")
    private Double price;
}
