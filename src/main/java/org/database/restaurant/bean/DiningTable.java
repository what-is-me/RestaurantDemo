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

public class DiningTable {
    @ApiModelProperty("桌号")
    private String tid;
    @ApiModelProperty("能坐多少人")
    private Long num;
    @ApiModelProperty("正在该桌上就餐的人，-1表示空")
    private Long cid;

}
