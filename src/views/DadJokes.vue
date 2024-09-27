<script setup>
import FadeTransition from '@/components/transitions/FadeTransition.vue';
import { onMounted, ref } from 'vue';

const loaded = ref(false);
const data = ref();

const headers = new Headers()
headers.set("User-Agent", "My Library (https://github.com/kim-fransson/i-code-this)");
headers.set("Accept", "application/json");

async function fetchDadJoke() {
    try {
        await fetch('https://icanhazdadjoke.com/', { headers })
            .then((res) => res.json())
            .then((json) => data.value = json)
    } catch (error) {
        // I like to live dangerously
    } finally {
        loaded.value = true
    }
}

onMounted(() => {
    fetchDadJoke();
})

</script>

<template>
    <FadeTransition appear>
        <div v-if="loaded" class="container">
            <h1>Dad Jokes Generator</h1>
            <FadeTransition mode="out-in">
                <p class="joke" :key="data.id">
                    {{ data.joke }}
                </p>
            </FadeTransition>
            <button @click="fetchDadJoke()" id="get-joke-btn" class="btn">Get Another Joke</button>
        </div>
    </FadeTransition>
</template>

<style lang="css" scoped>
.container {
    background-color: #4dbdd9;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    padding: 3.5rem 1.5rem;
    text-align: center;
    max-width: 50rem;
    width: 100%;
}

.container- h1 {
    color: #fff;
    font-size: 1.5rem;
    letter-spacing: 2px;
}

.joke {
    color: #1b3956;
    font-size: 1.75rem;
    letter-spacing: 1px;
    line-height: 2.5rem;
    margin: 3rem auto;
    max-width: 40rem;
}

.joke.error {
    color: red;
}

.btn {
    background-color: #2d4f6e;
    border: 0;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    padding: 1rem 2.5rem;
}

.btn:active {
    transform: scale(0.98);
}
</style>