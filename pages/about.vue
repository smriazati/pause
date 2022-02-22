<template>
  <div class="about page-wrapper">
    <main class="page-container">
      <header>
        <PageIntro :schemaType="schemaType" />
      </header>
      <section>
        <AboutIntro />
      </section>
      <section class="banner-section">
        <HorizontalBanner :schemaType="schemaType" />
      </section>
      <section>
        <AboutPeriBanner />
      </section>
      <section class="bio-section">
        <BioBanner :schemaType="schemaType" :readMore="false" />
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
      name: "About",
      schemaType: "aboutPage",
    };
  },
};
</script>

<style lang="scss">
.about.page-wrapper {
  @media (max-width: $collapse-bp) {
    .banner-section {
      margin-top: -40vh;
    }
    .bio-section {
      margin-top: -25vh;
    }
  }
}
</style>
