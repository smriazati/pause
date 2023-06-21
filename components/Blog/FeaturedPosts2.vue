<template>
    <div class="featured-posts-horizontal-banner2" ref="container">
        <div class="title-wrapper" ref="titleWrapper">
            <h3>recent articles</h3>
        </div>
        <div class="panels-wrapper" ref="panelsContainer" :style="`width: ${(posts.length * 50)}vw`">
            <div v-for="(item) in posts" :key="item._key" class="panel" ref="panel">
                <div class="">
                    <nuxt-link :to="`/blog/${item.slug.current}`" class="content-wrapper">
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
        <div class="progress-bar-wrapper">
            <div class="progress-bar-bg"></div>
            <div class="progress-bar-fg" ref="progressBar"></div>
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
        this.setProgressBarAnim();
    },
    methods: {
        setProgressBarAnim() {
            const gsap = this.$gsap;
            const container = this.$refs.container;
            const panelsContainer = this.$refs.panelsContainer;
            const progressBar = this.$refs.progressBar;
            if (!gsap || !progressBar || !container || !panelsContainer) { return }
            gsap.to(progressBar, {
                width: `100%`,
                scrollTrigger: {
                    trigger: container,
                    // markers: true,
                    start: "top top",
                    scrub: true,
                    end: () => "+=" + (panelsContainer.offsetWidth - innerWidth),
                },
            })
        },
        setAnim() {
            const gsap = this.$gsap;
            const refs = this.$refs;
            const container = refs.container;
            const panelsContainer = refs.panelsContainer;
            const panels = refs.panel;
            if (!gsap || !panelsContainer || !container || !panels) { return }

            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    pin: true,
                    // markers: true,
                    start: "top top",
                    // pinSpacing: false,
                    scrub: true,
                    end: () => "+=" + (panelsContainer.offsetWidth - innerWidth),
                },
            });
        },
    },
};
</script>
  
<style lang="scss" scoped>
.featured-posts-horizontal-banner2 {
    height: 100vh;
    background: $eggplant;
    color: $white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 5%;

    .title-wrapper h3 {
        color: $poppy;
        @include pDetailStyle
    }

    .panels-wrapper {
        margin-top: 24px;
        margin-bottom: 24px;

        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;

        >* {
            flex: 0 0 50vw;

            @media (max-width: $collapse-bp) {
                flex: 0 0 100vw;
            }
        }

        a,
        a:hover {
            border-bottom-color: transparent;
        }
    }

    .panel {

        padding-right: 5%;

        @media (max-width: $collapse-bp) {
            padding-right: 96px;
        }

        .content-wrapper {
            display: flex;
            align-items: center;

            @media (max-width: $collapse-bp) {
                align-items: flex-start;
            }

            >* {
                flex: 0 0 50%;

                &:last-child {
                    padding-left: 24px;
                }
            }

            h2 {
                @include h3Style;
                margin-bottom: 24px;
            }
        }
    }

    .progress-bar-wrapper {
        width: calc(100vw - 5%);

        .progress-bar-bg {
            background: rgba($poppy, .3);
            height: 1px;
            width: 100%;
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