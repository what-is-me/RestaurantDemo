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
}

function out_show() {
    let order = document.getElementById("order_option");
    order.style.background = "#ffffff";
    let out = document.getElementById("out_option");
    out.style.background = "#a79e9e";
    location.href = "http://localhost:8080/logout";
}




