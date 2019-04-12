
var baseurl = "http://localhost:3000"
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
                this.myCurhats = this.getPublicCurhats();
                this.viewId = 2;
            } else {
                this.myCurhats = [];
                this.publicCurhats = [];
                this.viewId = 1;
            }
        }
    },
    data: {
        isLogin: true,
        wantLogin: true,
        pdfSrc:'',
        viewId: 2,
        myCurhats: [],
        publicCurhats: []
    },
    methods: {
        changeAuth() {
            this.wantLogin = !this.wantLogin;
        },
        setViewId(id) {
            alert(id)
            this.viewId = id;
        },
        login(){
            this.isLogin = true;
        },
        logout(){
           
            this.isLogin = false;
            alert("logout");
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
        },
        getMyCurhats(){
            alert("getMyCurhat")
            //this.myCurhats = data.articles
            axios.get(baseurl+"/articles")
            .then(result=>{
              this.myCurhats = result.data
            })
            .catch(err=>{
              console.log(err)
            })
        },
        getPublicCurhats(){
            alert("getPublicCruhat")
            //this.myCurhats = publicData.articles
            axios.get(baseurl+"/articles")
            .then(result=>{
              this.publicCurhats = result.data.filter(x=>x.isPublic===true)
            })
            .catch(err=>{
              console.log(err)
            })
        },
        addToMyCurhat(objCurhat){
            alert("AddToMyCurhat")
            alert(objCurhat.title, objCurhat.description, objCurhat.isPublic)
            this.myCurhats.push(objCurhat)
            this.viewId=2;
        },
        deleteFromMyCurhat(_id){
            alert("DeleteToMyCurhat")
        },
        showPdf(url){
         alert("show pdf 2")
         alert(url)
          this.pdfSrc = url
          this.viewId = 6;     
        }

    }
})

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    axios.post(baseurl+"/login",{
        id_token:id_token
    })
    .then(result=>{
        app.isLogin = true
        localStorage.token = result.data.token;
        localStorage.userId = result.data.userId;
    })
    .catch(err=>{
        
    })
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      app.isLogin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    });
  }




