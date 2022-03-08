<template>
  <div class="horizontal-banner">
    <div v-if="content">
      <div v-if="content.panels" class="panels-wrapper" ref="panelsContainer">
        <div
          v-for="(item, index) in content.panels"
          :key="item._key"
          class="panel"
          ref="panel"
        >
          <div class="contained grid-fixed">
            <div class="text-wrapper">
              <div v-if="index > 0" class="counter">
                <p>{{ index }} / {{ content.panels.length - 1 }}</p>
              </div>
              <h2 v-if="item.headline">{{ item.headline }}</h2>
              <p v-if="item.subheadline" class="big">
                {{ item.subheadline }}
              </p>
            </div>
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
 "panels" : horizontalBanner.panels 
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
.horizontal-banner {
  background: $eggplant;
  color: $cloud;
  display: flex;
  align-items: center;
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
    .panel {
      position: relative;
      display: flex;
      min-width: 100vw;
      height: 100vh;
      overflow: hidden;
      align-items: center;
      .grid-fixed {
        .text-wrapper {
          grid-column: 3 / span 8;
          text-align: center;
          background: $eggplant;
          padding: 87px;
          @media (max-width: $collapse-bp) {
            padding: 50px;
          }
        }
      }
      &:first-child {
        .grid-fixed {
          .text-wrapper {
            grid-column: 2 / span 6;
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
    &:before {
      content: " ";
      display: flex;
      position: absolute;
      width: 100%;
      border-bottom: 1px solid $poppy;
      z-index: 5;
    }
    &:first-child:before {
      clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
    }
    &:last-child:before {
      clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
    }
    &:last-child:after {
      content: " ";
      display: flex;
      position: absolute;
      z-index: 5;
      width: 100%;
      border-bottom: 1px solid $poppy;
      // height: 30px;
      transform: rotate(-90deg);
      @media (max-width: $collapse-bp) {
        transform: rotate(-90deg) translateX(-147px);
      }
      clip-path: polygon(0 0, 50% 0, 50% 100%, 0% 100%);
    }
  }

  .counter p {
    @include interTypeface;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    color: $poppy;
    margin-bottom: $s-spacer;
  }
}
@media (max-width: $collapse-bp) {
  .horizontal-banner {
    h2 {
      font-size: 36px;
      line-height: 40px;
    }
    p {
      font-size: 18px;
      line-height: 24px;
    }
  }
}
</style>