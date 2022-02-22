<template>
  <div class="page-intro-wrapper">
    <div class="contained page-intro" ref="container">
      <div v-if="content">
        <div class="grid-fixed">
          <div
            class="column title-wrapper gsap-fade-in"
            v-if="content.headline"
            ref="headline"
          >
            <h1>{{ content.headline }}</h1>
          </div>
          <div
            v-if="content.subheadline"
            class="column text-wrapper gsap-fade-in"
            ref="text"
          >
            <SanityContent :blocks="content.subheadline" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  props: {
    schemaType: {
      type: String,
      required: true,
    },
  },
  async fetch() {
    const query = groq`*[_type == "${this.schemaType}"]{
      "headline": pageIntro.headline,
      "subheadline": pageIntro.subheadline
    }[0]`;
    this.content = await this.$sanity.fetch(query);
  },
  fetchOnServer: false,
  data: () => ({
    content: null,
  }),
  mounted() {
    // console.log("mounted content", this.content);
  },
  updated() {
    // console.log("updated content", this.content);

    this.setBannerEntranceAnim();
  },
  methods: {
    setBannerEntranceAnim() {
      const gsap = this.$gsap;
      // const container = this.$refs.container;
      const headline = this.$refs.headline;
      const text = this.$refs.text;

      gsap.set(text, {
        autoAlpha: 0,
        x: "25%",
      });

      gsap.set(headline, {
        autoAlpha: 0,
        x: "-25%",
      });

      gsap.to(text, {
        autoAlpha: 1,
        x: 0,
        duration: 1,
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
.page-intro-wrapper {
  border-bottom: 1px solid $cloud;
}
.page-intro {
  @include containerVertPadding;
  min-height: 500px;
  .grid-fixed {
    > .column:first-child {
      grid-row: 1 / 2;
      grid-column: 2 / span 4;
    }
    > .column:nth-child(2) {
      grid-row: 2 / 3;
      grid-column: 6 / span 7;
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
        & + p {
          margin-top: $ss-spacer;
          @include pStyle;
        }
      }
    }
  }
}
</style>