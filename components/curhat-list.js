Vue.component('curhat-list', {
    props:["curhats"],
    methods:{
        showPdf(url){
            alert("show pdf 1")
            alert(url)
            this.$emit("show-pdf",url)

        }
    },
    template: `      
    <div class="d-flex flex-row flex-wrap p-4">
        <div v-for="curhat in curhats">
            <curhat-data @show-pdf="showPdf" class="m-2" v-bind:curhat="curhat"></curhat-data>
        </div>
    </div>
    `,
});