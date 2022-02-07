<template>
  <div v-if="content">
    <p>
      {{ content.message }}
      <a href="https://otherlove.co" target="_blank">Made with Otherlove</a>
    </p>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
const query = groq`*[_type == "siteSettings"]{
  "message": footerMsg
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
