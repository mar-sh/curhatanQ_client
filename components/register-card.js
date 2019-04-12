

Vue.component('register-card', {
    data() {
        return {
            errorMessage: "",
            name:"",
            email:"",
            password:""
        };
    },
    methods: {
        register(){
           
            let body = {
                fullname:this.name,
                email:this.email,
                password:this.password
            }
            axios.post(baseurl+"/register",body)
            .then(result=>{
       
                localStorage.token = result.data.token;
                localStorage.userId = result.data.userId;
                this.$emit("register")
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    template: `
    <b-card class="text-center myauthcard">
        <b-card-header>
            REGISTER
        </b-card-header>
        <b-card-body class="d-flex flex-column">
            <input type="text" class=" mt-2" v-model="name" placeholder="Full Name..." required>
            <input type="email" class=" mt-2" v-model="email" placeholder="Email..." required>
            <input type="password" class="f mt-2" v-model="password" placeholder="Password..." required>
            <button type="submit" @click="register" class="btn btn-primary mt-5">REGISTER</button>
            <small class="text-danger">{{errorMessage}}</small>
        </b-card-body>
        <b-card-footer class="d-flex-inline">
            <p>Already have account? <span> <a href="#" v-on:click="$emit('change-auth')">LOGIN</a></span></p>
        </b-card-footer>
    </b-card>
    `
});