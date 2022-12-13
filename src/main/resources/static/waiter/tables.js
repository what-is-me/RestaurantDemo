let table = new Vue({
    el:'#set',
    data:{
        table_num:[]
    },
    methods:{
        async get_tables(){
            let that = this;
            await axios.get('http://localhost:8080/table/').then(function (response){
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
                "                        <td>桌号</td>\n" +
                "                        <td>人数</td>\n" +
                "                        <td>订单</td>\n" +
                "                    </tr>";
            for(let i in this.table_num){
                let tr = document.createElement("tr");
                let td_id = document.createElement("td");
                let td_num = document.createElement("td");
                let td_cid = document.createElement("td");
                td_id.innerText = this.table_num[i].tid;
                td_num.innerText = this.table_num[i].num;
                td_cid.innerText = this.table_num[i].cid;

                tr.append(td_id);
                tr.append(td_num);
                tr.append(td_cid);
                table.append(tr);
            }
        }

    }
});
let menus = new Vue({
    el: "#menu",
    data: {
        menu: [],
        pre:[],
        choose:[]
    },
    methods: {
        async get_menu() {
            var that = this;
            await axios.get("http://localhost:8080/dish/").then(function (response) {
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
            let se = document.createElement("div")
            pay_main.innerText=""
            for(let ss in this.menu){
                let u = document.createElement("ul")
                u.className="uls"
                let uu = document.createElement("ul")
                uu.className="uls"
                let su = document.createElement("ul")
                let menu_class = document.createElement("div")
                menu_class.innerText="-------------"+ss+"-------------";
                let pay_class = document.createElement("div")
                pay_class.innerText="-------------"+ss+"-------------";
                let se_class = document.createElement("div")
                se_class.innerText="-------------"+ss+"-------------";
                console.log(ss)
                for(let x = 0 ; x < this.menu[ss].length; x ++){
                    let s = this.menu[ss][x];
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
                    let did = document.createElement("a")
                    did.className="dids";

                    /*添加数据进菜单列表*/
                    name.text=s.name;
                    price.text = s.price;
                    count.value=0;
                    describe.innerText=s.describe;
                    did.innerText = s.did;
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

                    summary.append(did)
                    summary.append(name);
                    summary.append(price);
                    summary.append(count);
                    detail.append(summary);
                    detail.append(img);
                    detail.append(describe);
                    l.append(detail);
                    u.append(l)
                }
                food.append(menu_class)
                food.append(u);
                pay_main.append(pay_class);
                pay_main.append(uu);
                se.append(se_class);
                se.append(su)
            }
            this.pre = se;
        },
        selectDish:function (){
            let select = $("#select")
            let s = document.createElement("div");
            let pay = document.getElementById("pay_main");
            let dish = pay.getElementsByTagName("li");
            let food = $("#food");
            let f = document.getElementById("food")
            if(select.val()===""){
                for(let i = 0 ; i < food.find("ul").length;i++){
                    let ul = food.find("ul")[i];
                    let sul = this.pre.children.item(i);
                    for(let j = 0 ; j < sul.children.length; j++){
                        ul.append(sul.children.item(j))
                        j = j - 1;
                    }
                }
            }
            else{
                for(let i = 0 ; i < food.find("ul").length;i++){
                    let ul = food.find("ul")[i];
                    let sul = this.pre.children.item(i);
                    for(let j = 0 ; j < ul.children.length; j++){
                        let li = ul.children.item(j)
                        let name = li.children.item(0).children.item(0).children.item(1)
                        /*console.log(li)*/
                        if(name.innerText.indexOf(select.val())!==-1){

                        }
                        else{
                            sul.append(li)
                            j = j - 1;
                        }
                    }
                }
                console.log(s)
                console.log(f)
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

            let aa = cc.children.item(j).children.item(0).children.item(0).children.item(3).value;
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
        total_money = total_money + l.children.item(2).innerHTML * l.children.item(3).value;
    }
    document.getElementById("total_money").innerText = total_money;
    /*计算总金额*/
}

let check_menu = new Vue({
    methods: {
       check_location:function (e){
           var aa = document.getElementById("food");
           console.log(e.target)
           if (e.currentTarget.parentNode.parentNode !== aa) {
               compute();/*计算总金额*/
           }
           if (e.currentTarget.children.item(0).children.item(0).children.item(3).value === "0" && e.currentTarget.parentNode.parentNode !== aa) {/*去掉那些突然不想要的*/
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
    el:"#pay_food",
    data:{

    },
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


let post_menu = new Vue({
    el:"#pay",
    data:{
        message:[],
    },
    methods:{
        end_pay:function () {
            let table_id = $("#table_id").val()
            let total_money = $("#total_money").val()
            let pay_main = document.getElementById("pay_main")
            let s = pay_main.getElementsByTagName("ul")
            if (table_id !== "" && total_money !== "0") {
                /*这里记录账单*/
                for(let i = 0 ; i < s.length;i++){
                    let aa = s[i].getElementsByTagName("summary")
                    console.log(aa.length)
                    for(let j=0;j<aa.length;j++){
                        console.log(aa.item(j))
                        let id = aa.item(j).children.item(0).innerText;
                        console.log(id);
                        let count = aa.item(j).children.item(3).value;
                        console.log(count);
                        this.dish.did=id;
                        this.dish.num = count;
                        let s = {"did":id,"num":count}
                        this.message.push(s)
                    }
                }
                console.log(this.message)
                let that =this
                axios({
                    method:"post",
                    data:that.message,
                    url:"http://localhost:8080/waiter/order?table_id="+table_id,
                    headers:{
                        'Content-Type':'application/json;charset=utf-8'
                    }
                }).then(function (resp){
                    alert("点菜成功！")
                })
            } else {
                alert("还没有填写桌号或还未点菜");
            }
        }
    }
})
