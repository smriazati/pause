<template>
  <div class="contained about-intro" ref="container">
    <div v-if="content">
      <div class="grid-fixed">
        <div class="column text-wrapper">
          <h3 class="h2" v-if="content.headline">{{ content.headline }}</h3>
          <div v-if="content.copy" class="paragraphs-wrapper">
            <SanityContent :blocks="content.copy" />
          </div>
        </div>
        <div class="column list-wrapper blob gsap-fade-in" ref="bg">
          <div class="inner-list gsap-fade-in" v-if="content.list" ref="text">
            <SanityContent :blocks="content.list" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
const query = groq`*[_type == "aboutPage"]{
  "headline": detail_headline,
  "copy": detail_copy,
 "list": detail_list
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
      const bg = this.$refs.bg;

      gsap.set(text, {
        autoAlpha: 0,
      });
      gsap.set(bg, {
        autoAlpha: 0,
      });
      gsap.to(bg, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
          trigger: text,
          scrub: false,
          // markers: true,
        },
      });
      gsap.to(text, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: text,
          scrub: false,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.about-intro {
  padding: $xxl-spacer 0;
  .grid-fixed {
    > .column:first-child {
      grid-row: 1 / 2;
      grid-column: 2 / span 5;
    }
    > .column:nth-child(2) {
      grid-row: 1 / 2;
      grid-column: 7 / span 5;
    }
  }

  .text-wrapper {
    display: flex;
    flex-direction: column;
    h3 {
      margin-bottom: $s-spacer;
    }
    .paragraphs-wrapper {
      div {
        p:not(:last-child) {
          margin-bottom: $s-spacer;
        }
      }
    }
  }
  .list-wrapper {
    background: $periwinkle;
    mask-image: url("~/assets/icons/blob.svg");
    mask-repeat: no-repeat;
    mask-size: contain;
    padding: 2.5rem 5.5rem;
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    @media (max-width: $collapse-bp) {
      justify-content: center;
    }
    .inner-list {
      @media (max-width: $collapse-bp) {
        padding: 5vw 0;
        text-align: center;
        width: 100%;
      }
    }
    p {
      @include pDetailStyle;
      padding-top: 1rem;
      text-transform: uppercase;
    }
    ul {
      padding-left: 1rem;
      @include pSmallStyle;
      @media (max-width: $collapse-bp) {
        li {
          padding: 5px 0;
        }
      }
    }
  }
}
</style>