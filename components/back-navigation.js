Vue.component('back-navigation', {
    props:["title"],
    methods:{
        back(){
            this.$parent.setViewId(2);
        }
    },
    template: `      
    <div class="p-4 d-flex flex-row align-items-center ">
        <i @click="back" class="fas fa-arrow-circle-left icon-med"></i>
        <h3 class="text-white font-weight-bold ml-3">{{title}}</h3>
    </div>
    `,
});