<template>
  <section class="container">
    <div class="jumbotron">
        <h1>Welcome to Flashblack!</h1>
        <p class="lead">
        Before revisiting your favourite movies, tv shows or music from yesteryear, please log in with a valid username and password.
        </p>
    </div>
    <h2 class="login-flash" v-if="signup">{{ flash }}</h2>
    <h2 class="login-flash" v-if="errors">{{ flash }}</h2>
    <section class="log-in">
      <label class="sr-only" for="inlineFormInputName">Name</label>
      <input v-model="username" type="text" class="form-control" id="inlineFormInputName" placeholder="username" required>

      <label class="sr-only" for="inlineFormPassword">Name</label>
      <input  v-model="password" type="password" class="form-control" id="inlineFormPassword" placeholder="password" required>
    </section>

     <button
        v-if="signup"
        type="submit" 
        class="btn btn-primary login-submit signup"
        @click="trySignUp"
      >Sign up!
    </button>

    <button
        type="submit" 
        class="btn btn-primary login-submit"
        @click="tryLogin"
      >Go!
    </button>

    
  </section>
</template>

<script>

export default {
    name: 'TheLogin',
    data() {
        return {
            username:'',
            password:'',
            url: 'users/getone',
            signup: false,
            errors: false,
            flash: ''
        }
    },
    methods: {
        tryLogin() {
            this.url = 'users/getone';
            this.login();
        },
        
        trySignUp() {
            this.url ='/users/signup';
            this.login();
        }, 

        goToUsers(time, vm) {
            setTimeout(function() {
            vm.$emit('setauth', true);
                vm.$router.push({ name: 'UserSelect'});
            }, time);
        },

        login() {
            //hit the back end UMS with a user name and password
            // and use the route to show the next view
            //TODO=> should happen on succesful login -> this needs to move to the fetch call
         
            let formData = { username: this.username, password: this.password };


            let url = this.url; //todo -fix this when available

            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(data => {
                console.table(data);
                switch (data.action) {
                    case 'add': //user doesn't exist
                        this.signup = true;
                        this.username = '';
                        this.password = '';
                        this.flash = 'username does not seem to exist. do you want sign up? Or you can try.';
                        break;
                    
                    case 'added':
                        this.flash ='Added you to Roku Flashbacl! Enjoy! ... redirecting ...';
                        this.goToUsers(2500, this);
                        break;

                    case 'retry': // wrong password
                        document.querySelector(`input[type=${data.field}]`).classList.add('error');
                        this.errors =true;
                        this.flash = 'wrong login info, please retry.';
                        break;

                    default: //authentication worked, go to userselct 
                        this.goToUsers(0, this);
                        
                }
               
            })
            .catch(err => console.error(err));
        }
    }
}
</script>

<style lang="scss">
    @import "@/assets/sass/login.scss";
</style>
