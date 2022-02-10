<template>
  <div class="contained page-intro">
    <div v-if="content">
      <div class="grid-fixed">
        <div class="column title-wrapper" v-if="content.headline">
          <h1>{{ content.headline }}</h1>
        </div>
        <div v-if="content.subheadline" class="column text-wrapper">
          <SanityContent :blocks="content.subheadline" />
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
};
</script>

<style lang="scss">
.page-intro {
  @include containerVertPadding;
  .grid-fixed {
    > .column:first-child {
      grid-row: 1 / 2;
      grid-column: 2 / span 4;
    }
    > .column:nth-child(2) {
      grid-row: 2 / 3;
      grid-column: 6 / span 7;
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