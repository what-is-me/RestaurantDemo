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
public class OrderLog {

    private long id;
    private long cid;
    private long did;
    private long num;
    private String tag;
    private Date time;

}
