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

create table if not exists restaurant.picture
(
    `name` varchar(20) primary key,
    `path` varchar(256) not null,
    url    varchar(256) not null
);

create table if not exists restaurant.dining_table
(
    tid varchar(5) primary key,
    num tinyint not null check (num > 0 and num < 100),
    cid bigint  not null default -1
    # -1表示空，否则返回在这张桌上吃饭的人的id
);

create table if not exists restaurant.customer
(
    cid bigint primary key auto_increment,
    tid varchar(5) not null,
    foreign key (tid) references restaurant.dining_table (tid)
);

create table if not exists restaurant.bill
(
    cid      bigint primary key,
    cost     double not null,
    received double not null,
    `change` double not null,
    `time`   datetime default current_timestamp
);
create table if not exists restaurant.dish_type
(
    type          varchar(10) primary key,
    `description` text
);
create table if not exists restaurant.dish
(
    did        int primary key auto_increment,
    `name`     varchar(50) not null,
    type       varchar(10) not null,
    `describe` text,
    url        varchar(256),
    cost       double      not null check (cost > 0),
    price      double      not null check (price > 0),
    foreign key (type) references restaurant.dish_type (type)
);
create table if not exists restaurant.order_log
(
    id     int     not null,
    cid    bigint  not null,
    did    int     not null,
    num    tinyint not null,
    tag    text,
    `time` datetime default current_timestamp,
    primary key (id, cid)
);

drop function if exists calc_bill;
create function calc_bill(customer_id bigint) returns double
    reads sql data
begin
    select sum(num * price)
    into @ret
    from (select did, num from restaurant.order_log where cid = customer_id) billing
             left join restaurant.dish on billing.did = restaurant.dish.did;
    return if(ISNULL(@ret), 0, @ret);
end;
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
