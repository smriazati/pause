<template>
  <header class="site-header">
    <div v-if="!isMobile" class="big-screen wrapper flex-row no-collapse contained">
      <h1>
        <nuxt-link to="/">
          <span class="visually-hidden">Pause</span>
          <SiteLogo :width="160" />
        </nuxt-link>
      </h1>
      <nav>
        <ul class="flex-row">
          <li><nuxt-link to="/about">About</nuxt-link></li>
          <li><nuxt-link to="/services">What to Expect</nuxt-link></li>
          <li v-if="!isBlogHidden"><nuxt-link to="/blog">Blog</nuxt-link></li>
          <li><nuxt-link to="/contact">Contact</nuxt-link></li>
          <li>
            <nuxt-link to="/book" class="btn primary fancy">Book Appointment</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>

    <div v-if="isMobile" :class="isCollapsed ? 'collapsed' : 'expanded'"
      class="small-screen wrapper flex-row no-collapse contained space-between">
      <div class="nav-wrapper">
        <button class="menu-toggle" @click="toggleMenu"></button>
        <nav class="collapse-area">
          <ul class="flex-col">
            <li @click="toggleMenu">
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li @click="toggleMenu">
              <nuxt-link to="/about">About</nuxt-link>
            </li>
            <li @click="toggleMenu">
              <nuxt-link to="/services">What to Expect</nuxt-link>
            </li>
            <li v-if="!isBlogHidden" @click="toggleMenu">
              <nuxt-link to="/blog">Blog</nuxt-link>
            </li>
            <li @click="toggleMenu">
              <nuxt-link to="/contact">Contact</nuxt-link>
            </li>
            <li @click="toggleMenu">
              <nuxt-link to="/book">Schedule Appointment</nuxt-link>
            </li>
          </ul>
          <div class="submark-wrapper">
            <nuxt-link to="/">
              <SiteSubmark />
            </nuxt-link>
          </div>
        </nav>
      </div>

      <h1>
        <nuxt-link to="/">
          <span class="visually-hidden">Pause</span>
          <SiteLogo :width="93" />
        </nuxt-link>
      </h1>

      <nav class="book-btn">
        <nuxt-link to="/book" class="btn primary"><span> Book</span>
        </nuxt-link>
      </nav>
    </div>
  </header>
</template>
<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async fetch() {
    const query = groq`*[_type == "siteSettings"]{
      isBlogHidden
    }[0]`;
    const data = await this.$sanity.fetch(query);
    this.isBlogHidden = data.isBlogHidden;
  },
  fetchOnServer: false,
  data() {
    return {
      isBlogHidden: true,
      isCollapsed: true,
      isMobile: false,
    };
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 960;
    },
    toggleMenu() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>
<style lang="scss">
.site-header {
  background: $white;

  @media (min-width: $collapse-bp) {
    .big-screen {
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

          >li {
            &:not(:last-child) {
              a {
                padding: $ss-spacer 1rem;
                border-bottom: none;
                transition: $transition;
                display: flex;
                position: relative;
                font-weight: 400;

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

  @media (max-width: $collapse-bp) {
    .big-screen {
      display: none;
    }

    .wrapper {
      width: 100%;
      align-items: center;
      padding: 15px 0;

      .nav-wrapper,
      .book-btn {
        flex: 1;
      }

      h1 {
        flex: 2;
        display: flex;
        justify-content: center;
      }

      a:hover {
        border-bottom-color: transparent;
      }

      .book-btn {
        display: flex;
        justify-content: flex-end;
      }
    }

    .menu-toggle {
      width: 18px;
      height: 18px;
      position: relative;

      &:after {
        content: " ";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: $eggplant;
        mask-size: contain;
        mask-repeat: no-repeat;
      }
    }

    h1 {
      opacity: 1;
      transition: 0.3s ease all;
    }

    h1 figure {
      display: flex;
      align-items: center;
    }

    .collapse-area {
      // display: none;
      position: fixed;
      height: 100%;
      background: $periwinkle;
      top: 0;
      left: 0;
      width: 66%;
      z-index: 11;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 5vw;
      transform: translateX(-100vw);
      transition: 0.3s ease all;

      li {
        padding: 1rem 0;
      }

      a {
        font-size: 24px;
        line-height: 32px;
        font-weight: 400;
      }
    }

    .collapsed {
      .menu-toggle {
        &:after {
          mask-image: url("~/assets/icons/menu.svg");
        }
      }

      // .collapse-area {
      //   display: none;
      // }
    }

    .expanded {
      .menu-toggle {
        position: fixed;
        top: 20px;
        left: 5vw;
        z-index: 12;

        &:after {
          mask-image: url("~/assets/icons/close.svg");
        }
      }

      h1 {
        opacity: 0;
      }

      .collapse-area {
        display: flex;
        transform: translateX(0vw);
      }
    }

    .btn.primary {
      padding: 4px 12px;

      >span {
        @include pSmallStyle;
      }
    }

    .submark-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      padding-left: 5vw;
      padding-bottom: 5vw;
    }
  }
}
</style>