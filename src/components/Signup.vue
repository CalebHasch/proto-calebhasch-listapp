<script setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';

const { signup, loading, error } = useAuth();

const email = ref('');
const password = ref('');


async function onSignup() {
  await signup(email.value, password.value);
}
</script>

<template>
  <div class="auth-card">
    <h2>Create account</h2>
    <form @submit.prevent="onSignup">
      <label>Email
        <input v-model="email" type="email" required />
      </label>
      <label>Password
        <input v-model="password" type="password" required minlength="6" />
      </label>

      <button class="btn" type="submit" :disabled="loading">
        {{ loading ? 'Signing up...' : 'Sign up' }}
      </button>
    </form>

    <p v-if="message" class="msg">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>

    <p>
      Already have an account? <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<style scoped>
.auth-card { max-width:420px; margin:32px auto; padding:20px; border:1px solid #eee; border-radius:8px; }
label { display:block; margin-bottom:12px; }
input { width:100%; padding:8px; margin-top:6px; box-sizing:border-box; }
.btn { margin-top:8px; padding:8px 12px; }
.msg { color: #0a0; margin-top:8px; }
.error { color: #c00; margin-top:8px; }
</style>