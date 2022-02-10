<template>
  <div class="error-page">
    <div class="contained grid-fixed">
      <div class="column blob">
        <div class="text-wrapper flex-col center">
          <h1>404</h1>
          <p>Sorry, this page can’t be found.</p>
          <div>
            <nuxt-link to="/" class="btn text"><span>Go Home</span></nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "home",
  name: "Error",
  mounted() {
    console.log("ERROR", this.error);
  },
};
</script>
<style lang="scss">
.error-page {
  padding: $l-spacer 0;
  .grid-fixed {
    > .column:first-child {
      grid-row: 1 / 2;
      grid-column: 3 / span 8;
      width: 100%;
    }
  }
  .blob {
    mask-position: center center;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text-wrapper {
    padding: $m-spacer;
    text-align: center;
    > *:not(:last-child) {
      margin-bottom: $m-spacer;
    }
  }
}
</style>