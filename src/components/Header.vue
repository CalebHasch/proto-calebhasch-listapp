<script setup>
import { useAuth } from '../composables/useAuth';

const { user, logout } = useAuth();

</script>

<template>
  <header class="header">
    <div class="logo">
      <router-link to="/home">My Games</router-link>
    </div>

    <nav>
      <template v-if="user">
        <span class="username">{{ user.email }}</span>
        <button @click="logout" class="btn">Logout</button>
      </template>
      <template v-else>
        <router-link to="/login" class="link">Login</router-link>
        <router-link to="/signup" class="link">Sign Up</router-link>
      </template>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:12px 16px;
  border-bottom:1px solid #eee;
}
.logo a { font-weight:600; text-decoration:none; color:inherit; margin-right:20px; }
nav { display:flex; gap:12px; align-items:center; }
.username { margin-right:8px; }
.link { text-decoration:none; }
.btn { padding:6px 10px; cursor:pointer; }
</style>