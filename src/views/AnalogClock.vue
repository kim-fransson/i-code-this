<script setup>
import { computed, onMounted, ref } from 'vue';


const isDarkMode = ref(false);
const toggleDarkMode = () => isDarkMode.value = !isDarkMode.value
const buttonText = computed(() => isDarkMode.value ? 'Light mode' : 'Dark mode')

const now = ref(new Date());
const dateInfo = computed(() => {
    const currentDate = now.value.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const dateArray = currentDate.split(', ');
    const day = dateArray[0];
    const rest = dateArray.slice(1).join(', ');

    return { day, rest };
});

const currentTime = computed(() => {
    const hours = String(now.value.getHours()).padStart(2, '0');
    const minutes = String(now.value.getMinutes()).padStart(2, '0');
    const seconds = String(now.value.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
})

const rotateHour = computed(() => (30 * (now.value.getHours() % 12) + now.value.getMinutes() / 2));
const rotateMinute = computed(() => (6 * now.value.getMinutes() + now.value.getSeconds() / 10));
const rotateSecond = computed(() => (6 * now.value.getSeconds()));



const updateTime = () => {
    now.value = new Date();
}

onMounted(() => {
    setInterval(updateTime, 1000);
})

</script>

<template>
    <div class="container" :class="{ 'dark': isDarkMode }">
        <button @click="toggleDarkMode" data-label="toggle dark and light mode" id="toggle-btn" class="toggle">
            {{ buttonText }}
        </button>
        <div class="clock-container">
            <div class="clock">
                <div id="hour" class="needle hour" :style="{ rotate: `${rotateHour}deg` }"></div>
                <div id="minute" class="needle minute" :style="{ rotate: `${rotateMinute}deg` }"></div>
                <div id="second" class="needle second" :style="{ rotate: `${rotateSecond}deg` }"></div>
                <div class="center-point"></div>
            </div>
            <p id="current-time" class="time">{{ currentTime }}</p>
            <p id="current-date" class="date">
                <span class="circle">{{ dateInfo.day }}</span>
                {{ dateInfo.rest }}
            </p>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-in;

    --primary-color: #000;
    --secondary-color: #fff;
    --primary-color-dark: #fff;
    --secondary-color-dark: #333;

    background-color: var(--secondary-color);
    color: var(--primary-color)
}

.container.dark {
    --primary-color: var(--primary-color-dark);
    --secondary-color: var(--secondary-color-dark);
}

.container.dark {
    background-color: #111;
    color: var(--primary-color);
}

.toggle {
    background-color: var(--primary-color);
    border: 0;
    border-radius: 4px;
    color: var(--secondary-color);
    font-size: 20px;
    padding: 8px 12px;
    position: absolute;
    top: 10vh;
}

.toggle:focus {
    outline: 0;
}

.clock-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.clock {
    position: relative;
    width: 200px;
    height: 200px;
}

.needle {
    background-color: var(--primary-color);
    transition: all 0.5s ease-in;
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: bottom center;
    width: 3px;
    height: 65px;
}

.needle.hour {
    translate: -50% -100%;
    rotate: 0deg;
}

.needle.minute {
    translate: -50% -100%;
    rotate: 0deg;
    height: 100px;
}

.needle.second {
    background-color: #e74c3c;
    height: 100px;
    translate: -50% -100%;
    rotate: 0deg;
}

.center-point {
    background-color: #e74c3c;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.center-point::after {
    background-color: var(--primary-color);
    transition: all 0.5s ease-in;
    border-radius: 50%;
    content: '';
    width: 5px;
    height: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.time {
    font-size: 60px;
}

.date {
    color: #aaa;
    font-size: 14px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 4px;
}

.date .circle {
    background-color: var(--primary-color);
    border-radius: 50%;
    color: var(--secondary-color);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    line-height: 18px;
    transition: all 0.5s ease-in;
    width: 24px;
    height: 24px;
}
</style>