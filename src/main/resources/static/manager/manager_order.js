function login() {
}

function add_show() {
    let add_user_option = document.getElementById("bill_option");
    add_user_option.style.background = "#a79e9e";
    let update_code_option = document.getElementById("dish_option");
    update_code_option.style.background = "#ffffff";
    let out = document.getElementById("out_option");
    out.style.background = "#ffffff";
    let add_user = $("#bill_list")
    add_user[0].style.display=""
    let dish_list = $("#dish_list")
    dish_list[0].style.display="none"
}

function modify_show() {
    let add_user_option = document.getElementById("bill_option");
    add_user_option.style.background = "#ffffff";
    let update_code_option = document.getElementById("dish_option");
    update_code_option.style.background = "#a79e9e";
    let out = document.getElementById("out_option");
    out.style.background = "#ffffff";
    let add_user = $("#bill_list")
    add_user[0].style.display="none"
    let dish_list = $("#dish_list")
    dish_list[0].style.display=""


}

function out_show() {
    let add_user_option = document.getElementById("bill_option");
    add_user_option.style.background = "#ffffff";
    let update_code_option = document.getElementById("dish_option");
    update_code_option.style.background = "#ffffff";
    let out = document.getElementById("out_option");
    out.style.background = "#a79e9e";
    location.href = "waiter.html";
}




