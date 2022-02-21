<template>
  <footer class="site-footer">
    <div class="wrapper contained">
      <nav class="primary">
        <ul class="flex-row">
          <li><nuxt-link to="/about">About</nuxt-link></li>
          <li><nuxt-link to="/services">What to Expect</nuxt-link></li>
          <li><nuxt-link to="/faqs">FAQs</nuxt-link></li>
          <li><nuxt-link to="/testimonials">Testimonials</nuxt-link></li>
          <li><nuxt-link to="/contact">Contact</nuxt-link></li>
          <li><nuxt-link to="/book">Schedule</nuxt-link></li>
        </ul>
      </nav>
      <div class="brand">
        <nuxt-link to="/"><SiteSubmark /></nuxt-link>
      </div>
      <nav class="secondary">
        <ul class="flex-row no-collapse">
          <li>
            <nuxt-link to="/page/privacy-policy">Privacy Policy</nuxt-link>
          </li>
          <li><nuxt-link to="/page/terms">Terms of Use</nuxt-link></li>
        </ul>
      </nav>
      <div class="disclaimer">
        <SiteFooterMsg />
      </div>
      <div class="back-to-top">
        <button class="btn text" @click="backToTop">Back to Top</button>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    backToTop(e) {
      e.target.blur();
      console.log("clicked b2top!");
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
  },
};
</script>
<style lang="scss">
footer.site-footer {
  background: white;
  .wrapper {
    display: grid;
    @media (min-width: $collapse-bp) {
      padding: $xxl-spacer 0 $ss-spacer 0;
    }
    grid-template-rows: auto auto auto;
    grid-template-columns: 100px 1fr 100px;
    grid-template-areas:
      "nav1 nav1 nav1"
      "mark nav2 btn"
      "mark disc btn";
    @media (max-width: $collapse-bp) {
      grid-template-rows: auto auto auto auto;

      grid-template-columns: repeat(3, 1fr);
      grid-template-areas:
        "nav1 nav1 nav1"
        "mark . btn"
        "nav2 nav2 nav2"
        "disc disc disc";
    }
    nav.primary {
      grid-area: nav1;
      place-self: center;
      @media (min-width: $collapse-bp) {
        padding-bottom: $l-spacer;
      }
      @media (max-width: $collapse-bp) {
        text-align: center;
        padding-top: $s-spacer;

        li {
          margin-bottom: 8px;
        }
      }
    }
    .brand {
      grid-area: mark;
      figure {
        max-width: 100px;
      }
    }
    nav.secondary {
      grid-area: nav2;
      @media (max-width: $collapse-bp) {
        padding: 12px 0;
      }
    }
    .disclaimer {
      grid-area: disc;
      @media (max-width: $collapse-bp) {
        padding: 12px 0 24px 0;
      }
    }
    .back-to-top {
      grid-area: btn;
      justify-self: end;
      align-self: end;
      @media (max-width: $collapse-bp) {
        align-self: center;
      }
    }
  }
}

footer.site-footer {
  nav.primary {
    @include interTypeface;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 29px;
    letter-spacing: -0.015em;

    ul li {
      padding: 0 1.25rem;
    }
  }

  nav.secondary {
    ul {
      justify-content: center;

      li {
        @include interTypeface;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 17px;
        letter-spacing: -0.015em;

        a {
          opacity: 0.7;
        }

        &:first-child {
          &:after {
            content: "|";
            padding: 0 2ch;
            opacity: 0.7;
          }
        }
      }
    }
  }

  .disclaimer {
    p {
      @include interTypeface;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: -0.015em;
      text-align: center;
      opacity: 0.7;
    }
  }
}
</style>