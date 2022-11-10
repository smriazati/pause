<template>
  <div class="home page-wrapper">
    <main class="page-container">
      <header>
        <PageIntro :schemaType="schemaType" />
      </header>
      <section>
        <BookingEmbed />
      </section>
    </main>
  </div>
</template>

<script>
import BookingEmbed from "../components/Book/BookingEmbed.vue";
export default {
  components: { BookingEmbed },
  data() {
    return {
      name: "Book",
      schemaType: "bookPage",
    };
  },
};
</script>
