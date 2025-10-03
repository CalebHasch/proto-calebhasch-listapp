<script setup>
import { ref } from "vue";

const props = defineProps({
  show: Boolean,        // controls visibility
});
const emits = defineEmits(["close", "add"]);

const game = ref("");
const genre = ref("");
const playerRating = ref("");
const dateReceived = ref("");

function handleSubmit() {
  if (!game.value.trim()) return;

  const data = {
    game: game.value,
    genre: genre.value || null,
    player_rating: playerRating.value ? Number(playerRating.value) : null,
    date_received: dateReceived.value || new Date().toISOString().split("T")[0],
  };

  emits("add", data); // send data to parent
  
  game.value = "";
  genre.value = "";
  playerRating.value = "";
  dateReceived.value = "";

  emits("close"); // close modal automatically
}
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h3>Add New Game</h3>

      <form @submit.prevent="handleSubmit">
        <label>
          Game Title (required):
          <input v-model="game" placeholder="Enter game title" />
        </label>
        <label>
          Genre
          <input v-model="genre" type="text" placeholder="Enter game genre"/>
        </label>
        <label>
          Player Rating
          <input v-model="playerRating" type="number" step="0.1" min="0" max="10" placeholder="Enter personal rating" />
        </label>
        <label>
          Date Received
          <input v-model="dateReceived" type="date" />
        </label>

        <div class="actions">
          <button type="submit" class="btn">Add</button>
          <button type="button" class="btn secondary" @click="$emit('close')">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display:flex; justify-content:center; align-items:center;
}
.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  min-width: 320px;
}
.actions {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.secondary {
  background: #ccc;
}
</style>
