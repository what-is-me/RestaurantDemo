package org.database.restaurant.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.database.restaurant.bean.OrderLog;

@Mapper
public interface OrderMapper {
    @Select("select restaurant.customer_in('${tableId}');")
    Long selectTable(@Param("tableId") String tableId);

    @Insert("replace into restaurant.order_log(cid, did, num) VALUES (#{cid},#{did},#{num});")
    void order(OrderLog orderLog);
}
