<script>
export default {
  name: 'Login',
  data(){
    return{
        input:{
            username: "",
            password: ""
        }
    }
  },
   methods:{
    login(){
      //make sure username OR password are not empty
      if(this.input.username != "" || this.input.password != ""){
        console.log("authenticated");
        this.$router.push('/home');
      }else{
        console.log("Username and Password can not be empty")
      }
    }
  },
}
</script>

<template>
        <form name="login-form" >
          <div class="mb-3">
            <label for="username">Username: </label>
            <input id="username" type="text" v-model="input.username" />
          </div>
          <div class="mb-3">
            <label for="password">Password: </label>
            <input id="password" type="password" v-model="input.password" />
          </div>
          <button class="btn btn-outline-dark" type="submit" v-on:click.prevent = "login()">
            Login
          </button>
        </form>
  </template>