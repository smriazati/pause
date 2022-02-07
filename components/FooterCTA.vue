<template>
  <div class="footer-cta">
    <div v-if="content" class="contained">
      <div class="grid-fixed">
        <div class="column flex-column text-wrapper">
          <p v-if="content.bookingCTA" class="big">
            {{ content.bookingCTA }}
          </p>
          <div v-if="content.button" class="button-wrapper">
            <CustomButton :content="content.button" btnType="outline" />
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
            "bookingCTA": footerCTA.bookingCTA,
    "button": footerCTA.button
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
.footer-cta {
  background: $cloud;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .grid-fixed {
    min-height: 100%;
    > .column:first-child {
      grid-column: 4 / span 6;
      text-align: center;
      place-self: center;
    }
  }
  .text-wrapper {
    .button-wrapper {
      margin-top: $m-spacer;
    }
  }
}
</style>