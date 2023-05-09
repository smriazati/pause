<template>
    <div class="featured-posts-horizontal-banner">
        <div>
            <div class="panels-wrapper" ref="panelsContainer">
                <div class="title-wrapper" ref="titleWrapper">
                    <h3>recent articles</h3>
                </div>
                <div class="progress-bar-wrapper" ref="progressBar">
                    <div class="progress-bar-bg"></div>
                    <div class="progress-bar-fg"></div>
                </div>
                <div v-for="(item) in posts" :key="item._key" class="panel" ref="panel">
                    <div class="contained grid-fixed">
                        <nuxt-link :to="`/blog/${item.slug.current}`" class="text-wrapper">
                            <div v-if="item.featuredImg.url">
                                <img :src="item.featuredImg.url">
                            </div>
                            <div class="text-wrapper-inner">
                                <h2>{{ item.title }}</h2>
                                <p>{{ item.excerpt }}</p>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        posts: {
            type: Array,
            required: true,
        },
    },
    mounted() {
        this.setAnim();
        this.setTitlePosition();
        this.setProgressBar();
    },
    updated() {
        this.setAnim();
        this.setTitlePosition();
    },
    methods: {
        setProgressBar() {
            const gsap = this.$gsap;
            const progressBar = this.$refs.progressBar;
            let panelsContainer = this.$refs.panelsContainer;
            const fg = progressBar?.querySelector('.progress-bar-fg');

            gsap.to(fg, {
                width: `100%`,
                ease: "none",
                scrollTrigger: {
                    trigger: panelsContainer,
                    // markers: true,
                    start: "top top",
                    scrub: true,
                    end: () => "+=" + (panelsContainer.offsetWidth - window.innerWidth),
                },
            });
        },
        setTitlePosition() {
            const titleWrapper = this.$refs.titleWrapper;
            const panels = this.$refs.panelsContainer;
            const firstPanel = panels?.querySelector('.contained.grid-fixed');
            const firstTextWrapper = panels?.querySelector('.text-wrapper');
            if (!firstPanel || !panels || !titleWrapper) { return }
            const panelViewportOffset = firstPanel.getBoundingClientRect();
            const panelContainer = panels.getBoundingClientRect();
            const panelTextWrapper = firstTextWrapper.getBoundingClientRect();
            titleWrapper.style.left = `${panelTextWrapper.left}px`;
            titleWrapper.style.top = `${panelViewportOffset.top - panelContainer.top - 108}px`;
            titleWrapper.style.opacity = `1`;
        },
        setAnim() {
            const gsap = this.$gsap;
            /* Main navigation */
            let panelsContainer = this.$refs.panelsContainer;

            /* Panels */
            const refs = this.$refs;
            const panels = refs.panel;
            if (!panels) {
                return;
            }
            let startTriggerStr = "top top";
            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: panelsContainer,
                    pin: true,
                    // markers: true,
                    start: startTriggerStr,
                    scrub: true,
                    end: () => "+=" + (panelsContainer.offsetWidth - innerWidth),
                },
            });
        },
    },
};
</script>
  
<style lang="scss">
.featured-posts-horizontal-banner {
    .title-wrapper {
        opacity: 0;
        position: absolute;
        z-index: 111;

        h3 {
            @include pDetailStyle;
            color: $poppy;
        }
    }

    a,
    a:hover {
        border-bottom-color: transparent;
    }

    background: $eggplant;
    color: $cloud;
    display: flex;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;

    h2 {
        margin-bottom: $m-spacer;
        @include h3Style;
    }

    .panels-wrapper {
        height: 100vh;
        display: flex;
        flex-wrap: nowrap;
        position: relative;
        padding: 0;
        overflow: hidden;

        .panel {
            position: relative;
            display: flex;
            min-width: 100vw;
            height: 100vh;
            overflow: hidden;
            align-items: center;

            .grid-fixed {
                .text-wrapper {
                    grid-column: 2 / span 8;
                    text-align: left;
                    background: $eggplant;
                    // padding: 87px;
                    display: flex;
                    align-items: center;

                    >* {
                        flex: 0 0 50%;
                    }

                    .text-wrapper-inner {
                        display: flex;
                        flex-direction: column;
                        padding-left: 24px;
                    }

                    @media (max-width: $collapse-bp) {
                        padding: 50px;
                    }
                }
            }

            &:first-child {
                .grid-fixed {
                    .text-wrapper {
                        // grid-column: 2 / span 6;
                        text-align: left;
                        padding-left: 0;
                    }
                }
            }
        }
    }

    .panel {
        position: relative;
        overflow: hidden;

        @media (max-width: $collapse-bp) {
            width: 75%;
            // height: unset;
        }

        * {
            position: relative;
            z-index: 8;
        }
    }

    .progress-bar-wrapper {
        position: absolute;
        bottom: 10vh;

        .progress-bar-bg {
            background: rgba($poppy, .3);
            height: 1px;
            width: 100vw;
            display: flex;
        }

        .progress-bar-fg {
            background: $poppy;
            height: 1px;
            width: 0;
            display: flex;
        }
    }


}
</style>