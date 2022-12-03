package org.database.restaurant.mapper;

import org.apache.ibatis.annotations.*;
import org.database.restaurant.bean.DiningTable;

import java.util.List;

@Mapper
public interface TableMapping {
    @Select("select * from restaurant.dining_table;")
    List<DiningTable> listAll();

    @Insert("replace into restaurant.dining_table(tid, num) values(#{tid}, #{num});")
    void insertOrUpdate(DiningTable diningTable);

    @Delete("delete from restaurant.dining_table where tid='${tid}';")
    void delete(@Param("tid") String tableId);
}
