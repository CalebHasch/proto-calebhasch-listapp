<script setup>
import { ref, onMounted, watch } from 'vue';
import { supabase } from '../supabase';
import { user } from '../stores/auth';

const games = ref([]);
const newGame = ref('');
const error = ref('');

async function fetchGames() {
  error.value = '';
  if (!user.value) return games.value = [];

  const { data, error: err } = await supabase
    .from('Game List')
    .select('*')
    .eq('user_id', user.value.id)
    .order('created_at', { ascending: false });

  if (err) {
    error.value = err.message;
  } else {
    games.value = data;
  }
}

async function addGame() {
  if (!newGame.value.trim()) return;
  error.value = '';

  const { data, error: err } = await supabase
    .from('Game List')
    .insert([{ user_id: user.value.id, game: newGame.value }])
    .select()
    .single();

  if (err) {
    error.value = err.message;
  } else {
    games.value.unshift(data);
    newGame.value = '';
  }
}

async function deleteGame(id) {
  const { error: err } = await supabase
    .from('Game List')
    .delete()
    .eq('id', id)
    .eq('user_id', user.value.id);

  if (err) {
    error.value = err.message;
  } else {
    games.value = games.value.filter(i => i.id !== id);
  }
}

onMounted(fetchGames);
// refetch when user changes (login/logout)
watch(user, (u) => {
  if (u) fetchGames();
  else games.value = [];
});
</script>

<template>
  <div class="home">
    <h2>Here are the Games you Own!</h2>

    <form @submit.prevent="addGame" class="add-form">
      <input v-model="newGame" placeholder="Add a game..." />
      <button class="btn" type="submit">Add</button>
    </form>

    <ul class="games">
      <li v-for="game in games" :key="game.id">
        <span>{{ game.game }}</span>
        <button @click="deleteGame(game.id)" class="small">Delete</button>
      </li>
    </ul>

    <p v-if="games.length === 0">No games yet — add one!</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>


<style scoped>
.home { max-width:720px; margin:20px auto; padding:12px; }
.add-form { display:flex; gap:8px; margin-bottom:12px; }
.add-form input { flex:1; padding:8px; }
.games { list-style:none; padding:0; margin:0; }
.games li { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #f2f2f2; }
.small { padding:4px 8px; }
.error { color: #c00; margin-top:8px; }
</style>