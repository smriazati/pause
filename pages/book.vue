<template>
  <div class="home page-wrapper">
    <main class="page-container">
      <header>
        <PageIntro :schemaType="schemaType" />
      </header>
      <section>
        <CalendlyEmbed />
      </section>
    </main>
  </div>
</template>

<script>
import CalendlyEmbed from "../components/Book/CalendlyEmbed.vue";
export default {
  components: { CalendlyEmbed },
  data() {
    return {
      name: "Book",
      schemaType: "bookPage",
    };
  },
};
</script>
