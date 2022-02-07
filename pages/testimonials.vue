<template>
  <div class="testimonials page-wrapper">
    <main class="page-container">
      <header class="contained grid-fixed">
        <h1>Testimonials</h1>
      </header>
      <section>
        <TestimonialsGrid />
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Testimonials",
    };
  },
};
</script>

<style lang="scss">
.testimonials.page-wrapper {
  padding: $xl-spacer 0;
  header {
    h1 {
      grid-column: 2 / span 11;
    }
  }
}
</style>