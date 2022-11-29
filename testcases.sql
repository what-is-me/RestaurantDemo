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


INSERT INTO restaurant.dish_type (type, description)
VALUES ('主食', '米饭面食');
INSERT INTO restaurant.dish_type (type, description)
VALUES ('干锅铁板', null);
INSERT INTO restaurant.dish_type (type, description)
VALUES ('水煮系列', null);
INSERT INTO restaurant.dish_type (type, description)
VALUES ('浓汤系列', null);
INSERT INTO restaurant.dish_type (type, description)
VALUES ('海鲜河类', null);
INSERT INTO restaurant.dish_type (type, description)
VALUES ('甜点', null);
INSERT INTO restaurant.dish_type (type, description)
VALUES ('田园时蔬', '当季时蔬，新鲜优质');
INSERT INTO restaurant.dish_type (type, description)
VALUES ('精美冷菜', null);
INSERT INTO restaurant.dish_type (type, description)
VALUES ('酒水', null);
INSERT INTO restaurant.dish_type (type, description)
VALUES ('锅仔系列', null);
INSERT INTO restaurant.dish_type (type, description)
VALUES ('风味小炒', null);


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
