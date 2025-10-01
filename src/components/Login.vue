<script setup>
import { ref } from 'vue';
import { signIn } from '../stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const router = useRouter();

async function onLogin() {
  loading.value = true;
  error.value = '';
  const { data, error: err } = await signIn(email.value, password.value);
  loading.value = false;
  if (err) {
    error.value = err.message || 'Login failed';
    return;
  }
  router.push('/home');
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
/* reuse same simple styles as signup */
.auth-card { max-width:420px; margin:32px auto; padding:20px; border:1px solid #eee; border-radius:8px; }
label { display:block; margin-bottom:12px; }
input { width:100%; padding:8px; margin-top:6px; box-sizing:border-box; }
.btn { margin-top:8px; padding:8px 12px; }
.error { color: #c00; margin-top:8px; }
</style>