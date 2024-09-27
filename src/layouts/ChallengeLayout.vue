<script setup>

</script>

<template>
    <div class="challenge-container">
        <div class="challenge-content">
            <RouterView />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.challenge-container {
    height: 100dvh;
    background: #2c2446;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.challenge-content {
    width: 100%;
    aspect-ratio: 4 / 3;
    max-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (min-aspect-ratio: 4 / 3) {
    .challenge-content {
        height: 100vh;
        width: auto;
    }
}
</style>