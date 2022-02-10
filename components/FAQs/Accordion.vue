<template>
  <div class="contained accordion">
    <div v-if="content">
      <div class="grid-fixed">
        <div class="column title-wrapper">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div class="column">
          <div class="accordion-wrapper">
            <div v-for="item in content" :key="item._id">
              <FAQsAccordionItem :item="item" />
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
  async fetch() {
    const query = groq`*[_type == "faqs"]|order(orderRank)`;
    this.content = await this.$sanity.fetch(query);
  },
  fetchOnServer: false,
  data: () => ({
    content: null,
  }),
};
</script>

<style lang="scss">
.accordion {
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
  }
}
</style>