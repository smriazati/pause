<template>
  <div class="bio-banner contained">
    <div v-if="content">
      <div class="grid-fixed">
        <div class="column text-wrapper">
          <h3 v-if="content.headline">{{ content.headline }}</h3>
          <p v-if="content.copy" class="big">
            <SanityContent :blocks="content.copy" />
          </p>
          <div class="button-wrapper" v-if="readMore">
            <nuxt-link class="btn text" to="/about"
              ><span>Read more</span></nuxt-link
            >
          </div>
        </div>
        <div class="column image-wrapper">
          <div class="column flex-column">
            <figure v-if="content.image">
              <img
                :src="$urlFor(content.image.url).size(310)"
                :alt="content.image.alt"
              />
            </figure>
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
    readMore: {
      type: Boolean,
      required: false,
    },
  },
  async fetch() {
    const query = groq`*[_type == "${this.schemaType}"]{
  "headline": bio.headline,
  "copy": bio.bioCopy,
   "image": {
     "url": bio.image.image.asset->url,
     "alt": bio.image.image.asset->altText
   }
  }[0]`;
    this.content = await this.$sanity.fetch(query);
  },
  fetchOnServer: false,
  data: () => ({
    content: null,
  }),
};
</script>

<style lang="scss">
.bio-banner {
  padding: $xxxl-spacer 0 $l-spacer 0;
  @media (max-width: $collapse-bp) {
    padding: $xxl-spacer 0 $m-spacer 0;
  }
  .grid-fixed {
    > .column:first-child {
      grid-column: 2 / span 5;
    }
    > .column:nth-child(2) {
      grid-column: 9 / span 3;
    }

    @media (max-width: $collapse-bp) {
      flex-direction: column-reverse;
    }
  }

  .text-wrapper {
    place-self: center;
    h3 {
      margin-bottom: $m-spacer;
    }
    p {
      margin-bottom: $s-spacer;
    }
    @media (max-width: $collapse-bp) {
      margin-top: -7vh;
    }
  }
  .image-wrapper {
    figure {
      min-width: 100%;
    }
    @media (max-width: $collapse-bp) {
      align-self: flex-end;
      clip-path: circle(50%);
      width: 35vh;
      height: 35vh;
      transform: translateX(25%);
      * {
        height: 100%;
        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>