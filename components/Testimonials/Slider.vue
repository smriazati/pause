<template>
  <div class="testimonial-slider">
    <div v-if="content">
      <div class="slider-wrapper">
        <div class="slides" v-if="content.testimonials">
          <VueSlickCarousel ref="carousel" v-bind="slickSettings">
            <div
              class="slide"
              v-for="item in content.testimonials"
              :key="item._key"
            >
              <div class="contained grid-fixed">
                <figure class="icon quote quote-wrapper">
                  <blockquote v-if="item.testimonial">
                    <SanityContent :blocks="item.testimonial" />
                  </blockquote>
                  <figcaption v-if="item.attribution">
                    {{ item.attribution }}
                  </figcaption>
                </figure>
              </div>
            </div>
          </VueSlickCarousel>
        </div>
        <div class="contained grid-fixed">
          <div class="slider-controls">
            <button @click="showPrev()">
              <span class="visually-hidden">Previous</span
              ><span class="icon left"></span>
            </button>
            <button @click="showNext()">
              <span class="visually-hidden">Next</span
              ><span class="icon right"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";
import VueSlickCarousel from "vue-slick-carousel";

export default {
  async fetch() {
    const query = groq`*[_type == 'homePage']{'testimonials': featuredTestimonials[]->{testimonial, attribution}}[0]`;
    this.content = await this.$sanity.fetch(query);
  },
  fetchOnServer: false,
  components: { VueSlickCarousel },
  data: () => ({
    content: null,
    slickSettings: {
      arrows: false,
    },
  }),
  methods: {
    showNext() {
      this.$refs.carousel.next();
    },
    showPrev() {
      this.$refs.carousel.prev();
    },
  },
};
</script>

<style lang="scss">
.testimonial-slider {
  background: $periwinkle;
  padding-top: $xl-spacer;
  padding-bottom: $s-spacer;

  margin-top: $l-spacer;
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  .slider-wrapper,
  .slides {
    width: 100%;
  }

  .grid-fixed {
    .slider-controls {
      margin-top: $s-spacer;
      grid-column: 2 / span 11;
      grid-row: 2 / 3;
      display: flex;
      justify-content: space-between;
      @media (max-width: $collapse-bp) {
        margin-top: $xl-spacer;
      }
    }
  }

  .slide {
    max-width: 100%;
    .grid-fixed {
      figure {
        grid-column: 2 / span 8;
      }
    }
    .quote-wrapper {
      display: flex;
      flex-direction: column;
      > * {
        margin-top: $s-spacer;
      }

      blockquote {
        @include h3Style();
        * {
          @include h3Style();
        }
      }
      figcaption {
        @include pDetailStyle();
        text-transform: uppercase;
      }
    }
  }
}

.slick-track {
  display: flex;
}
</style>