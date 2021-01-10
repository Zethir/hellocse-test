<template>
  <router-view />
</template>

<script lang="ts">
import TitleMixin from '@/mixins/titleMixin'

export default class App extends TitleMixin {
  private title = 'Stars'
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: #efefef;
}
</style>
