package org.database.restaurant.bean;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Dish {

    private long did;
    private String name;
    private String type;
    private String describe;
    private String url;
    private double cost;
    private double price;

}
