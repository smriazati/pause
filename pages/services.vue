<template>
  <div class="home page-wrapper">
    <main class="page-container">
      <header>
        <PageIntro :schemaType="schemaType" />
      </header>
      <section>
        <HorizontalBanner :schemaType="schemaType" />
      </section>
      <section>
        <FAQsAccordionShort />
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
      name: "Services",
      schemaType: "servicesPage",
    };
  },
};
</script>
