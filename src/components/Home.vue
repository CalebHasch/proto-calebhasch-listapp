<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useGames } from '../composables/useGames';
import AddGameModal from './AddGameModal.vue';

const { user } = useAuth();
const { games, fetchGames, addGame, deleteGame, error } = useGames();

const showModal = ref(false);

const sortColumn = ref('date_received'); 
const sortDirection = ref('desc'); 

function toggleSort(column) {
  if (sortColumn.value === column) {
    // toggle direction if same column clicked
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    // new column defaults to ascending
    sortColumn.value = column;
    sortDirection.value = 'asc';
  }
}

// Computed sorted games
const sortedGames = computed(() => {
  const col = sortColumn.value;
  const dir = sortDirection.value;

  return [...games.value].sort((a, b) => {
    let valA = a[col];
    let valB = b[col];

    // ensure case-insensitive string comparison
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return dir === 'asc' ? -1 : 1;
    if (valA > valB) return dir === 'asc' ? 1 : -1;
    return 0;
  });
});

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
           <th @click="toggleSort('game')">
            Title <span v-if="sortColumn === 'game'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th @click="toggleSort('genre')">
            Genre <span v-if="sortColumn === 'genre'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th @click="toggleSort('player_rating')">
            Rating <span v-if="sortColumn === 'player_rating'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th @click="toggleSort('date_received')">
            Date Received <span v-if="sortColumn === 'date_received'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in sortedGames" :key="game.id">
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
.games-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}
.games-table th, .games-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
  text-align: left;
  cursor: pointer;
}
.games-table th:hover {
  background: #f9f9f9;
}
.small {
  padding: 4px 8px;
}
.error {
  color: #c00;
  margin-top: 8px;
}
</style>