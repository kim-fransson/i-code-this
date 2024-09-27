<script setup>

import CloseIcon from '@/components/icons/basic/CloseIcon.vue';
import ChristmasTreeIcon from '@/components/icons/ChristmasTreeIcon.vue';

</script>

<template>
    <div class="challenge-container">
        <div class="challenge-content">
            <div class="snowy-landscape">
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

                        <button class="cta-button">GET YOUR GIFT</button>
                        <button class="close-button">
                            <CloseIcon />
                        </button>
                    </div>
                </div>
            </div>
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
}

@media (min-aspect-ratio: 4 / 3) {

    .challenge-content {
        height: 100vh;
        width: auto;
    }
}

.snowy-landscape {
    background: #eff0f3;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
}

.dialog {
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
            border: none;
            text-transform: uppercase;
            border-radius: 4px;
            font-weight: 600;
            letter-spacing: 0.9px;
            padding: 20px;
            width: clamp(0%, 215px, 100%);
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