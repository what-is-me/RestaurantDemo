#先扔点数据到表里
insert into restaurant.dining_table(tid, num)
values ('A1', 2);
insert into restaurant.dining_table(tid, num)
values ('A2', 3);
insert into restaurant.dining_table(tid, num)
values ('A3', 5);
insert into restaurant.dining_table(tid, num)
values ('B1', 2);
insert into restaurant.dining_table(tid, num)
values ('B2', 2);

INSERT INTO restaurant.dish (did, name, type, `describe`, url, cost, price)
VALUES (1, '芹菜肉丝', '田园时蔬', null, null, 20, 32);
INSERT INTO restaurant.dish (did, name, type, `describe`, url, cost, price)
VALUES (2, '韭菜炒豆芽', '田园时蔬', null, null, 15, 20);
INSERT INTO restaurant.dish (did, name, type, `describe`, url, cost, price)
VALUES (3, '炒花蛤', '风味小炒', null, null, 20, 28);
INSERT INTO restaurant.dish (did, name, type, `describe`, url, cost, price)
VALUES (4, '水煮鱼片', '水煮系列', null, null, 40, 56);
INSERT INTO restaurant.dish (did, name, type, `describe`, url, cost, price)
VALUES (5, '毛血旺', '水煮系列', null, null, 40, 52);
INSERT INTO restaurant.dish (did, name, type, `describe`, url, cost, price)
VALUES (6, '米饭', '主食', null, null, 1, 5);


INSERT INTO restaurant.order_log (cid, did, num, time)
VALUES (1, 1, 2, '2022-11-29 23:49:37');
INSERT INTO restaurant.order_log (cid, did, num, time)
VALUES (1, 2, 1, '2022-11-29 23:49:37');
INSERT INTO restaurant.order_log (cid, did, num, time)
VALUES (1, 3, 1, '2022-11-29 23:49:37');
INSERT INTO restaurant.order_log (cid, did, num, time)
VALUES (1, 6, 3, '2022-11-29 23:49:37');
INSERT INTO restaurant.order_log (cid, did, num, time)
VALUES (2, 1, 1, '2022-11-29 23:49:37');
INSERT INTO restaurant.order_log (cid, did, num, time)
VALUES (2, 3, 3, '2022-11-29 23:49:37');
insert into restaurant.user(name, password, type)
VALUES ('admin', '$2a$10$L2KhDtFXm7xadRRgd5N53.3I.bwabdiZ4j.Obzb4nz33TVtqKGCP.', 'admin');# admin
insert into restaurant.user(name, password, type)
VALUES ('waiter', '$2a$10$OAfLTa3Y7YINNNRQtoubkuzS5oB/iJjxpIGJqtuNaNKO9PvSTMrz2', 'waiter');# password