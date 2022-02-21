<template>
  <div class="page-template grid contained">
    <main v-if="page" class="content">
      <h1 class="headline section-title">{{ page.title }}</h1>
      <div v-if="page.content" class="content">
        <SanityContent :blocks="page.content" />
      </div>
    </main>
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

<style lang="scss">
.page-template {
  @include containerVertPadding;
  .grid-fixed {
    > .column:first-child {
      grid-row: 1 / 2;
      grid-column: 2 / span 10;
    }
  }
  main {
    h1 {
      margin-bottom: $xl-spacer;
    }
    .content {
      h2 {
        @include pBigStyle;
        margin-bottom: $s-spacer;
      }
    }
  }
}
</style>
