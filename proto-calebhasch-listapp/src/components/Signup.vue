<script>
export default {
  name: 'Signup',
  data(){
    return{
        input:{
            username: "",
            password: ""
        }
    }
  },
   methods:{
    signup(){
      //make sure username OR password are not empty
      if(this.input.username != "" || this.input.password != ""){
        console.log("authenticated")
      }else{
        console.log("Username and Password can not be empty")
      }
    }
  },
}
</script>

<template>
        <form name="signup-form" >
          <div class="mb-3">
            <label for="username">Username: </label>
            <input id="username" type="text" v-model="input.username" />
          </div>
          <div class="mb-3">
            <label for="password">Password: </label>
            <input id="password" type="password" v-model="input.password" />
          </div>
          <div class="mb-3">
            <label for="confirmedPassword">Confirm Password: </label>
            <input id="confirmedPassword" type="password" v-model="input.password" />
          </div>
          <button class="btn btn-outline-dark" type="submit" v-on:click.prevent = "Signup()">
            Sign Up
          </button>
        </form>
  </template>