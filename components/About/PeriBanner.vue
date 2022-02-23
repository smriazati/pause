<template>
  <div class="peri-banner">
    <div v-if="content" class="contained">
      <div class="grid-fixed">
        <div class="column" v-if="content.headline">
          <h2 class="h3">{{ content.headline }}</h2>
        </div>
        <div class="column" v-if="content.subheadline">
          <div>
            <p>{{ content.subheadline }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";
const query = groq`*[_type == "aboutPage"]{
  "headline": blue_headline,
  "subheadline": blue_subheadline
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
.peri-banner {
  background: $periwinkle;
  @include containerVertPadding;
  @media (max-width: $collapse-bp) {
    padding: $xxxl-spacer 0;
  }
  .grid-fixed {
    > .column:first-child {
      grid-column: 2 / span 4;
      grid-row: 1 / 2;
    }
    > .column:nth-child(2) {
      grid-column: 6 / span 7;
      grid-row: 1 / 2;
    }
    p {
      @include pBigStyle;
      @media (max-width: $collapse-bp) {
        margin-top: $m-spacer;
      }
    }
    h2.h3 {
      @media (max-width: $collapse-bp) {
        @include h2Style;
      }
    }
  }
}
</style>