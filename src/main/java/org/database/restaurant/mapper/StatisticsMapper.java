package org.database.restaurant.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.database.restaurant.bean.Bill;
import org.database.restaurant.bean.DishStatistics;

import java.util.List;

@Mapper
public interface StatisticsMapper {
    @Select("select * from restaurant.bill where Date('${lDate}')<=Date(time) and Date(time)<Date('${rDate}');")
    List<Bill> billRange(@Param("lDate") String l, @Param("rDate") String r);

    @Select("select tdd.did, name, num, num * (price - cost) as earn from(select did, sum(num) as num from (select * from restaurant.order_log where Date('${lDate}')<=Date(time) and Date(time)<Date('${rDate}')) as td group by did)as tdd left join restaurant.dish on tdd.did=dish.did order by num desc;")
    List<DishStatistics> dishes(@Param("lDate") String l, @Param("rDate") String r);
}
