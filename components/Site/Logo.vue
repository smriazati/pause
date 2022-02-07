<template>
  <span v-if="content">
    <figure>
      <img :src="$urlFor(content.logo.url).size(93)" :alt="content.logo.alt" />
    </figure>
  </span>
</template>


<script>
import { groq } from "@nuxtjs/sanity";
const query = groq`*[_type == "siteSettings"]{
    "logo": {
        "url": siteLogo.asset->url,
        "alt": siteLogo.asset->altText
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
