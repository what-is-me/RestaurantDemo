
/*var table = new Vue({
    el:'#tables',
    data:{
        table_num:[]
    },
    methods:{
    get_tables:function (){
        axios.get('https://www.baidu.com').then(function (response){
            console.log(response)
        }).catch(function (error){
            console.log(error)
        })
    }

    }
});*/
var menus = new Vue({
    el:"#menu",
    data:{
        menu:[]
    },
    methods: {
        get_menu:function (){
            var that = this;
            axios.get("http://localhost:8080/dish/").then(function (response){
                console.log(response.data);
                alert(response.body)
            }).catch(function (error){
                console.log(error)
            })
        }
    },
})