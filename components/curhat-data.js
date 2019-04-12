

Vue.component('curhat-data', {
    props:["curhat","candelete"],
    computed:{
        getFacebookHref(){
            return `https://www.facebook.com/sharer/sharer.php?u=${this.curhat.url}`
        },
        getTwitterHref(){
            return `https://twitter.com/intent/tweet?text=Curhat+ini+bagus&amp;url=${this.curhat.url}`
        }
    },
    methods: {
        viewDocument(){
        
            this.$emit("show-pdf", this.curhat.url)
            
        },
        deleteDocument(){

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
                    axios({
                        method:"DELETE",
                        url: baseurl+"/curhatan/"+localStorage.userId+"/delete/"+this.curhat._id,
                        headers:{
                            token: localStorage.token
                        }
                    })
                    .then(result=>{
                        console.log("masu cuy")
                        this.$emit("delete-success",this.curhat._id)
                    })
                    .catch(err=>{
                        console.log(err.response);
                    })
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
              })

            //   console.log(baseurl+"/curhatan/"+localStorage.userId+"/delete/"+this.curhat._id)
                    
            
        }
    },
    template: `
        <div class="d-flex flex-column curhat-card">
            <div class="d-flex flex row justify-content-around align-items-center">
                <a id="facebook-share" :href="getFacebookHref" target="_blank"><i class="fab fa-facebook-f"></i></a>
                <a id="twitter-share" class="twitter-share-button" :href="getTwitterHref" target="_blank"><i class="fab fa-twitter"></i></a>
            </div>
            <div class="d-flex flex row justify-content-around align-items-center">
                <a id="linkedin-share"  target="_blank" title="Share on LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a id="gplus-share" title="Plus 1 on Google+"><i class="fab fa-google-plus"></i></a>
            </div>
            <p class="mt-4">{{curhat.title}}</p>
            <div class="d-flex flex row justify-content-around align-items-center">
                <button @click="viewDocument" class="btn btn-primary btn-sm">View</button>
                <button v-if="candelete" @click="deleteDocument" class="btn btn-danger btn-sm">Delete</button>
            </div>
        </div>
    `,
});