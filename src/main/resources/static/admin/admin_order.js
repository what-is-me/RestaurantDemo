function login() {
}

function add_show() {
    let add_user_option = document.getElementById("add_user_option");
    add_user_option.style.background = "#a79e9e";
    let update_code_option = document.getElementById("update_code_option");
    update_code_option.style.background = "#ffffff";
    let out = document.getElementById("out_option");
    out.style.background = "#ffffff";
    let add_user = $("#add_user")
    add_user[0].style.display=""
    let modify_user = $("#modify_user")
    modify_user[0].style.display="none"
}

function modify_show() {
    let add_user_option = document.getElementById("add_user_option");
    add_user_option.style.background = "#ffffff";
    let update_code_option = document.getElementById("update_code_option");
    update_code_option.style.background = "#a79e9e";
    let out = document.getElementById("out_option");
    out.style.background = "#ffffff";
    let add_user = $("#add_user")
    add_user[0].style.display="none"
    let modify_user = $("#modify_user")
    modify_user[0].style.display=""


}

function out_show() {
    let add_user_option = document.getElementById("add_user_option");
    add_user_option.style.background = "#ffffff";
    let update_code_option = document.getElementById("update_code_option");
    update_code_option.style.background = "#ffffff";
    let out = document.getElementById("out_option");
    out.style.background = "#a79e9e";
    location.href = "waiter.html";
}




