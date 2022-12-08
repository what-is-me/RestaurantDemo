let table = new Vue({
    el:'#set',
    data:{
        table_num:[]
    },
    methods:{
        get_tables:function (){
            let that = this;
            axios.get('http://localhost:8080/table/').then(function (response){
                that.table_num=response.data;
            }).catch(function (error){
                console.log(error)
            })
            this.set_tables();
        },
        set_tables:function (){
            console.log(this.table_num[0])
            let table = document.getElementById("set_table")
            table.innerHTML="<tr>\n" +
                "            <td>桌号</td>\n" +
                "            <td>人数</td>\n" +
                "          </tr>";
            for(let i in this.table_num){
                let tr = document.createElement("tr");
                let td_id = document.createElement("td");
                let td_num = document.createElement("td");

                td_id.innerText = this.table_num[i].tid;
                td_num.innerText = this.table_num[i].num;

                tr.append(td_id);
                tr.append(td_num);
                table.append(tr);
            }
        }

    }
});
let menus = new Vue({
    el: "#menu",
    data: {
        menu: []
    },
    methods: {
        get_menu: function () {
            var that = this;
            axios.get("http://localhost:8080/dish/").then(function (response) {
                let obj = eval(response.data)
                console.log(response.data);
                console.log(obj.风味小炒[0]);
                that.menu=obj;
            }).catch(function (error) {
                console.log(error)
            })
            let m= document.getElementById("menu");
            this.menu_list();
        },
        menu_list:function (){
            let food = document.getElementById("food")
            food.innerHTML=""
            let pay_main = document.getElementById("pay_main")
            for(let ss in this.menu){
                let u = document.createElement("ul")
                u.className="uls"
                let uu = document.createElement("ul")
                u.className="uls"
                let menu_class = document.createElement("div")
                menu_class.innerText="-------------"+ss+"-------------";
                let pay_class = document.createElement("div")
                pay_class.innerText="-------------"+ss+"-------------";
                console.log(ss)
                let s = this.menu[ss][0]
                /*给每一个元素都添加css叠层样式表*/
                let l = document.createElement("li")
                l.className="check"
                l.onclick=check_menu.check_location;
                let detail = document.createElement("details")
                detail.className="details"
                let summary = document.createElement("summary")
                summary.className="summarys"
                let name = document.createElement("a")
                name.className="names"
                let price = document.createElement("a")
                price.className="prices"
                let count = document.createElement("input")
                count.className="counts"
                count.type="number"
                count.min="0"
                let img = document.createElement("img")
                img.className="imgs"
                let describe = document.createElement("p")
                describe.className="describes"

                /*添加数据进菜单列表*/
                name.text=s.name;
                price.text = s.price;
                count.value=0;
                describe.innerText=s.describe;
                img.src=s.url;

                /*设置控件位置*/
                l.style.listStylee="none";
                l.style.marginTop="20px";
                l.style.border="solid";
                l.style.textAlign="left";
                l.style.borderRadius="5px"
                l.style.marginRight="2%";

                summary.style.marginLeft="1%";
                name.style.marginLeft="2%";
                price.style.marginLeft="35%";
                count.style.marginLeft="36%";
                count.style.width="50px";
                count.style.height="20px";
                img.style.width="100px";
                img.style.height="70px";
                /*确认布局关系*/
                pay_main.append(pay_class);
                pay_main.append(uu);

                summary.append(name);
                summary.append(price);
                summary.append(count);
                detail.append(summary);
                detail.append(img);
                detail.append(describe);
                l.append(detail);
                u.append(l)
                food.append(menu_class)
                food.append(u);
            }
        }

    }
})
$("#to_pay").click(function () {
    let food = document.getElementById("food");
    let num = food.getElementsByTagName("ul").length;
    let pay_main = document.getElementById("pay_main");
    let List = []
    let title = []
    for (let i = 0; i < num*2; i=i+2) {
        let menu_class = food.children.item(i);
        let list = [];
        let cc = food.children.item(i+1);
        let u = pay_main.children.item(i+1);//一个是类别一个是内容，所以i+1
        let nn = cc.children.length;
        for(let j=0;j<nn;j++){

            let aa = cc.children.item(j).children.item(0).children.item(0).children.item(2).value;
            if (aa !== "0") {
                list.push(cc.children.item(j))
            }
        }
        for (let k = 0; k < list.length; k++) {
            u.append(list[k]);//把在菜单中的菜添加到订单里面
        }
        List.push(u)
        title.push(menu_class)
    }

    /*这里是添加那个菜名到订单上*/
    compute();
    /*计算总金额*/

});
function compute() {
    var total_money = 0;
    let pay_u = document.getElementById("pay_main");
    let ll = pay_u.getElementsByTagName("li");
    for (let i = 0; i < ll.length; i++) {
        let l = ll.item(i).children.item(0).children.item(0);
        total_money = total_money + l.children.item(1).innerHTML * l.children.item(2).value;
    }
    document.getElementById("total_money").innerText = total_money;
    /*计算总金额*/
}

let check_menu = new Vue({
   el:".check",
   methods: {
       check_location:function (e){
           var aa = document.getElementById("food");
           console.log(e.target)
           if (e.currentTarget.parentNode.parentNode !== aa) {
               compute();/*计算总金额*/
           }
           if (e.currentTarget.children.item(0).children.item(0).children.item(2).value === "0" && e.currentTarget.parentNode.parentNode !== aa) {/*去掉那些突然不想要的*/
               compute();/*计算总金额*/
               let ll = [];
               let ss = e.currentTarget.parentNode.previousSibling;
               console.log(ss.textContent)
               let food = document.getElementById("food");
               let child = food.firstChild;
               let last = food.lastChild;
               while(child!==last){
                   /*console.log(x+"----")*/
                   if(ss.textContent===child.textContent){
                       console.log(ss.textContent)
                       child = child.nextSibling;
                       child.append(e.currentTarget);
                       break;
                   }
                   else{
                       child = child.nextSibling;
                   }
               }
           }
       }
   }
});
let select_table = new Vue({
    el:"#number",
    data:[],
    methods:{
        select_table:function (e){
            let table_id = document.getElementById("table_id");
            console.log(table_id.value);
            let table_count = document.getElementById("table_count");
            console.log(table_count.value);
            let v = e.target.value;
            let set_table = document.getElementById("set_table");
            let child = set_table.firstChild;
            let last =  set_table.lastChild;
            while(child!==last){
                child = child.nextSibling;
                if(child.childNodes.item(0).innerText===table_id.value){
                    child.childNodes.item(1).innerText = table_count.value;
                    break;
                }

            }
            if(child===last){
                if(child.childNodes.item(0).innerText===table_id.value){
                    child.childNodes.item(1).innerText = table_count.value;
                }
                else{
                    alert("桌号输入有误，重新输入")
                }

            }
        }
    }
})

function end_pay() {
    let table_number = document.getElementById('table_number').value;
    let total_money = document.getElementById("total_money").value;
    if (table_number !== "" && total_money !== "0") {
        /*这里记录账单*/
    } else {
        alert("还没有填写桌号或还未点菜");
    }
}
let post_menu = new Vue({
    el:"#generate",
    data:[],
    methods:{
        end_pay:function (){
            let table_number = document.getElementById('table_number').value;
            let total_money = document.getElementById("total_money").value;
            if (table_number !== "" && total_money !== "0") {
                /*这里记录账单*/
                let menu = document.getElementById("")
            } else {
                alert("还没有填写桌号或还未点菜");
            }
        }
    }
})