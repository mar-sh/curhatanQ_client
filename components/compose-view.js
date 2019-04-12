Vue.component('compose-view', {
    data(){
        return{
            curhatError:"",
            curhatTitle:"",
            curhatContent:"",
            curhatIsPublic:false,
        }
    },
    components:{
        wysiwyg: vueWysiwyg.default.component
    },
    methods:{
        addCurhat(){
            console.log(this.curhatTitle, this.curhatContent, this.curhatIsPublic)
            this.$emit("add-to-my-curhat", {
                title :this.curhatTitle,
                desccription: this.curhatContent,
                isPublic: this.curhatIsPublic
            })
            // this.$parent.addToMyCurhat({
            //     title :this.curhatTitle,
            //     content: this.curhatContent,
            //     isPublic: this.curhatIsPublic
            // });
        }
        
    },
    template: `      
    <div id="form-curhat" class="d-flex flex-column justify-content-start  p-4 w-75">
        <p class="text-red">{{curhatError}}</p>
        <p>Title:</p>
        <input type="text" class="w-100" v-model="curhatTitle" required>
        <p class="mt-3">Curhatan:</p>
        <wysiwyg v-model="curhatContent"></wysiwyg>
        <p class="mt-3">Make it public?  <span> <input type="checkbox" v-model="curhatIsPublic"></span></p>
        <div class="d-flex flex-row justify-content-end mt-3">
        <b-button variant="primary" class="mr-2"  @click="addCurhat">Publish</b-button>
        </div>
    </div>
    `,
});