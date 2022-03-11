<template>
  <div>
    <div
      class="calendly-inline-widget"
      data-url="https://calendly.com/pauseforwomen?primary_color=a5b3ea"
      style="min-width: 320px; height: 630px"
    ></div>
  </div>
</template>

<script>
// import { groq } from "@nuxtjs/sanity";
// const query = groq`*[_type == "bookPage"]{
//   "embed": embed
// }[0]`;
export default {
  head: {
    script: [
      {
        src: "https://assets.calendly.com/assets/external/widget.js",
        async: true,
      },
    ],
  },
  // async fetch() {
  //   this.content = await this.$sanity.fetch(query);
  // },
  // fetchOnServer: false,
  // data: () => ({
  //   content: null,
  // }),
};
</script>
