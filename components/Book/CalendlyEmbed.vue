<template>
  <div v-if="content">
    <p>{{ content.embed }}</p>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
const query = groq`*[_type == "bookPage"]{
  "embed": embed
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
