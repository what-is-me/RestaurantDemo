package org.database.restaurant.bean;


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
    private long cid;
    private double cost;
    private double received;
    private double change;
    private Date time;
}
