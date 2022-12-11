drop database restaurant;
create database if not exists restaurant collate utf8_unicode_ci;
use restaurant;
drop table if exists restaurant.user;
drop table if exists restaurant.picture;
drop table if exists restaurant.order_log;
drop table if exists restaurant.customer;
drop table if exists restaurant.dining_table;
drop table if exists restaurant.bill;
drop table if exists restaurant.dish;
#系统安全：用户
create table if not exists restaurant.user
(
    uid        bigint primary key auto_increment,
    `name`     varchar(20)  not null,
    `password` varchar(256) not null,
    type       varchar(20)  not null default 'waiter' check (type in ('waiter', 'cashier', 'chef', 'senior', 'admin'))
/**
 * 权限控制在后端实现
 * waiter:服务员 查看菜单、剩余饭桌、点菜单；开台、点菜
 * cashier:收银员 查看点菜单，写入账单，清台，新建删除修改餐桌
 * chef:后厨   修改菜单表，修改图片库
 * senior:主管   查看日、月、年流水、日、月、年菜品销量排序
 * admin:管理员 新建用户以及修改职位
 */
);
alter table user
    add constraint user_pk
        unique (name);
#图床
create table if not exists restaurant.picture
(
    `name` varchar(20) not null,
    url    varchar(256) primary key
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
create table if not exists restaurant.customer
(
    cid bigint primary key auto_increment,#订单号
    tid varchar(5) not null,#坐在哪桌
    foreign key (tid) references restaurant.dining_table (tid)
);
#账单
create table if not exists restaurant.bill
(
    cid      bigint primary key,#订单号
    cost     double not null,#成本
    price    double not null,#应收
    received double not null,#实收,虽然感觉没啥用，但还是记着吧
    #`change` double not null,#找零
    #感觉没啥必要，软件实现就行
    `time`   datetime default current_timestamp#时间戳，报表需要用到
);
#菜品
create table if not exists restaurant.dish
(
    did        int primary key,#菜品id
    `name`     varchar(50) not null,#名称
    type       varchar(10) not null,#种类
    `describe` text,#描述
    url        varchar(256),#图片url
    cost       double      not null check (cost > 0),#成本
    price      double      not null check (price > 0),#价格
    foreign key (url) references restaurant.picture (url)#外键可以为空的来着
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

-- view --
drop view if exists restaurant.dish_type;
drop view if exists full_order_log;
drop view if exists temporary_bill;
drop view if exists ruser;
#菜品种类
create view restaurant.dish_type
as
select distinct restaurant.dish.type
from restaurant.dish;
create view full_order_log as
select cid, name, num, cost as unitCost, price as unitPrice, num * cost as cost, num * price as price
from order_log
         left join dish on dish.did = order_log.did;
create view temporary_bill as
select cid, sum(cost) as cost, sum(price) as price
from full_order_log
group by cid;
create view ruser as
select concat(uid) as username, password, type
from restaurant.user
union
select name as username, password, type
from restaurant.user;
-- trigger --
#检查桌子在被删除时是否为空
create trigger table_should_be_empty_before_delete
    before delete
    on restaurant.dining_table
    for each row
begin
    if old.cid <> -1 then
        signal sqlstate 'HY000' set message_text = '桌子不空，无法删除';
    end if;
end;


#开台
use restaurant;
drop function if exists customer_in;
create function customer_in(table_id varchar(5)) returns bigint
    reads sql data
begin
    select cid into @init_cid from restaurant.dining_table where tid = table_id;
    if @init_cid <> -1 then
        SIGNAL SQLSTATE 'HY000' SET MESSAGE_TEXT = '该桌有人占用';
    else
        insert into restaurant.customer (tid) values (table_id);
        select max(cid) into @customer_id from restaurant.customer where tid = table_id;
        update restaurant.dining_table set cid=@customer_id where tid = table_id;
        return @customer_id;
    end if;
end;
# 结账
drop function if exists customer_out;
create function customer_out(table_id varchar(5), receive double) returns boolean
    reads sql data
begin
    select cid into @customer_id from restaurant.dining_table where tid = table_id;
    if @customer_id = -1 then
        SIGNAL SQLSTATE 'HY000' SET MESSAGE_TEXT = '该桌空';
    else
        select sum(cost), sum(price) into @cost, @price from restaurant.full_order_log where cid = @customer_id;
        if isnull(@cost) then
            return true;
        end if;
        insert into restaurant.bill(cid, cost, price, received) VALUES (@customer_id, @cost, @price, receive);
        update restaurant.dining_table set cid= -1 where tid = table_id;
    end if;
    return true;
end;