<template>
  <div class="user-profile">
      <div class="user-profile_sidebar">
        <div class="user-profile_user-panel">
            <h1 class="user-profile_username">@{{ state.user.username }}</h1>
            <!-- <p class="user-profile_fullname">{{ fullName }}</p> -->

    <!-- if & else conditionally showing Admin badge -->
    <!-- this is a button that doesn't do anything, it just looks better as a button vs a div -->
            <button class="user-profile_admin-badge" v-if="state.user.isAdmin">Admin</button>
            <!-- <div class="user-profile_admin-badge" v-else="user.isAdmin">Not Admin</div> -->

            <!-- <button class="user-profile_button" @click="followUser">
                Follow
            </button> -->

            <div class="user-profile_follower-count">
                <strong> Followers: </strong> {{ state.followers  }}
            </div>
                        <!-- @ symbol does the same thing as 'v-on:' -->
            <CreateTweetPanel @add-tweet="addTweet"/>
        </div>
    </div>
    <div class="user-profile_tweets-wrapper">
        <TweetItem
        v-for="tweet in state.user.tweets" 
        :key="tweet.id" 
        :username="state.user.username" 
        :tweet="tweet" 
        @favorite="toggleFavorite" 
        />
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { users } from "../assets/users";
import TweetItem from "../components/TweetItem";
import CreateTweetPanel from "../components/CreateTweetPanel";

export default {
  name: 'UserProfile',
  components: { CreateTweetPanel, TweetItem },
  setup () {

    const route = useRoute();
    const userId = computed(() => route.params.userId);
    // if (userId) fetchUserFromApi(userId)

    const state = reactive({
      followers: 0,
      user: users[userId.value - 1] || users[0] //if the userId isn't found, then return user with Id 1
    })

    const fullName = computed(() => state.user.firstName + ' ' + state.user.lastName)

    function addTweet(tweet) {
        state.user.tweets.unshift({id: state.user.tweets.length + 1, content: tweet });
    }
    function followUser() {
        state.followers++
    }
    function toggleFavorite(id) {
        console.log(`Favorited tweet #${id}`)
    }

    return {
        state,
        fullName,
        addTweet,
        followUser,
        toggleFavorite,
        userId
    }
  },
  watch: {
    // when this followers changes(compare new to old), run this function
    followers(newFollowerCount, oldFollowerCount) {
      if (oldFollowerCount < newFollowerCount) {
        console.log(`${this.user.username} has gained a follower`)
      }
    }
  },
  // mounted is a lifecycle hook
  mounted() {
    this.followUser();
    console.log("mounted and user followed");
  }
}
</script>

<style lang="scss" scoped>
.user-profile {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 50px;
    padding: 50px 5%;

    .user-profile_user-panel {
        display: flex;
        flex-direction: column;
        padding: 20px;
        background-color: whitesmoke;
        border-radius: 5px;
        border: 1px solid rgb(31, 31, 31);
        margin-bottom: auto;

        h1 {
            margin: 0;
        }
    
        // .user-profile_username {
        //     padding-left: 5px;
        //     margin-bottom: -20px;
        // }

        // .user-profile_fullname {
        //     padding-left: 5px;
        //     margin-bottom: -20px;
        // }

        .user-profile_admin-badge {
            background: rebeccapurple;
            color: whitesmoke;
            border-radius: 5px;
            margin-right: auto;
            margin-left: auto;
            padding: 0px 10px;
            font-weight: bold;
        }
        // .user-profile_follower-count {
        //     padding-left: 5px;
        // }
    }

    .user-profile_tweets-wrapper {
        display: grid;
        grid-gap: 10px;
        margin-bottom: auto;
    }

}


</style>