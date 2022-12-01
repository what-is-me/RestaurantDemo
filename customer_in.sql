#开台
drop procedure if exists customer_in;
create procedure customer_in(table_id varchar(5))
begin
    /*declare hasSqlError int default false;
    declare continue handler for sqlexception set hasSqlError = true;*/
    start transaction;

    select cid into @init_cid from restaurant.dining_table where tid = table_id;
    if @init_cid <> -1 then
        rollback;
        SIGNAL SQLSTATE 'HY000' SET MESSAGE_TEXT = '该桌有人占用';
    else
        insert into restaurant.customer (tid) values (table_id);
        select max(cid) into @customer_id from restaurant.customer where tid = table_id;
        update restaurant.dining_table set cid=@customer_id where tid = table_id;
        commit;
    end if;
end;
call customer_in('A2')