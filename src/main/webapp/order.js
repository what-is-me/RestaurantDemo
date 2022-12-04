function login(){
    document.getElementById("pay_food").style.display="none"

}
function service(){
    document.getElementById("hide_bg").style.display="none"
    document.getElementById("log_form").style.display="none"
}
function end_pay(){
    var table_number = document.getElementById('table_number').value;
    var total_money = document.getElementById("total_money").value;
    if(table_number!=""&&total_money!=="0"){
        /*这里记录账单*/
    }
    else {
        alert("还没有填写桌号或还未点菜");
    }
}

function order_food_show(){
    var order = document.getElementById("order_option");
    order.style.background="#a79e9e";
    var pay_option = document.getElementById("pay_option");
    pay_option.style.background="#ffffff";
    var out = document.getElementById("out_option");
    out.style.background="#ffffff";
    var swap = document.getElementById("swap_option");
    swap.style.background="#ffffff";

    var order_food = document.getElementById("order_food");
    var pay_food = document.getElementById("pay_food");
    order_food.style.display="";
    pay_food.style.display="none";
}
function pay_food_show(){
    var order = document.getElementById("order_option");
    order.style.background="#ffffff";
    var pay_option = document.getElementById("pay_option");
    pay_option.style.background="#a79e9e";
    var out = document.getElementById("out_option");
    out.style.background="#ffffff";
    var swap = document.getElementById("swap_option");
    swap.style.background="#ffffff";

    var order_food = document.getElementById("order_food");
    var pay_food = document.getElementById("pay_food");
    order_food.style.display="none";
    pay_food.style.display="";

}
function swap_show(){
    var order = document.getElementById("order_option");
    order.style.background="#ffffff";
    var pay_option = document.getElementById("pay_option");
    pay_option.style.background="#ffffff";
    var out = document.getElementById("out_option");
    out.style.background="#ffffff";
    var swap = document.getElementById("swap_option");
    swap.style.background="#a79e9e";
}
function out_show(){
    var order = document.getElementById("order_option");
    order.style.background="#ffffff";
    var pay_option = document.getElementById("pay_option");
    pay_option.style.background="#ffffff";
    var out = document.getElementById("out_option");
    out.style.background="#a79e9e";
    var swap = document.getElementById("swap_option");
    swap.style.background="#ffffff";
    location.href = "login.html";
}

function compute(){
    var total_money=0;
    var pay_u = document.getElementById("pay_main");
    for(var i=0;i<pay_u.getElementsByTagName("li").length;i++){

        var l = pay_u.children.item(i).children.item(0).children.item(0);
        total_money = total_money + l.children.item(1).innerHTML*l.children.item(2).value;

    }

    var cold = document.getElementById("pay_cold");
    for(var i=0;i<cold.getElementsByTagName("li").length;i++){

        var l = cold.children.item(i).children.item(0).children.item(0);
        total_money = total_money + l.children.item(1).innerHTML*l.children.item(2).value;

    }
    var hot = document.getElementById("pay_hot");
    for(var i=0;i<hot.getElementsByTagName("li").length;i++){

        var l = hot.children.item(i).children.item(0).children.item(0);
        total_money = total_money + l.children.item(1).innerHTML*l.children.item(2).value;

    }

    var snack = document.getElementById("pay_snack");
    for(var i=0;i<snack.getElementsByTagName("li").length;i++){

        var l = snack.children.item(i).children.item(0).children.item(0);
        total_money = total_money + l.children.item(1).innerHTML*l.children.item(2).value;

    }

    var cook = document.getElementById("pay_cook");
    for(var i=0;i<cook.getElementsByTagName("li").length;i++){

        var l = cook.children.item(i).children.item(0).children.item(0);
        total_money = total_money + l.children.item(1).innerHTML*l.children.item(2).value;

    }

    var drink = document.getElementById("pay_drink");
    for(var i=0;i<drink.getElementsByTagName("li").length;i++){

        var l = drink.children.item(i).children.item(0).children.item(0);
        total_money = total_money + l.children.item(1).innerHTML*l.children.item(2).value;

    }
    document.getElementById("total_money").innerText=total_money;
    /*计算总金额*/
}

