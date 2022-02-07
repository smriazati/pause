<template>
  <div class="home page-wrapper">
    <main class="page-container">
      <header>
        <PageIntro :schemaType="schemaType" />
      </header>
      <section>
        <AboutIntro />
      </section>
      <section>
        <HorizontalBanner :schemaType="schemaType" />
      </section>
      <section>
        <AboutPeriBanner />
      </section>
      <section>
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
