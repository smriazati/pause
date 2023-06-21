<template>
    <div class="blog-page-intro-wrapper">
        <div class="contained blog-page-intro" ref="container">
            <div class="grid-fixed">
                <div class="column title-wrapper gsap-fade-in" ref="headline">
                    <h2 class="h2">Lean into this moment of Pause, while we explore topics around menopause.</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    mounted() {
        this.setBannerEntranceAnim();
    },
    // updated() {
    //     this.setBannerEntranceAnim();
    // },
    methods: {
        setBannerEntranceAnim() {
            const gsap = this.$gsap;
            // const container = this.$refs.container;
            const headline = this.$refs.headline;
            gsap.set(headline, {
                autoAlpha: 0,
                x: "-25%",
            });


            gsap.to(headline, {
                autoAlpha: 1,
                x: 0,
                duration: 1,
            });
        },
    },
};
</script>

<style lang="scss">
.blog-page-intro-wrapper {
    border-bottom: 1px solid $cloud;
}

.blog-page-intro {
    @include containerVertPadding;

    .grid-fixed {
        >.column:first-child {
            grid-row: 1 / 2;
            grid-column: 2 / span 6;
        }


        .title-wrapper {
            h1 {
                @media (max-width: $collapse-bp) {
                    margin-bottom: 2rem;
                }
            }
        }

        .text-wrapper {
            p {
                @include pBigStyle;

                &:not(:last-child) {
                    margin-bottom: $s-spacer;
                }
            }

            h2 {
                @include pBigStyle;

                &+p {
                    margin-top: $ss-spacer;
                    @include pStyle;
                }
            }
        }
    }
}
</style>