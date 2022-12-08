function login() {
}

function service() {
    document.getElementById("hide_bg").style.display = "none"
    document.getElementById("log_form").style.display = "none"
}



function order_food_show() {
    let order = document.getElementById("order_option");
    order.style.background = "#a79e9e";
    let out = document.getElementById("out_option");
    out.style.background = "#ffffff";
    let swap = document.getElementById("swap_option");
    swap.style.background = "#ffffff";

    let order_food = document.getElementById("order_food");
    let pay_food = document.getElementById("pay_food");
    order_food.style.display = "";
    pay_food.style.display = "none";
}

function swap_show() {
    let order = document.getElementById("order_option");
    order.style.background = "#ffffff";
    let out = document.getElementById("out_option");
    out.style.background = "#ffffff";
    let swap = document.getElementById("swap_option");
    swap.style.background = "#a79e9e";
}

function out_show() {
    let order = document.getElementById("order_option");
    order.style.background = "#ffffff";
    let out = document.getElementById("out_option");
    out.style.background = "#a79e9e";
    let swap = document.getElementById("swap_option");
    swap.style.background = "#ffffff";
    location.href = "login.html";
}




