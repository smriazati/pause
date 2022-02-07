<template>
  <div class="layout-container layout-default" :class="thisRouteClass">
    <SiteHeader />
    <nuxt :key="$route.fullPath" class="site-content" />
    <SiteFooter />
  </div>
</template>

<script>
export default {
  computed: {
    thisRouteClass() {
      const path = this.$route.fullPath;
      let thisRouteClass;
      if (path === "/") {
        thisRouteClass = "home";
      } else {
        thisRouteClass = path.replaceAll("/", "-");
      }
      return thisRouteClass;
    },
  },
};
</script>

<style lang="scss">
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .site-content {
    flex: 2;
  }
}
</style>