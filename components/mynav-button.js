Vue.component('mynav-button', {
    // data() {
    //     return {
    //         text:"",
    //     };
    // },
    props:["image","text"],
    methods: {

    },
    template: `
        <div class="d-flex flex-column justify-content-around align-items-center m-5">
            <slot></slot>
            <h4 class="text-white">{{text}}</h4>
        </div>
    `,
});