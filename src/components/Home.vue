<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useGames } from '../composables/useGames';
import AddGameModal from './AddGameModal.vue';

const { user } = useAuth();
const { games, fetchGames, addGame, deleteGame, error } = useGames();

const showModal = ref(false);

async function handleAddGame(gameData) {
  await addGame(gameData);
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

     <button class="btn" @click="showModal = true">Add Game</button>

    <AddGameModal
      :show="showModal"
      @close="showModal = false"
      @add="handleAddGame"
    />

    <table class="games-table" v-if="games.length">
      <thead>
        <tr>
          <th>Game</th>
          <th>Genre</th>
          <th>Player Rating</th>
          <th>Date Received</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.id">
          <td>{{ game.game }}</td>
          <td>{{ game.genre || '-' }}</td>
          <td>{{ game.player_rating ?? '-' }}</td>
          <td>{{ game.date_received }}</td>
          <td>
            <button @click="deleteGame(game.id)" class="small">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="games.length === 0">No games yet — add one!</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>


<style scoped>
.home { max-width:720px; margin:20px auto; padding:12px; }
.btn { margin-bottom:12px; }
.games-table { width:100%; border-collapse: collapse; }
.games-table th, .games-table td { padding:8px; border-bottom:1px solid #ddd; text-align:left; }
.small { padding:4px 8px; }
.error { color: #c00; margin-top:8px; }
</style>