package org.database.restaurant.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.database.restaurant.bean.FullOrderLog;

import java.util.List;

@Mapper
public interface BillMapper {
    @Select("select * from restaurant.full_order_log where cid=${cid};")
    List<FullOrderLog> orderlist(@Param("cid") Long cid);

    @Select("select restaurant.customer_out('${table_id}',${received});")
    Boolean payBill(@Param("table_id") String tid, @Param("received") Double rec);
}
