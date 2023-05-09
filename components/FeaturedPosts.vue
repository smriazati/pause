<template>
    <div class="featured-posts-list-wrapper">
        <!-- <div class="featured-posts-title-wrapper">
            <h3>Featured articles</h3>
        </div> -->
        <div class="featured-posts-horizontal-banner">
            <div v-if="posts">
                <div class="panels-wrapper" ref="panelsContainer">
                    <div v-for="(item) in posts" :key="item._key" class="panel" ref="panel">
                        <div class="contained grid-fixed">
                            <div class="text-wrapper">
                                <NuxtLink :to="`/blog/${item.slug.current}`">
                                    <div v-if="item.featuredImg.url" class="image-wrapper">
                                        <img :src="$urlFor(item.featuredImg.url).size(310)" />
                                    </div>
                                    <div class="text-wrapper">
                                        <h4>{{ item.title }}</h4>
                                        <p>{{ item.excerpt }}</p>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
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
    updated() {
        this.setAnim();
    },
    mounted() {
        this.setAnim();
    },
    methods: {
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
// .featured-posts-list-wrapper {
//     padding-left: 15%;
// }

.featured-posts-horizontal-banner .panels-wrapper .panel .grid-fixed {
    width: 100%;
    max-width: 100%;
}

.featured-posts-horizontal-banner {
    background: $eggplant;
    color: $cloud;
    display: flex;
    min-height: 100vh;
    overflow: hidden;

    h2 {
        margin-bottom: $m-spacer;
    }

    .panels-wrapper {
        height: 100vh;
        display: flex;
        flex-wrap: nowrap;
        padding: 0;
        overflow: hidden;

        &:before {
            content: " ";
            display: flex;
            position: absolute;
            width: 100vw;
            border-bottom: 1px solid rgba($poppy, .3);
            z-index: 5;
            bottom: 138px;
        }

        &:after {
            content: " ";
            display: flex;
            position: absolute;
            width: 100vw;
            border-bottom: 1px solid $poppy;
            z-index: 5;
            bottom: 138px;
        }

        .panel {
            position: relative;
            display: flex;
            min-width: unset;
            height: 100vh;
            overflow: hidden;
            align-items: center;
            position: relative;
            overflow: hidden;

            &:first-child {
                padding-left: 7%;
            }

            @media (max-width: $collapse-bp) {
                width: 75%;
            }

            * {
                position: relative;
                z-index: 8;
            }
        }
    }

}


.featured-posts-wrapper {
    background: $eggplant;
    color: $cloud;
    display: flex;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;

    h3 {
        @include pDetailStyle;
        color: $poppy;
    }

    .text-wrapper {
        a {
            display: flex;
            align-items: center;
            width: 620px;
            border-bottom-color: transparent;

            &:hover {
                border-bottom-color: transparent;
            }

            >* {
                flex: 0 0 50%;
            }

            .image-wrapper {
                margin-right: 24px;
            }
        }

        h4 {
            @include h3Style;
        }

        p {
            margin-top: 24px;
        }
    }

}
</style>