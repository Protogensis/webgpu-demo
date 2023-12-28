<script setup lang="ts">
import Myside from './components/Myside.vue';

</script>

<template>
  <div class="container">
    <Myside></Myside>
    <RouterView class="view"></RouterView>
  </div>
</template>

<style scoped>
.container{
  display: flex;
  flex-direction: row;
}

.view{
  flex-grow: 1;
}
</style>
