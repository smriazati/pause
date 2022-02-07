<template>
  <div v-if="content">
    <p class="small">{{ content.message }}</p>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
const query = groq`*[_type == "contactPage"]{
  "message": securityMsg
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
