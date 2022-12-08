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
let deal = new Vue({
    el:"#post_deal",
    data:{
        cid:'',
        received:'',
        tid:''
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
