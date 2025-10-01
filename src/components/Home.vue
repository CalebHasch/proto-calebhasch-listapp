<script>
import { ref, onMounted, watch } from 'vue';
import { supabase } from '../supabase';
import { user } from '../stores/auth';

const items = ref([]);
const newItem = ref('');
const error = ref('');

async function fetchItems() {
  error.value = '';
  if (!user.value) return items.value = [];

  const { data, error: err } = await supabase
    .from('items')
    .select('*')
    .eq('user_id', user.value.id)
    .order('created_at', { ascending: false });

  if (err) {
    error.value = err.message;
  } else {
    items.value = data;
  }
}

async function addItem() {
  if (!newItem.value.trim()) return;
  error.value = '';

  const { data, error: err } = await supabase
    .from('items')
    .insert([{ user_id: user.value.id, game: newItem.value }])
    .select()
    .single();

  if (err) {
    error.value = err.message;
  } else {
    items.value.unshift(data);
    newItem.value = '';
  }
}

async function deleteItem(id) {
  const { error: err } = await supabase
    .from('items')
    .delete()
    .eq('id', id)
    .eq('user_id', user.value.id);

  if (err) {
    error.value = err.message;
  } else {
    items.value = items.value.filter(i => i.id !== id);
  }
}

onMounted(fetchItems);
// refetch when user changes (login/logout)
watch(user, (u) => {
  if (u) fetchItems();
  else items.value = [];
});
</script>

<template>
  <div class="home">
    <h2>Your Owned Games List</h2>

    <form @submit.prevent="addItem" class="add-form">
      <input v-model="newItem" placeholder="Add an item..." />
      <button class="btn" type="submit">Add</button>
    </form>

    <ul class="items">
      <li v-for="item in items" :key="item.id">
        <span>{{ item.game }}</span>
        <button @click="deleteItem(item.id)" class="small">Delete</button>
      </li>
    </ul>

    <p v-if="items.length === 0">No items yet — add one!</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>


<style scoped>
.home { max-width:720px; margin:20px auto; padding:12px; }
.add-form { display:flex; gap:8px; margin-bottom:12px; }
.add-form input { flex:1; padding:8px; }
.items { list-style:none; padding:0; margin:0; }
.items li { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #f2f2f2; }
.small { padding:4px 8px; }
.error { color: #c00; margin-top:8px; }
</style>