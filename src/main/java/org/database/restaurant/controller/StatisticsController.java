package org.database.restaurant.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.database.restaurant.bean.Bill;
import org.database.restaurant.bean.DishStatistics;
import org.database.restaurant.mapper.StatisticsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@Api(tags = "统计（报表）")
@PreAuthorize("hasAnyAuthority('senior','admin')")
@RequestMapping("senior")
@Slf4j
public class StatisticsController {
    static DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    @Autowired
    StatisticsMapper statisticsMapper;

    @ApiOperation("日报表")
    @GetMapping("/bills_day")
    public List<Bill> billDay() {
        LocalDate date = LocalDate.now();
        LocalDate r = date.plusDays(1);
        return statisticsMapper.billRange(date.format(fmt), r.format(fmt));
    }

    @ApiOperation("月报表")
    @GetMapping("/bills_month")
    public List<Bill> billMonth() {
        LocalDate date = LocalDate.now().withDayOfMonth(1);
        LocalDate r = date.plusMonths(1);
        return statisticsMapper.billRange(date.format(fmt), r.format(fmt));
    }

    @ApiOperation("年报表")
    @GetMapping("/bills_year")
    public List<Bill> billYear() {
        LocalDate date = LocalDate.now().withDayOfYear(1);
        LocalDate r = date.plusYears(1);
        return statisticsMapper.billRange(date.format(fmt), r.format(fmt));
    }

    @ApiOperation("日菜品受欢迎程度")
    @GetMapping("/dish_day")
    public List<DishStatistics> dishDay() {
        LocalDate date = LocalDate.now();
        LocalDate r = date.plusDays(1);
        return statisticsMapper.dishes(date.format(fmt), r.format(fmt));
    }

    @ApiOperation("月菜品受欢迎程度")
    @GetMapping("/dish_month")
    public List<DishStatistics> dishMonth() {
        LocalDate date = LocalDate.now().withDayOfMonth(1);
        LocalDate r = date.plusMonths(1);
        return statisticsMapper.dishes(date.format(fmt), r.format(fmt));
    }

    @ApiOperation("年菜品受欢迎程度")
    @GetMapping("/dish_year")
    public List<DishStatistics> dishYear() {
        LocalDate date = LocalDate.now().withDayOfYear(1);
        LocalDate r = date.plusYears(1);
        return statisticsMapper.dishes(date.format(fmt), r.format(fmt));
    }
}