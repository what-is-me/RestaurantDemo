create database if not exists restaurant collate utf8_unicode_ci;
use restaurant;
drop table if exists restaurant.user;
drop table if exists restaurant.picture;
drop table if exists restaurant.order_log;
drop table if exists restaurant.customer;
drop table if exists restaurant.dining_table;
drop table if exists restaurant.bill;
drop table if exists restaurant.dish;
drop table if exists restaurant.dish_type;
#系统安全：用户
create table if not exists restaurant.user
(
    uid        varchar(20) primary key,
    `password` varchar(30) not null,
    type       tinyint     not null default 0
/**
 * 权限控制在后端实现
  都可以修改自己密码
 * 0:服务员 查看菜单、剩余饭桌、点菜单；开台、点菜
 * 1:收银员 查看点菜单，写入账单，清台，新建删除修改餐桌
 * 2:后厨   修改菜单表，修改图片库
 * 3:主管   查看日、月、年流水、日、月、年菜品销量排序
 * 99:管理员 新建用户以及修改职位
 */
);
#图床
create table if not exists restaurant.picture
(
    `name` varchar(20) primary key,
    `path` varchar(256) not null,
    url    varchar(256) not null
);
#桌子表
create table if not exists restaurant.dining_table
(
    tid varchar(5) primary key,#桌子编号
    num tinyint not null check (num > 0 and num < 100),#桌子能坐多少人
    cid bigint  not null default -1
    # -1表示空，否则就是在这张桌上吃饭的人的订单id
);
#define 顾客 订单
#这张表是有必要存在的，否则不满足1nf
create table if not exists restaurant.customer
(
    cid bigint primary key auto_increment,#订单号
    tid varchar(5) not null,#坐在哪桌
    foreign key (tid) references restaurant.dining_table (tid)
);
#账单
create table if not exists restaurant.bill
(
    cid    bigint primary key,#订单号
    cost   double not null,#成本
    price  double not null,#应收
    #received double not null,#实收
    #`change` double not null,#找零
    #感觉没啥必要，软件实现就行
    `time` datetime default current_timestamp#时间戳，报表需要用到
);
#菜品种类
create table if not exists restaurant.dish_type
(
    type          varchar(10) primary key,#种类名
    `description` text#描述
);
#菜品
create table if not exists restaurant.dish
(
    did        int primary key auto_increment,#菜品id
    `name`     varchar(50) not null,#名称
    type       varchar(10) not null,#种类
    `describe` text,#描述
    url        varchar(256),#图片url
    cost       double      not null check (cost > 0),#成本
    price      double      not null check (price > 0),#价格
    foreign key (type) references restaurant.dish_type (type)
);
#点菜表
create table if not exists restaurant.order_log
(
    cid    bigint  not null,#订单号
    did    int     not null,#菜品id
    num    tinyint not null,#点多少
    `time` datetime default current_timestamp,#时间戳，菜品按销量排序用
    primary key (cid, did)
);
/*图床触发器*/
create trigger tr_pic_b_insert
    before insert
    on restaurant.picture
    for each row
begin
    set @src_url = 'picture/download?path=';
    set new.url = concat(@src_url, path);
end;
create trigger tr_pic_b_update
    before update
    on restaurant.picture
    for each row
begin
    set @src_url = 'picture/download?path=';
    set new.url = concat(@src_url, path);
end;
create trigger tr_pic_a_update
    after update
    on restaurant.picture
    for each row
begin
    update restaurant.dish set url=new.url where url = old.url;
end;
create trigger tr_pic_a_delete
    after delete
    on restaurant.picture
    for each row
begin
    set @init_url = 'https://www.manpingou.com/uploads/allimg/180918/25-1P91Q1235E15.jpg';
    update restaurant.dish set url=@init_url where url = old.url;
end;
