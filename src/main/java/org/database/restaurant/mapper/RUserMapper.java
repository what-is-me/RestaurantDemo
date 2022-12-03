package org.database.restaurant.mapper;

import org.apache.ibatis.annotations.*;
import org.database.restaurant.bean.RUser;

import java.util.List;

@Mapper
public interface RUserMapper {
    @Select("select * from restaurant.user;")
    List<RUser> listAll();

    @Select("select * from restaurant.user where concat(uid) like '${uname}' or name like '${uname}';")
    List<RUser> find(@Param("uname") String username);

    @Insert("insert into restaurant.user (name, password, type) VALUES (#{name},#{password},#{type})")
    void insert(RUser user);

    @Update("update restaurant.user set password='${password}' where concat(uid) like '${uname}' or name like '${uname}';")
    void updatePassword(@Param("uname") String uname, @Param("password") String password);

    @Delete("delete from restaurant.user where concat(uid) like '${uname}' or name like '${uname}';")
    void delete(@Param("uname") String username);
}
