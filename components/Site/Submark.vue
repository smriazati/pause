<template>
  <span v-if="content">
    <figure>
      <img
        :src="$urlFor(content.submark.url).size(93)"
        :alt="content.submark.alt"
      />
    </figure>
  </span>
</template>


<script>
import { groq } from "@nuxtjs/sanity";
const query = groq`*[_type == "siteSettings"]{
    "submark": {
        "url": favicon.asset->url,
        "alt": favicon.asset->altText
    }
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
