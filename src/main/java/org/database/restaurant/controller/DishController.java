package org.database.restaurant.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.database.restaurant.bean.Dish;
import org.database.restaurant.mapper.DishMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("dish")
@Api(tags = "菜品管理")
@Slf4j
public class DishController {
    @Autowired
    DishMapper dishMapper;
    @Value("${default_pic_url}")
    private String defaultPicUrl;

    @GetMapping("/")
    public Map<String, List<Dish>> listAll() {
        Map<String, List<Dish>> ret = new HashMap<>();
        List<Dish> ld = dishMapper.listAll();
        for (Dish dish : ld) {
            if (dish.getDescribe() == null) dish.setDescribe("");
            if (dish.getUrl() == null) dish.setUrl(defaultPicUrl);
            String key = dish.getType();
            if (!ret.containsKey(key)) ret.put(key, new ArrayList<>());
            ret.get(key).add(dish);
        }
        return ret;
    }

    @PreAuthorize("hasAnyAuthority('chef','admin')")
    @PostMapping("/insert")
    @ApiOperation("插入或者更新")
    public Boolean insert(@RequestParam Long did,
                          @RequestParam String name,
                          @RequestParam String type,
                          @RequestParam(value = "describe", required = false) String describe,
                          @RequestParam(value = "url", required = false) String url,
                          @RequestParam Double cost,
                          @RequestParam Double price) {
        try {
            Dish dish = new Dish(did, name, type, describe, url, cost, price);
            dishMapper.insert(dish);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    @PreAuthorize("hasAnyAuthority('chef','admin')")
    @PostMapping("/delete")
    @ApiOperation("删除")
    public Boolean delete(@RequestParam Long did) {
        try {
            dishMapper.delete(did);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }
}
