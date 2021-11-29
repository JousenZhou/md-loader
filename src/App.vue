<template>
  <div>
    <AXC322 />
  </div>
</template>

<script>
  import AXC from './index.md';
  export default {
    name: 'App',
    components: {
      AXC322: AXC
    }
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
