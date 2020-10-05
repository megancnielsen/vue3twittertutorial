<template>
  <div id="app">
    <UserProfile/>
  </div>
</template>

<script>
import UserProfile from "./components/UserProfile";

export default {
  name: 'App',
  components: { UserProfile }
}
</script>

// scss compiles to css using something like webpack. it allows for nesting classes for organization. 
// 'scoped' is an attribute that goes in the 'style' tag that applies the classes only to the component that they are written in
//  leave 'scoped' out of the App.vue

<style lang="scss">

// app is sitting inside the body, which has an auto margin of 8px. Use base.scss
#app {
  background-color: whitesmoke;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
