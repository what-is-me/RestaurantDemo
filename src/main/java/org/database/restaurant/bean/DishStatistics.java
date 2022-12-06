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
public class DishStatistics {
    @ApiModelProperty("菜品编号")
    private Long did;
    @ApiModelProperty("菜品名称")
    private String name;
    @ApiModelProperty("点了多少")
    private Integer num;
    @ApiModelProperty("收益(价格 - 成本)")
    private Double earn;
}
