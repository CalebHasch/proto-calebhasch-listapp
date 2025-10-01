<script>
export default {
  name: 'Home',
  data(){
    return{
      input:{
        game: ""
      }
    }
  },
   methods:{
    addItem(){
      console.log(addItem)
    }
  },
}
</script>

<template>
        <form name="add-item-form" >
          <div class="mb-3">
            <label for="game">Game Title: </label>
            <input id="game" type="text" v-model="input.game" />
          </div>
          <button class="btn btn-outline-dark" type="submit" v-on:click.prevent = "addItem">
            Add Game
          </button>
        </form>
  </template>