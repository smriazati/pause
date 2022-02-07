<template>
  <div class="home page-wrapper">
    <main class="page-container">
      <header class="page-header">
        <HomeBanner />
      </header>
      <section>
        <HorizontalBanner :schemaType="schemaType" />
      </section>
      <section>
        <HomeCTA />
      </section>
      <section>
        <BioBanner :schemaType="schemaType" :readMore="true" />
      </section>
      <section>
        <TestimonialsSlider />
      </section>
      <footer class="page-footer">
        <FooterCTA :schemaType="schemaType" />
      </footer>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Home",
      schemaType: "homePage",
    };
  },
};
</script>
