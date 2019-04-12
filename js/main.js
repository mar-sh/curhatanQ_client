
var baseurl = "http://curhat-server.willyprayogo26.xyz"
// var baseurl = "http://localhost:3000"
console.log(baseurl)
const app = new Vue({
    el: "#app",
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    watch: {
        isLogin: function (val) {
            if (this.isLogin) {
                this.myCurhats = this.getMyCurhats();
                this.publicCurhats = this.getPublicCurhats();
                this.viewId = 2;
            } else {
                this.myCurhats = [];
                this.publicCurhats = [];
                this.viewId = 1;
            }
        }
    },
    data: {
        isLogin: "",
        wantLogin: true,
        pdfSrc:'',
        viewId: 0,
        myCurhats: [],
        publicCurhats: []
    },
    created: function () {
      
      if(localStorage.token){
          this.isLogin = true
      }else{
        this.isLogin = false
      }
      },
    methods: {
        changeAuth() {
            this.wantLogin = !this.wantLogin;
        },
        setViewId(id) {
           
            this.viewId = id;
        },
        login(){
            console.log("masuk gaak")
            
            this.isLogin = true;
        },
        logout(){
           
            this.isLogin = false;
      
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
        },
        getMyCurhats(){
            
            //this.myCurhats = data.articles
            axios.get(baseurl+"/curhatan/my-curhat",{
                headers:{
                    token: localStorage.token
                }
            })
            .then(result=>{
                console.log(result.data)
               this.myCurhats = result.data
            })
            .catch(err=>{
              console.log(err)
            })
         },
        getPublicCurhats(){
           
            //this.myCurhats = publicData.articles
            axios.get(baseurl+"/curhatan",{
                headers:{
                    token: localStorage.token
                }
            })
            .then(result=>{
              this.publicCurhats = result.data
            })
            .catch(err=>{
              console.log(err)
            })
        },
        addToMyCurhat(objCurhat){

            this.myCurhats.push(objCurhat)
            this.getPublicCurhats();
            this.viewId=2;
            Swal.fire({
                
                type: 'success',
                title: 'Your curhat has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        },
        deleteSuccess(_id){
          
            this.getMyCurhats();
            this.getPublicCurhats();
        },
        showPdf(url){
     
          this.pdfSrc = url
          this.viewId = 6;     
        }

    }
})






