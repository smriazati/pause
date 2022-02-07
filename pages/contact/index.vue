<template>
  <div class="contact page-wrapper">
    <main class="page-container">
      <header>
        <PageIntro :schemaType="schemaType" />
      </header>
      <section class="contact-form-wrapper grid-fixed">
        <ContactFormNetlify
          :email="true"
          :name="true"
          :message="true"
          successRoute="success"
        />
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

<style lang="scss">
.contact.page-wrapper {
  padding-bottom: $xl-spacer;
  .contact-form-wrapper {
    > * {
      grid-column: 6 / span 7;
    }
  }
}
</style>
