<script setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';

const { login, loading , error} = useAuth();

const email = ref('');
const password = ref('');

async function onLogin() {
  await login(email.value, password.value);
}
</script>

<template>
  <div class="auth-card">
    <h2>Login</h2>
    <form @submit.prevent="onLogin">
      <label>Email
        <input v-model="email" type="email" required />
      </label>
      <label>Password
        <input v-model="password" type="password" required />
      </label>

      <button class="btn" type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>

    <p>
      No account? <router-link to="/signup">Sign up</router-link>
    </p>
  </div>
</template>

<style scoped>
.auth-card { max-width:420px; margin:32px auto; padding:20px; border:1px solid #eee; border-radius:8px; }
label { display:block; margin-bottom:12px; }
input { width:100%; padding:8px; margin-top:6px; box-sizing:border-box; }
.btn { margin-top:8px; padding:8px 12px; }
.error { color: #c00; margin-top:8px; }
</style>