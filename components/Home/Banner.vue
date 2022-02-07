<template>
  <div class="contained home-banner">
    <div v-if="content">
      <div class="grid-fixed">
        <div class="column text-wrapper">
          <h1 v-if="content.copy.headline">{{ content.copy.headline }}</h1>
          <p v-if="content.copy.subheadline" class="big">
            <SanityContent :blocks="content.copy.subheadline" />
          </p>
          <nuxt-link to="/book" class="btn outline"
            ><span>Schedule Session with Kara</span></nuxt-link
          >
        </div>
        <div class="column flex-column interlocked-pictures">
          <figure v-if="content.image1">
            <img
              :src="$urlFor(content.image1.url).size(295)"
              :alt="content.image1.alt"
            />
          </figure>
          <figure v-if="content.image2">
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
};
</script>

<style lang="scss">
.home-banner {
  .text-wrapper {
    > *:not(:last-child) {
      margin-bottom: $m-spacer;
    }
  }
  .grid-fixed {
    > .column:first-child {
      grid-column: 2 / span 5;
    }
    > .column:nth-child(2) {
      grid-column: 8 / span 4;
    }

    .text-wrapper {
      padding: $xl-spacer 0;
    }
    .interlocked-pictures {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 0.333fr);
      height: 100%;
      grid-gap: 10rem;
      figure:first-child {
        grid-row: 1 / 3;
        grid-column: 1 / 4;
        padding-top: 1rem;
      }
      figure:last-child {
        grid-row: 2 / 4;
        grid-column: 2 / 5;
      }
    }
  }
}
</style>