<template>
  <div class="contained home-cta" ref="container">
    <div v-if="content">
      <div class="grid-fixed">
        <div class="column image-wrapper image-wrapper-1">
          <figure v-if="content.image1" ref="image1">
            <img
              :src="$urlFor(content.image1.url).size(295)"
              :alt="content.image1.alt"
            />
          </figure>
        </div>
        <div class="column text-wrapper gsap-fade-in" ref="text">
          <h3 v-if="content.bookingCTA">
            {{ content.bookingCTA }}
          </h3>
          <div
            class="button-wrapper gsap-fade-in"
            v-if="content.bookingCTABtn"
            ref="btn"
          >
            <CustomButton :content="content.bookingCTABtn" btnType="primary" />
          </div>
        </div>
        <div class="column image-wrapper image-wrapper-2">
          <figure v-if="content.image2" ref="image2">
            <img
              :src="$urlFor(content.image2.url).size(295)"
              :alt="content.image2.alt"
            />
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";
const query = groq`*[_type == "homePage"]{
  bookingCTA,
  bookingCTABtn,
    "image1": { 
      "url": ctaImage1.image.asset->url,
      "alt": ctaImage1.image.asset->altText
    },
    "image2": { 
      "url": ctaImage2.image.asset->url,
      "alt": ctaImage2.image.asset->altText
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
    this.setAnim();
  },
  methods: {
    setAnim() {
      const gsap = this.$gsap;
      const container = this.$refs.container;
      const text = this.$refs.text;
      const btn = this.$refs.btn;

      gsap.set(text, {
        autoAlpha: 0,
        y: "10%",
      });
      gsap.set(btn, {
        autoAlpha: 0,
        y: "10%",
      });
      gsap.to(text, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
          trigger: container,
          scrub: false,
        },
      });
      gsap.to(btn, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: container,
          scrub: false,
        },
      });
      if (window.innerWidth < 960) {
        return;
      }
      const img1 = this.$refs.image1;
      const img2 = this.$refs.image2;

      gsap.to(img1, {
        y: -200,
        scrollTrigger: {
          trigger: container,
          // markers: true,
          scrub: true,
        },
      });
      gsap.to(img2, {
        y: -50,
        scrollTrigger: {
          trigger: container,
          // markers: true,
          scrub: true,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.home-cta {
  .grid-fixed {
    > .column {
      grid-row: 1 / 2;
    }
    > .column:first-child {
      grid-column: 2 / span 2;
    }
    > .column:nth-child(2) {
      grid-column: 4 / span 6;
    }
    > .column:nth-child(3) {
      grid-column: 10 / span 2;
    }

    .text-wrapper {
      place-self: center;
      padding: $s-spacer 0;
      @media (min-width: $collapse-bp) {
        padding: 240px 0;
      }
      text-align: center;
      .button-wrapper {
        margin-top: $ss-spacer;
      }
    }
    .image-wrapper {
      figure {
        min-width: 100%;
      }
    }
    .image-wrapper-1 {
      place-self: end;
      @media (max-width: $collapse-bp) {
        transform: translateX(15%);
      }
    }
    .image-wrapper-2 {
      place-self: start;
      @media (max-width: $collapse-bp) {
        transform: translateX(-15%);
      }
    }
  }
}
</style>