<template>
  <div>
    <!-- Calendly inline widget begin -->
    <div
      class="calendly-inline-widget"
      data-url="https://calendly.com/pauseforwomen?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=faf9f8&primary_color=a5b3ea"
      style="min-width: 320px; height: 630px"
    ></div>
    <!-- <script
      type="text/javascript"
      src="https://assets.calendly.com/assets/external/widget.js"
      async
    ></script> -->
    <!-- Calendly inline widget end -->
  </div>
  <!-- <div v-if="content">
    <div v-html="content.embed"></div>
  </div> -->
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
