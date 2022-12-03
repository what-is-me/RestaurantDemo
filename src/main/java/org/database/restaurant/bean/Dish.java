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
public class Dish {
    @ApiModelProperty("菜品编号")
    private Long did;
    @ApiModelProperty("菜名")
    private String name;
    @ApiModelProperty("菜的种类")
    private String type;
    @ApiModelProperty("菜的介绍")
    private String describe;
    @ApiModelProperty("菜的图片url")
    private String url;
    @ApiModelProperty("菜的成本")
    private Double cost;
    @ApiModelProperty("菜的价格")
    private Double price;
}
