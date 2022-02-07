<template>
  <header class="site-header">
    <div class="wrapper flex-row contained">
      <h1>
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
    </div>
  </header>
</template>

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
              border-bottom: 1px solid transparent;
              transition: $transition;
              display: flex;
              &.active,
              &:hover {
                border-bottom: 1px solid $poppy;
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