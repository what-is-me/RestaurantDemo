package org.database.restaurant.mapper;


import org.apache.ibatis.annotations.*;
import org.database.restaurant.bean.Dish;

import java.util.List;

@Mapper
public interface DishMapper {
    @Select("select * from restaurant.dish")
    List<Dish> listAll();

    @Insert("replace into restaurant.dish (did, name, type, `describe`, url, cost, price) VALUES (#{did},#{name},#{type},#{describe},#{url},#{cost},#{price});")
    void insert(Dish dish);

    @Delete("delete from restaurant.dish where did=${dish_id}")
    void delete(@Param("dish_id") Long dishId);
}
