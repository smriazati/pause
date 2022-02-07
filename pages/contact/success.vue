<template>
  <div class="home page-wrapper">
    <main class="page-container">
      <header>
        <PageIntro :schemaType="schemaType" />
      </header>
      <section class="contact-form-wrapper grid-fixed">
        <p>Your message has been sent.</p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Contact",
      schemaType: "contactPage",
    };
  },
};
</script>
