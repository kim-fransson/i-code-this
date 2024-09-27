<script setup>
import { challenges } from '@/router';
import { RouterLink } from 'vue-router';

</script>

<template>
    <h1>Home</h1>
    <ul class="challenges">
        <li class="challenge" v-for="challenge in challenges" :key="challenge.name">
            <RouterLink :to="`challenges/${challenge.path}`">
                <div>
                    {{ challenge.name }}
                </div>
            </RouterLink>
        </li>
    </ul>
</template>

<style lang="scss">
.challenges {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(3, 1fr);

    @include forSmallScreen {
        grid-template-columns: 1fr;
    }

    .challenge {
        text-transform: capitalize;
        font-weight: 700;
        background: #2c2446;
        padding: 12px;
        border-radius: 8px;
    }
}
</style>