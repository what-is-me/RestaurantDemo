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
public class Picture {
    @ApiModelProperty("图片名称")
    private String name;
    @ApiModelProperty("图片地址")
    private String url;
}
