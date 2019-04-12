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
            let blobPDF = generatePDF(this.curhatTitle, this.curhatContent)
           

            let data = new FormData()
            data.append('title', this.curhatTitle)
            data.append('description', this.curhatContent)
            data.append('isPublic',this.curhatIsPublic)
            data.append('image', blobPDF, 'file.pdf')
            console.log("==masuk sini 10=")

            axios({
                method:"POST",
                url: baseurl+"/curhatan/"+localStorage.userId,
                data,
                headers:{
                    token:localStorage.token
                }
            })
            // axios.post(baseurl+"/curhatan/"+localStorage.userId, {
            //     headers:{
            //         token: localStorage.token
            //     },
            //     data:data
            // })
            .then(result=>{
                console.log("==result==")
                console.log(result.data)
                this.$emit("add-to-my-curhat", result.data)
            })
            .catch(err=>{
                console.log(err)
            })

            // this.$emit("add-to-my-curhat", {
            //     title :this.curhatTitle,
            //     desccription: this.curhatContent,
            //     isPublic: this.curhatIsPublic
            // })
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

function generatePDF(title,content){
    console.log("==masuk sini==")
    var doc = new jsPDF('p', 'pt', 'letter')
    // doc.text(20, 20, this.inputTitle);
    margins = {
        top: 40,
        bottom: 60,
        left: 40,
        width: 522
      };
      console.log("==masuk sini 2==")
    doc.setFont("courier");
    doc.setFontType("normal");
    // doc.text(20, 30, `<i>${this.inputContent}</i>`);
    console.log(doc.internal.pageSize)
    console.log("==masuk sini 3==")
    xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(title) * doc.internal.getFontSize() / 2)
    doc.text(`${title}`, xOffset,margins.top)
    doc.fromHTML( `${content}`, margins.left, margins.top,{
        // y coord
        width: margins.width // max width of content on PDF
      },
      function(dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        //          this allow the insertion of new lines after html
      },
    
      margins
    );
    console.log("==masuk sini 4==")
    var blobPDF = new Blob([doc.output('blob')], { type: 'application/pdf'})
    return blobPDF
    // var url = URL.createObjectURL(blobPDF)
        
}