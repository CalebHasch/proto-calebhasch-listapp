<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <div id="app">
    <Header />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>
