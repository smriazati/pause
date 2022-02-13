<template>
  <div class="contained home-banner" ref="container">
    <div v-if="content" class="grid-fixed">
      <div class="column flex-column interlocked-pictures">
        <figure v-if="content.image1" class="gsap-fade-in" ref="img1">
          <img
            :src="$urlFor(content.image1.url).size(295)"
            :alt="content.image1.alt"
            width="295"
          />
        </figure>
        <div class="line gsap-fade-in" ref="line"></div>
        <figure v-if="content.image2" class="gsap-fade-in" ref="img2">
          <img
            :src="$urlFor(content.image2.url).size(295)"
            :alt="content.image2.alt"
            width="295"
          />
        </figure>
      </div>
      <div class="column text-wrapper gsap-fade-in" ref="text">
        <h1 v-if="content.copy.headline">{{ content.copy.headline }}</h1>
        <p v-if="content.copy.subheadline" class="big">
          <SanityContent :blocks="content.copy.subheadline" />
        </p>
        <nuxt-link to="/book" class="btn outline"
          ><span>Schedule Session with Kara</span></nuxt-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";
const query = groq`*[_type == "homePage"]{
    "copy": pageIntro,
    "image1": { 
      "url": introImage1.image.asset->url,
      "alt": introImage2.image.asset->altText
    },
    "image2": { 
      "url": introImage2.image.asset->url,
      "alt": introImage2.image.asset->altText
    },
  }[0]`;
export default {
  async fetch() {
    this.content = await this.$sanity.fetch(query);
  },
  fetchOnServer: false,
  data: () => ({
    content: null,
  }),
  updated() {
    this.setBannerEntranceAnim();
  },
  methods: {
    setBannerEntranceAnim() {
      const gsap = this.$gsap;
      const container = this.$refs.container;
      const text = this.$refs.text;
      const img1 = this.$refs.img1;
      const img2 = this.$refs.img2;

      gsap.set(text, {
        autoAlpha: 0,
        x: "-25%",
      });

      gsap.set(img1, {
        autoAlpha: 0,
        x: "25%",
      });
      gsap.set(img2, {
        autoAlpha: 0,
        x: "25%",
      });

      gsap.to(text, {
        autoAlpha: 1,
        x: 0,
        duration: 1,
      });
      gsap.to(img1, {
        autoAlpha: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
      });
      gsap.to(img2, {
        autoAlpha: 1,
        x: 0,
        duration: 1,
        delay: 0.5,
      });

      const line = this.$refs.line;
      gsap.set(line, {
        height: "30%",
        autoAlpha: 0,
      });
      gsap.to(line, {
        autoAlpha: 1,
        duration: 0.1,
        delay: 1.5,
      });
      gsap.to(line, {
        height: "100%",
        scrollTrigger: {
          trigger: container,
          // markers: true,
          scrub: true,
          start: "top top",
          end: "bottom top",
        },
      });
    },
  },
};
</script>

<style lang="scss">
.home-banner {
  min-height: 700px;
  .text-wrapper {
    > *:not(:last-child) {
      margin-bottom: $m-spacer;
    }
  }
  .grid-fixed {
    > .text-wrapper {
      grid-column: 2 / span 5;
      grid-row: 1 / 2;
    }
    > .interlocked-pictures {
      grid-column: 8 / span 4;
      grid-row: 1 / 2;
    }

    .text-wrapper {
      @include containerVertPadding;
      @media (max-width: $collapse-bp) {
        padding-top: 0;
      }
    }
    .interlocked-pictures {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 0.333fr);
      height: 100%;
      grid-column-gap: 24px;
      grid-row-gap: 10rem;
      padding-top: 2rem;
      @media (max-width: $collapse-bp) {
        display: flex;
        justify-content: center;
      }
      figure {
        position: relative;
      }
      figure:first-child {
        grid-row: 1 / 3;
        grid-column: 1 / 4;
      }
      figure:last-child {
        grid-row: 2 / 4;
        grid-column: 2 / 5;
        padding-left: 1rem;
      }
      .line {
        border-left: 1px solid $eggplant;
        grid-column: 2 / 3;
        grid-row: 1 / 4;
        margin-top: 100px;
        height: 0;
      }
    }
  }
}
</style>