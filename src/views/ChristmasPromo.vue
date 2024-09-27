<script setup>

import CloseIcon from '@/components/icons/basic/CloseIcon.vue';
import ChristmasTreeIcon from '@/components/icons/ChristmasTreeIcon.vue';
import { onMounted, ref } from 'vue';

const NUMBER_OF_SNOWFLAKES = 150;
const snowflakes = ref([]);

onMounted(() => {
    for (let i = 0; i < NUMBER_OF_SNOWFLAKES; i++) {
        const leftPosition = Math.random() * 100;
        const animationDuration = Math.random() * 5 + 5; // Between 5 and 10 seconds
        const animationDelay = Math.random() * 5;

        const snowflake = {
            style: {
                left: `${leftPosition}%`,
                animationDuration: `${animationDuration}s`,
                animationDelay: `${animationDelay}s`,
            },
        };

        snowflakes.value.push(snowflake);
    }
})

</script>

<template>
    <div class="snowy-landscape">
        <div class="snowflakes">
            <div v-for="(snowflake, index) in snowflakes" :key="index" class="snowflake" :style="snowflake.style">
                ❅
            </div>
        </div>
        <div class="dialog">
            <div class="content">
                <header>
                    <ChristmasTreeIcon />
                    <h2>Merry Christmas!</h2>
                </header>

                <div class="body">
                    <p>You completed all your December's tasks so we decided to get you a gift:</p>
                    <strong>50% off on your Yearly Premium Plan</strong>
                </div>

                <button class="cta-button">GET YOUR
                    GIFT</button>
                <button class="close-button">
                    <CloseIcon />
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.snowy-landscape {
    position: relative;
    background: #eff0f3;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
}

.snowflakes {
    position: absolute;
    height: 100%;
    width: 70%;
    pointer-events: none;
    overflow: hidden;

    .snowflake {
        color: white;
        font-size: 10px;
        position: absolute;
        top: -10%;
        user-select: none;
        animation: fall linear infinite;
        opacity: 0.8;
    }

    @keyframes fall {
        0% {
            transform: translateY(-100px) translateX(0);
        }

        100% {
            transform: translateY(100vh) translateX(100px);
        }
    }
}

.dialog {
    z-index: 10;
    border: none;
    border-radius: 4px;
    border-top-right-radius: 24px;
    padding: 12px;
    background: white;
    color: #242e4c;
    box-shadow: 0px 0px 40px 5px rgba(36, 46, 76, 0.24);
    width: clamp(0%, 400px, 100%);
    height: clamp(0%, 460px, 100%);

    .content {
        position: relative;
        display: flex;
        gap: 32px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;

        @include forSmallScreen {
            gap: 24px;
        }

        header {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;

            h2 {
                letter-spacing: -0.7px;
                font-size: 24px;

                @include forSmallScreen {
                    font-size: 20px;
                }
            }

            >svg {
                width: 44px;
                height: 44px;

                @include forSmallScreen {
                    width: 32px;
                    height: 32px;
                }
            }
        }

        .body {
            font-size: 13px;
            line-height: 140%;
            font-weight: 500;
            color: #6a7185;
            max-width: 280px;
            display: flex;
            flex-direction: column;
            gap: 20px;

            strong {
                color: #dca54a;
                font-size: 14px;
                font-weight: 500;
            }
        }


        .cta-button {
            width: clamp(0%, 215px, 100%);

            border: none;
            text-transform: uppercase;
            border-radius: 4px;
            font-weight: 600;
            letter-spacing: 0.9px;
            padding: 20px;
            color: #f3f4f5;
            font-size: 13px;
            box-shadow: 0px 20px 40px 5px rgba(36, 46, 76, 0.24);
            background: #242e4c;

            @include forSmallScreen {
                padding: 12px;
            }
        }


        .close-button {
            position: absolute;
            color: #9da1af;
            top: 0;
            right: 0;
            background: none;
            border: none;
            transition: color 0.2s ease-in-out;

            &:hover {
                color: #242e4c;
            }

            >svg {
                width: 32px;
                height: 32px;

                @include forSmallScreen {
                    width: 24px;
                    height: 24px;
                }
            }
        }

    }

}
</style>