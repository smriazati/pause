<template>
  <div class="page contained">
    <div v-if="page" class="grid">
      <h1 class="headline section-title">{{ page.title }}</h1>
      <div v-if="page.content" class="content">
        <SanityContent :blocks="page.content" />
      </div>
    </div>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async asyncData({ params, error, $sanity }) {
    const query = groq`*[_type == "page"]{title, content, slug}`;
    const pages = await $sanity.fetch(query).then((res) => res);
    const filteredPage = pages.find(
      (pages) => pages.slug.current === params.id
    );
    if (filteredPage) {
      return {
        page: filteredPage,
      };
    } else {
      error();
    }

    return { items };
  },
  data() {
    return {
      title: this.$route.params.id,
    };
  },
};
</script>
