<template>
  <div v-if="content" class="contained grid-fixed testimonial-grid">
    <figure
      v-for="item in content"
      :key="item._id"
      class="testimonial-grid-item"
    >
      <blockquote>
        <SanityContent :blocks="item.testimonial" />
      </blockquote>
      <figcaption>
        {{ item.attribution }}
      </figcaption>
    </figure>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
const query = groq`*[_type == "testimonials"]|order(orderRank){
    testimonial, attribution, _id }`;
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
.testimonial-grid {
  padding: $l-spacer 0;
  grid-row-gap: $l-spacer;
  figure:nth-child(odd) {
    grid-column: 2 / span 5;
  }
  figure:nth-child(even) {
    grid-column: 7 / span 5;
  }
  figure {
    blockquote * {
      @include h3Style;
    }
    blockquote {
      margin-bottom: $s-spacer;
    }
  }
}
</style>