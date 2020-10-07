<template>
  <div id="app">
    <nav>
      <router-link to="/">
        <div class="navigation_logo">
          Tweet Tweeter
        </div>
      </router-link>
      
      <div class="navigation_user" v-if="user">
        @{{ user.username }}
      </div>
    </nav>
    <router-view/>
  </div>
</template>


// save everything in script tags before installing vue-router in cli, it might get removed
<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'App',
  setup() {
    const store = useStore();
    const user = computed(() => store.state.User.user);

    return {
      user
    }
  }
}
</script>

// scss compiles to css using something like webpack. it allows for nesting classes for organization. 
// 'scoped' is an attribute that goes in the 'style' tag that applies the classes only to the component that they are written in
//  leave 'scoped' out of the App.vue

<style lang="scss">

// app is sitting inside the body, which has an auto margin of 8px. Use base.scss
#app {
  background-color: whitesmoke;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.navigation_logo {
  background-color: rebeccapurple;
  color: whitesmoke;
  font-size: 50px;
  font-weight: bold;
  padding: 20px 50px;
}

.navigation_user {
  background-color: rebeccapurple;
  color: gainsboro;
  font-size: 30px;
  padding: 10px 50px;

}
</style>
