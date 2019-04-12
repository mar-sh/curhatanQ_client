

Vue.component('curhat-data', {
    props:["curhat"],
    computed:{
        getFacebookHref(){
            return `https://www.facebook.com/sharer/sharer.php?u=`
        },
        getTwitterHref(){
            return `https://twitter.com/intent/tweet?text=Curhat+ini+bagus&amp;url=`
        },
        getCanDelete(curhatUserId){
            return true;
            if(curhatUserId != localStorage.userId){
                return false;
            }else{
                return true;
            }
        }
    },
    methods: {
        viewDocument(){
            alert("view document")
            this.$emit("show-pdf", this.curhat.url)
            
        },
        deleteDocument(){
            alert("delete document")
        }
    },
    template: `
        <div class="d-flex flex-column curhat-card">
            <div class="d-flex flex row justify-content-around align-items-center">
                <a id="facebook-share" href="https://www.facebook.com/sharer/sharer.php?u=example.org" target="_blank"><i class="fab fa-facebook-f"></i></a>
                <a id="twitter-share" class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Hello" target="_blank"><i class="fab fa-twitter"></i></a>
            </div>
            <div class="d-flex flex row justify-content-around align-items-center">
                <a id="linkedin-share"  target="_blank" title="Share on LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a id="gplus-share" title="Plus 1 on Google+"><i class="fab fa-google-plus"></i></a>
            </div>
            <p class="mt-4">{{curhat.title}}</p>
            <div class="d-flex flex row justify-content-around align-items-center">
                <button @click="viewDocument" class="btn btn-primary btn-sm">View</button>
                <button v-if="getCanDelete" @click="deleteDocument" class="btn btn-danger btn-sm">Delete</button>
            </div>
        </div>
    `,
});