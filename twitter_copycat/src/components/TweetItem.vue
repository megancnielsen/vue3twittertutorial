<template>
    <div class="tweet-item" @click="favoriteTweet(tweet.id)">
        <div class="user-profile_tweet">
            <div class="tweet-item_user">
                @{{ username }}
            </div>
            <div class="tweet-item_content">
                {{ tweet.content }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TweetItem",
    props: {
        username: {
            type: String,
            required: true
        },
        tweet: {
            type: Object,
            required: true
        }
    },
    methods: {
        favoriteTweet(id) {
            this.$emit('favorite', id)
        }
    }
};
</script>

<style lang="scss" scoped>

.tweet-item {
    padding: 20px;
    background-color: whitesmoke;
    border-radius: 5px;
    border: 1px solid gray;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
        transform: scale(1.1, 1.1);
    }

    .tweet-item_user {
        font-weight: bold;
    }
}

</style>