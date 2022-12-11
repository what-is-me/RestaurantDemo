let table = new Vue({
    el:'#set',
    data:{
        table_num:[],
        should_pay:'',
        pay_money:''
    },
    methods:{
        async get_tables(){
            let that = this;
            await axios.get('http://localhost:8080/table/').then(function (response){
                that.table_num=response.data;

            }).catch(function (error){
                console.log(error)
            })
            console.log("查看餐桌是否改变：")
            console.log(this.table_num)
            this.set_tables();
        },
        set_tables:function (){
            let table = document.getElementById("set_table")
            table.innerHTML="<tr>\n" +
                "            <td>桌号</td>\n" +
                "            <td>单号</td>\n" +
                "          </tr>";
            for(let i in this.table_num){
                let tr = document.createElement("tr");
                let td_id = document.createElement("td");
                let td_cid = document.createElement("td");

                td_id.innerText = this.table_num[i].tid;
                td_cid.innerText = this.table_num[i].cid;

                tr.append(td_id);
                tr.append(td_cid);
                table.append(tr);
            }
        },
        clearTable:function (e){
            let pay_money = e.currentTarget.parentNode.children.item(8);
            let should_pay = e.currentTarget.parentNode.children.item(6);
            if(pay_money.value===""){
                alert("还没有输入实际付款！")
            }
            else if(parseFloat(pay_money.value)<parseFloat(should_pay.innerHTML)){
                alert("实际付款不足，无法生成小票");
            }
            else{
                let tableClear = e.currentTarget.parentNode.children.item(2);
                this.pay(e.currentTarget.parentNode.children.item(4).textContent,pay_money.value,tableClear.textContent)
                let tables = document.getElementById("set_table")
                let child = tables.firstChild;
                let last = tables.lastChild;
                while(child!==last){
                    if(child.childNodes.item(0).textContent===tableClear.textContent){
                        child.childNodes.item(1).textContent=-1;
                        break;
                    }
                    child = child.nextSibling;
                }
                if(child===last){
                    if(child.childNodes.item(0).textContent===tableClear.textContent){
                        child.childNodes.item(1).textContent=-1;
                    }
                    else{
                        alert("出现餐桌号错误！")
                    }
                }
            }
        },
        async pay(cid,received,tid){
            let that = this;
            await axios({
                method: 'get',
                url:"http://localhost:8080/bill/pay?cid="+cid+"&received="+received+"&tid="+tid,
                headers:{
                    'Content-Type':'application/json;charset=utf-8'
                }
            }).then(function (resp){

            })
            await this.get_tables().then();
            get_orders.getTables().then();
        }
    }
});
let deal = new Vue({
    el:"#post_deal",
    data:{
        cid:'',
        received:'',
        tid:'',
        price:''
    },
    methods: {
        postDeal: function (){
            axios({
                method:'post',
                url:"http://localhost:8080/bill/pay?cid="+this.cid+"&received="+this.received+"&tid="+this.tid,
                headers:{
                    'Content-Type':'application/json;charset=utf-8'
                }
            }).then(function (resp){
                console.log(resp.data);
                if(resp.data===true){
                    alert("结账成功！");
                }
                else{
                    alert("结账失败！")
                }
            }).catch(function (error){
                alert("网络异常！")
            })
        }
    }
})
let get_orders = new Vue({
    el:"#get_orders",
    data:{
        table_num:[],
        orders:[]
    },
    methods:{
        async getTables(){
            table.get_tables();
            console.log("订单函数中桌子状态：")
            console.log(table.table_num)
            this.table_num = table.table_num;

            this.orders=[]
          for(let i in this.table_num){
              if(this.table_num[i].cid!==-1){/*说明该桌有订单*/
                  let price = "";/*总金额*/
                  let that = this;
                  let url = "http://localhost:8080/bill/receipt?cid="+this.table_num[i].cid+"&tid="+this.table_num[i].tid;
                  await axios.get(url).then(function (resp){
                      let sum = 0;
                      for(let j in resp.data){
                          sum = sum + resp.data[j].price
                      }
                      that.price = sum;
                      price = sum ;
                      /*把这一部分写道html页面上*/
                      console.log("现在返回：")
                      console.log(resp.data)
                  }).catch(function (error){
                      alert("出现异常!")
                      console.log(error)
                  })
                  console.log("总价是：")
                  console.log(price)
                  if(price!==false){
                      let a = this.table_num[i];
                      a['price'] = this.price;
                      console.log(a)
                      this.orders.push(a)
                  }
              }
          }

            this.setOrder();
        },
        setOrder:function (){
            let set_orders = document.getElementById("set_orders");
            set_orders.innerText=""
            console.log(this.orders)
            for(let i in this.orders){
                let set_order = document.createElement("div")
                let divide = document.createElement("h3")
                let tid_name = document.createElement("span")
                let tid = document.createElement("span")

                let order_name = document.createElement("span")
                let order = document.createElement("span")

                let should_pay_name = document.createElement("span")
                let should_pay = document.createElement("span")

                let pay_money_name = document.createElement("span")
                let pay_money = document.createElement("input")

                pay_money.id="pay_money";
                pay_money.type="number"

                let change_name = document.createElement("span")
                let change = document.createElement("span")
                let generate = document.createElement("button")
                generate.onclick=table.clearTable;

                let b0 = document.createElement("br")

                divide.innerText="-----------------------------------------------------------------"
                tid_name.innerText="  桌号："
                order_name.innerText="  订单号："
                should_pay_name.innerText="  应该付款："
                pay_money_name.innerText="  实际付款："
                change_name.innerText="  找零："
                generate.innerText="生成小票"

                /*依次设置桌号、订单号、应付款*/
                tid.innerText=this.orders[i].tid;
                order.innerText=this.orders[i].cid;
                should_pay.innerText=this.orders[i].price;

                /*设置布局位置关系*/
                set_order.append(divide);
                set_order.append(tid_name);
                set_order.append(tid);
                set_order.append(order_name);
                set_order.append(order);
                set_order.append(should_pay_name);
                set_order.append(should_pay);
                set_order.append(pay_money_name);
                set_order.append(pay_money);
                set_order.append(change_name);
                set_order.append(change);
                set_order.append(generate);
                set_order.append(b0);
                set_orders.append(set_order)
            }
        }
    }
})