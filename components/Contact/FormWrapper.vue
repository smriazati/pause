<template>
  <div>
    <ContactFormNetlify successRoute="success" />
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

