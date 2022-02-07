<template>
  <div class="contained about-intro">
    <div v-if="content">
      <div class="grid-fixed">
        <div class="column text-wrapper">
          <h3 class="h2" v-if="content.headline">{{ content.headline }}</h3>
          <div v-if="content.copy" class="paragraphs-wrapper">
            <SanityContent :blocks="content.copy" />
          </div>
        </div>
        <div class="column list-wrapper blob">
          <div v-if="content.list">
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
    justify-content: center;
    align-items: flex-start;
    p {
      @include pDetailStyle;
      text-transform: uppercase;
    }
    ul {
      padding-left: 1rem;
      @include pSmallStyle;
    }
  }
}
</style>