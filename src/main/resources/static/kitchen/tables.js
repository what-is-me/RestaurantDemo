let menus = new Vue({
    el: "#menu", data: {
        menu: []
    }, methods: {
        async get_menu() {
            var that = this;
            await axios.get("http://localhost:8080/dish/").then(function (response) {
                let obj = eval(response.data)
                console.log(response.data);
                console.log(obj.风味小炒[0]);
                that.menu = obj;
            }).catch(function (error) {
                console.log(error)
            });
            let m = document.getElementById("menu");
            this.menu_list();
        }, menu_list: function () {
            let food = document.getElementById("food")
            food.innerHTML = ""
            for (let ss in this.menu) {
                let u = document.createElement("ul")
                u.className = "uls"
                let menu_class = document.createElement("div")
                menu_class.innerText = "-------------" + ss + "-------------";
                for (let x = 0; x < this.menu[ss].length; x++) {
                    let s = this.menu[ss][x];
                    /*给每一个元素都添加css叠层样式表*/
                    let l = document.createElement("li")
                    let detail = document.createElement("details")
                    detail.className = "details"
                    let summary = document.createElement("summary")
                    summary.className = "summarys"
                    let name = document.createElement("a")
                    name.className = "names"
                    let price = document.createElement("a")
                    price.className = "prices"
                    let count = document.createElement("button")
                    count.innerText = "删除"
                    count.onclick = del.del_post;
                    let img = document.createElement("img")
                    img.className = "imgs"
                    let describe = document.createElement("p")
                    describe.className = "describes"
                    let did = document.createElement("a")
                    did.className = "dids";

                    /*添加数据进菜单列表*/
                    name.text = s.name;
                    price.text = s.price;
                    describe.innerText = s.describe;
                    did.innerText = s.did;
                    img.src = "http://localhost:8080/" + s.url;
                    /*设置控件位置*/
                    l.style.listStylee = "none";
                    l.style.marginTop = "20px";
                    l.style.border = "solid";
                    l.style.textAlign = "left";
                    l.style.borderRadius = "5px"
                    l.style.marginRight = "2%";

                    summary.style.marginLeft = "1%";
                    name.style.marginLeft = "2%";
                    price.style.marginLeft = "35%";
                    count.style.marginLeft = "36%";
                    count.style.width = "50px";
                    count.style.height = "20px";
                    img.style.width = "100px";
                    img.style.height = "70px";
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
            }
        },

    }
})
let upload = new Vue({
    el: "#add", data: {
        message: {
            did: "", name: "", type: "", describe: "", url: "", cost: "", price: ""
        }
    }, methods: {
        /*upload:function getFileContent(){
            // file[0]就是上传的图片本身
            // FileReader的readAsDataURL方法可以将图片转换为base64格式
            // 1.上传单个文件时：
            let reader = new FileReader();
            let file = document.querySelector("#myFile").files;
            reader.readAsDataURL(file[0]);
            // 一定要在文件读取 成功完成时 再进行相应的操作：
            reader.onload = function(){
                document.querySelector("img").src = reader.result;
            }
        },*/
        post_dish: function () {

            /*let post_string = this.toJson();
            console.log(post_string)*/
            /*"&url="+this.message.url+*/
            let that = this;
            console.log(this.message)
            axios({
                method: 'post',
                url: "http://localhost:8080/dish/insert?did=" + this.message.did + "&name=" + this.message.name + "&type=" + this.message.type + "&describe=" + this.message.describe + "&url=" + this.message.url + "&cost=" + this.message.cost + "&price=" + this.message.price,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(function (resp) {
                console.log(resp.data)
            }).catch(function (error) {
                console.log("网络异常")
            })
        }, toJson: function () {
            //将表单转化为JSON对象
            let result = {};
            //获取表单的数组对象
            let fieldArray = $("#dishes").serializeArray();
            //将表单转化为JSON对象
            for (let i = 0; i < fieldArray.length; i++) {
                let field = fieldArray[i];
                if (field.name in result) {
                    result[field.name] += ',' + field.value;
                } else {
                    result[field.name] = field.value;
                }
            }
            return result;
        }
    }
})
/*
#food > ul:nth-child(2) > li > details > summary*/

let del = new Vue({
    el: "#food", methods: {
        del_post: function (e) {
            let did = e.currentTarget.parentNode.parentNode.children.item(0).children.item(0).innerHTML;
            console.log(e.currentTarget.parentNode.parentNode.children.item(0).children.item(0).innerHTML);
            axios({
                method: 'POST',
                data: e.currentTarget.parentNode.parentNode.children.item(0).children.item(0).innerHTML,
                url: "http://localhost:8080/dish/delete?did=" + did,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(function (resp) {
                if (resp.data === true) {
                    alert("删除成功");
                } else {
                    alert("删除失败");
                }
            }).catch(function (error) {
                alert("网络异常！")
            })
        }
    }
})