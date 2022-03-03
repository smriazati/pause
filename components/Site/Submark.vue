<template>
  <span v-if="content">
    <figure>
      <img
        :src="$urlFor(content.submark.url).size(93)"
        :alt="content.submark.alt"
        width="93"
      />
    </figure>
  </span>
</template>


<script>
import { groq } from "@nuxtjs/sanity";
const query = groq`*[_type == "siteSettings"]{
    "submark": {
        "url": submark.image.asset->url,
        "alt": submark.image.asset->altText
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
