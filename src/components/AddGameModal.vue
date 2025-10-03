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
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <h3>Add Game</h3>
      <form @submit.prevent="handleSubmit" class="modal-form">
        <label>
          Game Title (required):
          <input v-model="game" placeholder="Enter game title" required />
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
  inset: 0;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display:flex; justify-content:center; align-items:center;
}
.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
.modal h2 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 20px;
  text-align: center;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-form label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 14px;
}

.modal-form input {
  margin-top: 4px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn.cancel {
  background: #eee;
}

.btn:not(.cancel) {
  background: #4caf50;
  color: white;
}
</style>
