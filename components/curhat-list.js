Vue.component('curhat-list', {
    props:["curhats","candelete"],
    methods:{
        showPdf(url){
    
            this.$emit("show-pdf",url)

        },
        deleteSuccess(id){
            this.$emit("delete-success", id)
        }
    },
    template: `      
    <div class="d-flex flex-row flex-wrap p-4">
        <div v-for="curhat in curhats">
            <curhat-data @show-pdf="showPdf" :candelete="candelete" @delete-success="deleteSuccess" class="m-2" v-bind:curhat="curhat"></curhat-data>
        </div>
    </div>
    `,
});