function login() {
    document.getElementById("pay_food").style.display = "none"
    menus.get_menu();
    table.get_tables();
    /*这里可以注释掉再页面里打开手动刷新*/
}

function service() {
    document.getElementById("hide_bg").style.display = "none"
    document.getElementById("log_form").style.display = "none"
}



function order_food_show() {
    let order = document.getElementById("order_option");
    order.style.background = "#a79e9e";
    let pay_option = document.getElementById("pay_option");
    pay_option.style.background = "#ffffff";
    let out = document.getElementById("out_option");
    out.style.background = "#ffffff";

    let order_food = document.getElementById("order_food");
    let pay_food = document.getElementById("pay_food");
    order_food.style.display = "";
    pay_food.style.display = "none";
}

function pay_food_show() {
    let order = document.getElementById("order_option");
    order.style.background = "#ffffff";
    let pay_option = document.getElementById("pay_option");
    pay_option.style.background = "#a79e9e";
    let out = document.getElementById("out_option");
    out.style.background = "#ffffff";

    let order_food = document.getElementById("order_food");
    let pay_food = document.getElementById("pay_food");
    order_food.style.display = "none";
    pay_food.style.display = "";

}
function out_show() {
    let order = document.getElementById("order_option");
    order.style.background = "#ffffff";
    let pay_option = document.getElementById("pay_option");
    pay_option.style.background = "#ffffff";
    let out = document.getElementById("out_option");
    out.style.background = "#a79e9e";
    location.href = "http://localhost:8080/logout";
}




