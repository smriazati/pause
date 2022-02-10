<template>
  <div class="contained accordion-short">
    <div v-if="content">
      <div class="grid-fixed">
        <div class="column title-wrapper">
          <h2>Your Questions Answered</h2>
        </div>
        <div class="column">
          <div class="accordion-wrapper">
            <div v-for="item in content" :key="item._id">
              <FAQsAccordionItem :item="item" />
            </div>
          </div>
          <div class="cta">
            <p>
              Still have questions?
              <nuxt-link to="/faqs">Visit the FAQ page.</nuxt-link>
            </p>
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
    const query = groq`*[_type == "faqs"]|order(orderRank)[0..2]`;
    this.content = await this.$sanity.fetch(query);
  },
  fetchOnServer: false,
  data: () => ({
    content: null,
  }),
};
</script>

<style lang="scss">
.accordion-short {
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

  .cta {
    border-top: 1px solid $periwinkle;
    padding-top: 56px;
  }
}
</style>