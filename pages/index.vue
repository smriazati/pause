<template>
  <div class="home page-wrapper">
    <div id="ff-6480948e547f639e72ba5377"></div>

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
  methods: {
    initFlodesk() {
      (function (w, d, t, h, s, n) {
        w.FlodeskObject = n;
        var fn = function () {
          (w[n].q = w[n].q || []).push(arguments);
        };
        w[n] = w[n] || fn;
        var f = d.getElementsByTagName(t)[0];
        var v = '?v=' + Math.floor(new Date().getTime() / (120 * 1000)) * 60;
        var sm = d.createElement(t);
        sm.async = true;
        sm.type = 'module';
        sm.src = h + s + '.mjs' + v;
        f.parentNode.insertBefore(sm, f);
        var sn = d.createElement(t);
        sn.async = true;
        sn.noModule = true;
        sn.src = h + s + '.js' + v;
        f.parentNode.insertBefore(sn, f);
      })(window, document, 'script', 'https://assets.flodesk.com', '/universal', 'fd');
    }
  },
  created() {
    if (process.browser) {
      this.initFlodesk();
      window.fd('form', {
        formId: '6480948e547f639e72ba5377',
        containerEl: '#ff-6480948e547f639e72ba5377'
      });
    }
  },
  beforeUpdate() {
    if (process.browser) {
      this.initFlodesk();
      window.fd('form', {
        formId: '6480948e547f639e72ba5377',
        containerEl: '#ff-6480948e547f639e72ba5377'
      });
    }
  }
};
</script>
