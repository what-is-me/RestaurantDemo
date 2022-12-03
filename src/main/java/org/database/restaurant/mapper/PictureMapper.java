package org.database.restaurant.mapper;

import org.apache.ibatis.annotations.*;
import org.database.restaurant.bean.Picture;

import java.util.List;

@Mapper
public interface PictureMapper {
    @Insert("replace into restaurant.picture (`name`, url) VALUES (#{name},#{url});")
    void insert(Picture picture);

    @Delete("delete from restaurant.picture where name like '${filename}'")
    void delete(@Param("filename") String filename);

    @Select("select*from restaurant.picture;")
    List<Picture> listAll();
}
