<template>
    <section class="card-rounded">
        <div class="card-body text-center" @click="navToHome">
            <!--dynamic images need to be imported like a module using require-->
            <img :src="require('@/assets/images/' + user.avatar)" class="rounded-circle img-fluid"  alt="avatar">
        </div>
        <h2>{{ user.first_name }}</h2>
    </section>
</template>
<script>
export default {
    name: "TheUserComponent",

    props: {
        user: Object
    },
    methods: { 
        
        //  I want to add if else clause here. how can I do that????????
        navToHome() {
            //go to the user home view
            this.$router.push({name: "UserHome", params: this.user});
        },
        navToHomekid() {
            this.$router.push({name: "Homekid", params: this.user});
        }
    }
}
</script>