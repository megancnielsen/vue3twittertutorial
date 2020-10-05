<template>
  <div class="user-profile">
    <div class="user-profile_user-panel">
        <h1 class="user-profile_username">@{{ user.username }}</h1>
        <p class="user-profile_fullname">{{ fullName }}</p>

<!-- if & else conditionally showing Admin badge -->
<!-- this is a button that doesn't do anything, it just looks better as a button vs a div -->
        <button class="user-profile_admin-badge" v-if="user.isAdmin">Admin</button>
        <!-- <div class="user-profile_admin-badge" v-else="user.isAdmin">Not Admin</div> -->

        <button class="user-profile_button" @click="followUser">
            Follow
        </button>

        <div class="user-profile_follower-count">
            <strong> Followers: </strong> {{ followers  }}
        </div>

        <!-- @subit.prevent in order to prevent the full refresh of the page, then in quotes is what you want to do instead -->
        <form class="user-profile_create-tweet" @submit.prevent="createNewTweet" :class="{ 'exceeded' : newTweetCharCount > 180}">
        <!-- ':class' above the colon prefix indicates that it is dynamic. the class is applied only when the condition is met. -->
            <label for="newTweet"><strong>New Tweet</strong> ({{ newTweetCharCount}}/180) </label>
            <!-- textarea instead of a regular input field because there will be up to 180 characters -->
            <textarea id="newTweet" rows="4" v-model="newTweetContent"/>

            <div class="user-profile_create-tweet-type">
                <label for="newTweetType"><strong>Type: </strong></label>
                <select id="newTweetType" v-model="selectedTweetType">
                    <!-- using the colo(:) before value lets you reference variables from your code, instead of just making it a string. Could do this with 'id' or 'for' above -->
                    <option :value="option.value" v-for="(option, index) in tweetTypes" :key="index">
                        {{ option.name }}
                    </option>
                </select>
            </div>

            <button class="user-profile_button">
            Tweet tweet!
            </button>

        </form>
        <!-- @ symbol does the same thing as 'v-on:' -->
    
    </div>
    <div class="user-profile_tweets-wrapper">
        <TweetItem
        v-for="tweet in user.tweets" 
        :key="tweet.id" 
        :username="user.username" 
        :tweet="tweet" 
        @favorite="toggleFavorite" />
    </div>
  </div>
</template>

<script>
import TweetItem from "./TweetItem";

export default {
  name: 'UserProfile',
  components: { TweetItem },
  data() {
    return {
        newTweetContent: '',
        selectedTweetType: 'instant',
        tweetTypes: [
            { value: 'draft', name: 'Draft'},
            { value: 'instant', name: 'Instant Tweet'},
        ],
      followers: 0,
      user: {
        id: 1,
        username: '_austerity404',
        firstName: 'jane',
        lastName: 'smith',
        email: 'janesmith404@gmail.com',
        isAdmin: true,
        tweets: [
            { id: 1, content: 'Tweet tweet' },
            { id: 2, content: 'Tweedle dee' },
        ]
      } 
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
  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
      // or: this.user.firstName + ' ' + this.user.lastName
    },
    newTweetCharCount() {
        return this.newTweetContent.length;
    }
  },
  methods: {
    followUser() {
      this.followers++
    },
    toggleFavorite(id) {
        console.log(`Favorited tweet #${id}`)
    },
    createNewTweet() {
        if (this.newTweetContent && this.selectedTweetType != 'draft') {
            // 'unshift' is js for putting something at the front of the list, 'push' is to put it at the back
            this.user.tweets.unshift({
                // usually 'id's are handle with a db, but for the sake of this tutorial do as below
                id: this.user.tweets.length + 1,
                content: this.newTweetContent
            })
            //  this is where you would save it to the db
            //  this line clears the text box after the tweet is submitted
            this.newTweetContent = '';
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
    width: 100%;
    padding: 50px 5%;

    .user-profile_user-panel {
        color: rgb(214, 24, 119);
        display: flex;
        flex-direction: column;
        margin-right: 50px;
        padding: 20ps;
        background-color: whitesmoke;
        border-radius: 5px;
        border: 1px solid rgb(31, 31, 31);

        h1 {
            margin: 0;
        }
    
        .user-profile_username {
            padding-left: 5px;
            margin-bottom: -20px;
        }

        .user-profile_fullname {
            padding-left: 5px;
            margin-bottom: -20px;
        }

        .user-profile_admin-badge {
            background: purple;
            color: white;
            border-radius: 5px;
            margin-right: auto;
            margin-left: auto;
            padding: 0px 10px;
        }

        .user-profile_button {
            background: purple;
            color: white;
            border-radius: 5px;
            margin: 10px auto;
            /* margin-left: auto; */
            padding: 0px 10px;
        }

        .user-profile_follower-count {
            padding-left: 5px;
        }

        .user-profile_create-tweet {
            border-top: 1px solid black;
            padding-top: 20px;
            padding-left: 10px;
            padding-right: 10px;
            display: flex;
            flex-direction: column;

            &.exceeded {
                color: red;
                border-color: red;
                
                button {
                    background-color: red;
                }
            }

            .newTweet {
                margin: 0;
            }

            .user-profile_create-tweet-type {
                margin: 0;

                .newTweetType {
                    margin: 0;
                }
            }

        }
    
    }

    .user-profile_tweets-wrapper {
        display: grid;
        grid-gap: 10px;
        margin-right: 200px;
    }

}


</style>