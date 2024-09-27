<script setup>
import FadeTransition from '@/components/transitions/FadeTransition.vue';
import { computed, ref, TransitionGroup } from 'vue';
import { onClickOutside } from '@vueuse/core'

const currentId = ref(2);

const tasks = ref([
    { id: 1, name: 'Complete this challenge', done: true },
    { id: 2, name: 'Complete all the "Make Me Functional" challenges', done: false },
]);
const showModal = ref(false);
const newTodo = ref();

const modal = ref(null)
onClickOutside(modal, () => showModal.value = false)

const toggleItem = (id) => {
    tasks.value = tasks.value.map(item => {
        if (item.id !== id) return item
        return { ...item, done: !item.done }
    })
}

const addNewTodo = () => {
    tasks.value.push({
        id: ++currentId.value,
        name: newTodo.value,
        done: false
    })
    newTodo.value = ''
    showModal.value = false
}

const numberOfTasks = computed(() => tasks.value.filter(item => !item.done).length)

const date = new Date(); // Current date
const todaysDate = date.toLocaleDateString('en-US', {
    weekday: 'short', // "Fri"
    year: 'numeric',  // "2024"
    month: 'short',   // "Sep"
    day: 'numeric'    // "27"
});

</script>

<template>
    <div class="container">
        <header>
            <!-- Replace this with your current date -->
            <h1 id="date">{{ todaysDate }}</h1>
            <p> <span id="task-counter" class="task-counter">{{ numberOfTasks }}</span> tasks</p>
        </header>
        <TransitionGroup class="task-list" name="task-list" tag="ul">
            <li v-for="{ id, name, done } in tasks" :key="id" @click="() => toggleItem(id)" data-task-item
                class="task-item" :class="{ 'completed': done }">
                <p>
                    <span data-task-name class="task-name">
                        {{ name }}
                    </span>
                </p>
                <div class="checkmark-wrapper">
                    <svg v-if="done" xmlns="http://www.w3.org/2000/svg" class="checkmark" width="24" height="24"
                        viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l5 5l10 -10" />
                    </svg>

                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="checkmark" width="24" height="24"
                        viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l5 5l10 -10" />
                    </svg>
                </div>
            </li>
        </TransitionGroup>
        <button @click="() => showModal = true" id="add-task-btn" class="add-task-btn"
            aria-label="Open the modal to prompt for new tasks to add">Add
            new to-do</button>
    </div>

    <!-- Use this modal to ask the user for new tasks -->
    <FadeTransition>
        <div v-if="showModal" id="modal-wrapper" class="modal-wrapper">
            <div ref="modal" id="modal" class="modal">
                <h2>What task would you like to add?</h2>
                <input v-model="newTodo" type="text" id="new-task-input" class="new-task-input">
                <button :disabled="!newTodo" @click="() => addNewTodo()" id="confirm-task-btn" class="confirm-task-btn"
                    aria-label="Confirm the addition of the new task">Add
                    task</button>
            </div>
        </div>
    </FadeTransition>
</template>

<style scoped>
.container {
    background-color: #151153;
    box-shadow: 0 10px 15px #1511536e;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 30rem;
    padding: 1rem;
    padding-bottom: 2rem;
    width: 100%;
}

header {
    color: #efefef;
    padding: 1rem;
    text-align: center;
}

header h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.35rem;
}

.task-list {
    background-color: #262560;
    border-radius: 7px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    margin-bottom: 1.5rem;
    max-height: 20rem;
    overflow-y: auto;
}

.task-list-move,
.task-list-enter-active {
    transition: all 0.5s ease;
}

.task-list-enter-from {
    opacity: 0;
}

.task-list::-webkit-scrollbar {
    width: 10px;
}

.task-list::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 999px;
}

.task-list::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #ff5090, #ff9659);
    ;
    border-radius: 999px;
}


.task-item {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
}

.checkmark-wrapper {
    aspect-ratio: 1/1;
    background: #8484a5;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    position: relative;
    width: 2rem;
}

.checkmark-wrapper::before {
    background-color: #262560;
    border-radius: 50%;
    content: "";
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
}

.checkmark-wrapper .checkmark {
    aspect-ratio: 1 / 1;
    color: transparent;
    position: relative;
    top: -2px;
    right: -2px;
    max-width: 1.5rem;
    width: 100%;
    z-index: 3;
}

.task-name {
    color: #efefef;
    user-select: none;
    text-decoration: none;
    background-image: linear-gradient(#8484a5, #8484a5);
    background-repeat: no-repeat;
    background-position: center left;
    background-size: 0% 1px;
    transition: background-size 200ms ease-in-out;
}

.task-item.completed .task-name {
    color: #8484a5;
    background-size: 100% 1px;
}

.task-item.completed .checkmark-wrapper {
    background: linear-gradient(to bottom right, #ff5090, #ff9659);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
}

.task-item.completed .checkmark-wrapper::before {
    background-color: #262560;
    border-radius: 50%;
    content: "";
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    z-index: -1;
}

.task-item.completed .checkmark-wrapper::after {
    background-color: #262560;
    content: "";
    width: 1.15rem;
    height: 1.15rem;
    position: absolute;
    top: -3px;
    right: -8px;
    z-index: -1;
}

.task-item.completed .checkmark-wrapper .checkmark {
    color: #ff9659;
    width: 100%;
    max-width: 1.5rem;
    aspect-ratio: 1 / 1;
    position: relative;
    top: -2px;
    right: -2px;
    z-index: 1;
}

.add-task-btn {
    background: linear-gradient(to right, #ff5090, #ff9659);
    color: #fff;
    padding: 0.75rem;
    border: none;
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: auto;
    width: 100%;
    max-width: 15rem;
    cursor: pointer;
}

.add-task-btn:hover {
    background: linear-gradient(to left, #ff5090, #ff9659);
}

.add-task-btn:active {
    background-color: #330b9bb8;
}

/* Modal styling */
.modal-wrapper {
    background-color: #00000066;
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.modal {
    background-color: #fff;
    box-shadow: 0 5px 15px #00000066;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    position: absolute;
    width: 100%;
    max-width: 25rem;
}

.modal h2 {
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
    color: black;
}

.new-task-input {
    border: 2px solid #ff9659;
    padding: 0.5rem;
}

.new-task-input:focus {
    outline: 2px solid #ff5090;
}

.confirm-task-btn {
    align-self: center;
    background: linear-gradient(to left, #ff5090, #ff9659);
    color: #fff;
    border: none;
    border-radius: 5px;
    font-weight: 700;
    padding: 0.75rem 1.5rem;
    max-width: max-content;
    cursor: pointer;
    transition: box-shadow 150ms;
}

.confirm-task-btn:hover:not(:disabled) {
    box-shadow: 0 3px 6px #00000041;
}

.confirm-task-btn:active:not(:disabled) {
    background: linear-gradient(to right, #ff5090, #ff9659);
}

.confirm-task-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* The modal is hidden by default. Remove this class to make it visible */
.hidden {
    display: none;
}
</style>