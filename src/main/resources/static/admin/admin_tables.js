let submitAccount = new Vue({
    el:"#add_user",
    data:{

    },
    methods:{
        submit:function (){
            let c1 = $('#code2')
            let c2 = $('#code1')
            let account = $('#account')/*这里的拿出来的元素实际上是一个列表，如果想更改某个元素的style就必须取下标为0时*/
            let prof = $("input[name='prof']:checked")
            if(c1.val()!==c2.val()){
                const dif = $('#diff')
                console.log(dif[0])
                dif[0].style.display=""
            }
            else if(account.val().length>20){

                let dif1 = $('#diff1')
                dif1[0].style.display=""
            }
            else{
                axios({
                    method:'post',
                    url:"http://localhost:8080/users/insert?name="+account.val()+"&password="+c1.val()+"&type="+prof.val(),
                    headers:{
                        'Content-Type':'application/json;charset=utf-8'
                    }
                }).then(function (resp){
                    console.log(resp.data);
                    if(resp.data===true){
                        alert("添加用户成功！")
                    }
                }).catch(function (error){
                    console.log(error)
                    alert("权限不足！您非管理员！")
                })
            }
        }
    }
});
let modify = new Vue({
    el:'#modify_user',
    data:{
        message:''
    },
    methods:{
        modifyUser:function (){
            let account = $("#account_modify");
            let code = $("#code_modify");
            let code1 = $("#code_modify1");
            if(code.val()!==code1.val()){
                this.message="两次密码不一致，重新输入"
            }
            else{
                let that = this;
                let s = []
                axios({
                    method: 'get',
                    url:"http://localhost:8080/users/?username="+account.val(),
                    headers: {
                        'Content-Type':'application/json;charset=utf-8'
                    }
                }).then(function (resp){
                    console.log(resp.data[0])
                    if(resp.data.length<=0){
                        that.message="用户名不对，重新输入";
                    }
                    else{
                        console.log(resp.data)
                        axios({
                            method:'post',
                            url:"http://localhost:8080/users/update?username="+account.val()+"&password="+code1.val(),
                            headers: {
                                'Content-Type':'application/json;charset=utf-8'
                            }
                        }).then(function (resp){
                            if(resp.data===true){
                                alert("密码修改成功！")
                            }
                        })
                    }
                })
            }
        }
    }
})
