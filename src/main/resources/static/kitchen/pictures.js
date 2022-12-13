let getPicture = new Vue({
    el:"#pictures",
    data:{

    },
    methods:{
        async getPicture(){
            let get_picture = document.getElementById("get_picture");
            let that = this;
            await axios({
                method:"get",
                url:"http://localhost:8080/files/",
                headers:{
                    'Content-Type':'application/json;charset=utf-8'
                }
            }).then(function (resp){
                console.log(resp.data);
                get_picture.innerText=""
                for(let i=0;i<resp.data.length;i++){
                    console.log(resp.data[i])
                    let name = document.createElement("span");
                    let url = document.createElement("span");
                    let d = document.createElement("div");
                    let br = document.createElement("br");
                    let btn = document.createElement("button");
                    btn.onclick=that.delPicture;
                    name.innerText = resp.data[i].name;
                    url.innerText = resp.data[i].url;
                    btn.innerText = "删除"

                    url.style.marginLeft="4%";
                    url.style.border="solid";
                    name.style.border="solid";
                    d.style.marginTop="10px"
                    btn.style.marginLeft="4%";

                    d.append(name);
                    d.append(url);
                    d.append(btn);
                    d.append(br);

                    get_picture.append(d)

                }
            })
        },
        delPicture:function (e){
            let name = e.currentTarget.previousSibling.previousSibling.innerText;
            let that = this;
            alert(name)
            axios({
                method: "post",
                url:"http://localhost:8080/files/delete?filename="+name,
                headers:{
                    'Content-Type':'application/json;charset=utf-8'
                }
            }).then(function (resp){
                console.log(resp.data)
                alert("删除成功")
                that.getPicture();
            })
        },
        addPicture:function (e){
            let files = new FormData();
            let file = e.target.files[0];
            let form = new FormData();
            form.append('files',file);
            console.log(file)
            axios({
                method:"post",
                url:"http://localhost:8080/files/upload",
                data: form
            }).then(function (resp){
                alert("上传成功！")
            })
        }
    }
})