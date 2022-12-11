let day_bill = new Vue({
    el:"#bill_list",
    data:{
        bill:[],
        profit:"    ",
        costs:"        "
    },
    methods:{
        async bills(time){
            let that = this;
            console.log(time)
            await axios({
                method:"get",
                url:"http://localhost:8080/senior/bills_"+time,
                headers:{
                    'Content-Type':'application/json;charset=utf-8'
                }
            }).then(function (resp){
                that.bill = resp.data
                let profit = 0;
                let costs = 0;
                let outside = $("#bill")
                outside.html("<div STYLE=\"margin-top: 20px\">\n" +
                    "        <span>订单号：</span>\n" +
                    "        <a id=\"cid\">xxxxxxxx</a>\n" +
                    "        <span>|成本：</span>\n" +
                    "        <a id=\"cost\">xxxxxxx </a>\n" +
                    "        <span>|售价：</span>\n" +
                    "        <a id=\"price\"> xxxxxx</a>\n" +
                    "        <span>|实付款：</span>\n" +
                    "        <a id=\"received\">    xxxxxxx  </a>\n" +
                    "        <span>|找零：</span>\n" +
                    "        <a id=\"change\"> xx  </a>\n" +
                    "        <span>|时间：</span>\n" +
                    "        <a id=\"time\">xxxxxxxx</a>\n" +
                    "      </div>")
                for(let i = 0 ; i <resp.data.length;i++){
                    let div = document.createElement("div");
                    let cid = document.createElement("a");
                    let cost = document.createElement("a");
                    let price = document.createElement("a");
                    let received = document.createElement("a");
                    let change = document.createElement("a");
                    let time = document.createElement("span");

                    cid.innerText = resp.data[i].cid;
                    cost.innerText = resp.data[i].cost;
                    price.innerText = resp.data[i].price;
                    received.innerText = resp.data[i].received;
                    change.innerText = parseFloat(resp.data[i].received) -parseFloat(resp.data[i].price) ;
                    time.innerText = resp.data[i].time;

                    profit = profit + parseFloat(resp.data[i].price) -parseFloat(resp.data[i].cost);
                    costs = costs + parseFloat(resp.data[i].cost);
                    cost.style.marginLeft="80px";
                    price.style.marginLeft="80px";
                    received.style.marginLeft="80px";
                    change.style.marginLeft="80px";
                    time.style.marginLeft="80px";
                    div.style.border="solid"
                    div.style.marginTop="10px"

                    div.append(cid);
                    div.append(cost);
                    div.append(price);
                    div.append(received);
                    div.append(change);
                    div.append(time);

                    outside.append(div);
                }
                that.profit = profit;
                that.costs = costs;
            })
        }
    }
})
$("#day").click(function (){
    day_bill.bills("day");
})
$("#month").click(function (){
    day_bill.bills("month");
})
$("#year").click(function (){
    day_bill.bills("year");
})

let dish = new Vue({
    el:"#dish_list",
    data:{
        dish:[],
        profit:"    ",
        count:"        "
    },
    methods:{
        async dishes(time){
            let that = this;
            console.log(time)
            await axios({
                method:"get",
                url:"http://localhost:8080/senior/dish_"+time,
                headers:{
                    'Content-Type':'application/json;charset=utf-8'
                }
            }).then(function (resp){
                that.dish = resp.data
                let profit = 0;
                let counts = 0;
                let outside = $("#dish")
                outside.html("<div STYLE=\"margin-top: 20px\">\n" +
                    "        <span>菜品单号：</span>\n" +
                    "        <a id=\"did\">xxxxxxxx</a>\n" +
                    "        <span>|菜名：</span>\n" +
                    "        <a id=\"name\">xxxxxxx </a>\n" +
                    "        <span>|卖出份数：</span>\n" +
                    "        <a id=\"count\"> xxxxxx</a>\n" +
                    "        <span>|净赚：</span>\n" +
                    "        <a id=\"earn\">    xxxxxxx  </a>\n" +
                    "      </div>")
                for(let i = 0 ; i <resp.data.length;i++){
                    let div = document.createElement("div");
                    let did = document.createElement("a");
                    let name = document.createElement("a");
                    let num = document.createElement("a");
                    let earn = document.createElement("a");

                    did.innerText = resp.data[i].did;
                    name.innerText = resp.data[i].name;
                    num.innerText = resp.data[i].num;
                    earn.innerText = resp.data[i].earn;

                    profit = profit + parseFloat(resp.data[i].earn);
                    counts = counts + parseFloat(resp.data[i].num);
                    num.style.marginLeft="150px";
                    earn.style.marginLeft="150px";
                    name.style.marginLeft="150px";
                    div.style.border="solid"
                    div.style.marginTop="10px"

                    div.append(did);
                    div.append(name);
                    div.append(num);
                    div.append(earn);

                    outside.append(div);
                }
                that.profit = profit;
                that.count = counts;
            })
        }
    }
})
$("#day1").click(function (){
    dish.dishes("day");
})
$("#month1").click(function (){
    dish.dishes("month");
})
$("#year1").click(function (){
    dish.dishes("year");
})