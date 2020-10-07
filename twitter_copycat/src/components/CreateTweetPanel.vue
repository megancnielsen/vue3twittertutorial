<template>
    <!-- @subit.prevent in order to prevent the full refresh of the page, then in quotes is what you want to do instead -->
    <form class="create-tweet-panel" @submit.prevent="createNewTweet" :class="{ '--exceeded' : newTweetCharCount > 100}">
    <!-- ':class' above the colon prefix indicates that it is dynamic. the class is applied only when the condition is met. -->
        <label for="newTweet"><strong>New Tweet</strong> ({{ newTweetCharCount}}/100) </label>
        <!-- textarea instead of a regular input field because there will be up to 180 characters -->
        <textarea id="newTweet" rows="4" v-model="state.newTweetContent"/>

        <div class="create-tweet-panel_submit">
            <div class="create-tweet-type">
                <label for="newTweetType"><strong>Type: </strong></label>
                <select id="newTweetType" v-model="state.selectedTweetType">
                    <!-- using the colo(:) before value lets you reference variables from your code, instead of just making it a string. Could do this with 'id' or 'for' above -->
                    <option :value="option.value" v-for="(option, index) in state.tweetTypes" :key="index">
                        {{ option.name }}
                    </option>
                </select>
            </div>
            <button>
            Tweet tweet!
            </button> 
        </div>

    </form>
</template>

<script>

import { reactive, computed } from 'vue';

export default {
    name: "CreateTweetPanel",
    // setup & const state replace 'data & return' and 'computed'
    setup(props, context) {
        const state = reactive({
            newTweetContent: '',
            selectedTweetType: 'instant',
            tweetTypes: [
                { value: 'draft', name: 'Draft'},
                { value: 'instant', name: 'Instant Tweet'},
            ]
        })

        const newTweetCharCount = computed(() => state.newTweetContent.length)

        function createNewTweet() {
            if (state.newTweetContent && state.selectedTweetType != 'draft') {
                context.emit('add-tweet', state.newTweetContent);
                state.newTweetContent = '';
            }
        }

        return {
            state,
            newTweetCharCount,
            createNewTweet
        }
    }
}
</script>

<style lang="scss" scoped>

.create-tweet-panel {
    margin-top: 20px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;

    textarea {
        border: 1px solid purple;
        border-radius: 5px;
    }

    .create-tweet-panel_submit {
        display: flex;
        justify-content: space-between;

        .create-tweet-type {
            padding: 10px;
        }

        button {
            padding: 5px 20px;
            margin: auto 0;
            border-radius: 5px;
            border: none;
            background-color: deeppink;
            color: whitesmoke;
            font-weight: bold;
        }
    }

    &.--exceeded {
        color: red;
        border-color: red;
        
        .create-tweet-panel_submit {
            button {
                background-color: red;
                color: whitesmoke;
            }
        }
    }

    // .newTweet {
    //     margin: 0;
    // }

    // .user-profile_create-tweet-type {
    //     margin: 0;

    //     .newTweetType {
    //         margin: 0;
    //     }
    // }

}

</style>