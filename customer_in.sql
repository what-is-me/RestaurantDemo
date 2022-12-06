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