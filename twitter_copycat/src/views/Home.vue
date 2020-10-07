<template>
  <div class="home">
    <h1>Home</h1>
    <div class="users-list">
      <!-- DO NOT FORGET THE ':key' in the router-link -->
      <router-link v-for="user in users" :to="{ name: 'UserProfile', params: { userId: user.id } }" :key="user.id"> <!-- 'UserProfile come from name of path in 'const routes' in index.js' -->
        {{ user.username }}
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { users } from "../assets/users";

export default {
  name: 'Home',
  setup() {
    return {
      users
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 50px 5%;

  .users-list {
    display: flex;
    flex-direction: column;
    
  }
}
</style>