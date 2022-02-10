<template>
  <div class="footer-cta">
    <div v-if="content" class="contained" ref="container">
      <div class="grid-fixed">
        <div class="column flex-column text-wrapper gsap-fade-in" ref="text">
          <p v-if="content.bookingCTA" class="big">
            {{ content.bookingCTA }}
          </p>
          <div
            v-if="content.button"
            class="button-wrapper gsap-fade-in"
            ref="btn"
          >
            <CustomButton :content="content.button" btnType="outline" />
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
            "bookingCTA": footerCTA.bookingCTA,
    "button": footerCTA.button
  }[0]`;
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
        y: "15%",
      });
      gsap.set(btn, {
        autoAlpha: 0,
        y: "15%",
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
    },
  },
};
</script>

<style lang="scss">
.footer-cta {
  background: $cloud;
  @media (min-width: $collapse-bp) {
    min-height: 90vh;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .grid-fixed {
    min-height: 100%;

    @media (max-width: $collapse-bp) {
      padding: $l-spacer 0;
    }
    > .column:first-child {
      grid-column: 4 / span 6;
      text-align: center;
      place-self: center;
    }
  }
  .text-wrapper {
    .button-wrapper {
      margin-top: $m-spacer;
    }
  }
}
</style>