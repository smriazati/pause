<template>
  <header class="site-header">
    <div class="wrapper flex-row contained">
      <h1 :class="isCollapsed ? 'collapsed' : 'expanded'">
        <nuxt-link to="/">
          <span class="visually-hidden">Pause</span>
          <SiteLogo />
        </nuxt-link>
      </h1>
      <nav>
        <ul class="flex-row">
          <li><nuxt-link to="/about">About</nuxt-link></li>
          <li><nuxt-link to="/services">What to Expect</nuxt-link></li>
          <li><nuxt-link to="/contact">Contact</nuxt-link></li>
          <li>
            <nuxt-link to="/book" class="btn primary"
              >Book Appointment</nuxt-link
            >
          </li>
        </ul>
      </nav>

      <nav :class="isCollapsed ? 'collapsed' : 'expanded'">
        <button class="mobile-toggle" @click="toggleMenu"></button>
        <div class="collapse-area">
          <ul class="flex-row no-collapse">
            <li><nuxt-link to="/about">About</nuxt-link></li>
            <li><nuxt-link to="/services">What to Expect</nuxt-link></li>
            <li><nuxt-link to="/contact">Contact</nuxt-link></li>
            <li><nuxt-link to="/book">Schedule Appointment</nuxt-link></li>
          </ul>
          <div class="submark-wrapper">
            <SiteSubmark />
          </div>
        </div>
        <div class="book-cta">
          <nuxt-link to="/book" class="btn primary">Book Appointment</nuxt-link>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      isCollapsed: true,
    };
  },
  methods: {
    toggleMenu() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>
<style lang="scss">
.site-header {
  background: $white;
  .wrapper {
    h1 {
      padding-right: 63px;
      figure {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    }
    nav {
      flex: 2;
      @include interTypeface;
      font-size: 16px;
      font-weight: 400;
      line-height: 19px;
      letter-spacing: 0em;
      display: flex;
      align-items: center;
      ul {
        min-width: 100%;
        align-items: center;
        > li {
          &:not(:last-child) {
            a {
              padding: $ss-spacer 1rem;
              border-bottom: none;
              transition: $transition;
              display: flex;
              position: relative;
              // &.active,
              &:hover {
                border-bottom: none;
              }

              &:after {
                background: none repeat scroll 0 0 transparent;
                bottom: 0;
                content: "";
                display: block;
                height: 1px;
                left: 50%;
                position: absolute;
                background: $poppy;
                transition: width 0.3s ease 0s, left 0.3s ease 0s;
                width: 0;
              }
              &:hover:after {
                width: 100%;
                left: 0;
              }
            }
          }
          &:last-child {
            margin-left: auto;
          }
        }
      }
    }
  }
}
</style>