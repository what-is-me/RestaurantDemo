package org.database.restaurant.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.database.restaurant.bean.DiningTable;
import org.database.restaurant.mapper.TableMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = "餐桌")
@RestController
@RequestMapping("table")
@PreAuthorize("hasAnyAuthority('admin','waiter','cashier')")
@Slf4j
public class DiningTableController {
    @Autowired
    TableMapper tableMapper;

    @ApiOperation(value = "返回所有餐桌状态")
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<DiningTable> viewTables() {
        return tableMapper.listAll();
    }


    @ApiOperation(value = "新增或者修改餐桌", notes = "false一般因为桌子正在被使用")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "tid", value = "餐桌编号"),
            @ApiImplicitParam(name = "num", value = "餐桌能坐多少人")
    })
    @RequestMapping(value = "/update", method = {RequestMethod.GET, RequestMethod.POST})
    public Boolean updateTable(@RequestParam(value = "tid") String tid,
                               @RequestParam("num") Long num) {
        DiningTable table = DiningTable.builder().tid(tid).num(num).build();
        try {
            tableMapper.insertOrUpdate(table);
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
        return true;
    }

    @ApiOperation(value = "删除餐桌", notes = "false一般因为桌子正在被使用")
    @ApiImplicitParam(name = "tid", value = "餐桌编号")
    @RequestMapping(value = "/delete", method = {RequestMethod.GET, RequestMethod.POST})
    public Boolean deleteTable(@RequestParam(value = "tid") String tid) {
        try {
            tableMapper.delete(tid);
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
        return true;
    }

}
