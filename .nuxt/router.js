import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5570e6a8 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _bc2e61cc = () => interopDefault(import('../pages/book.vue' /* webpackChunkName: "pages/book" */))
const _7c149d7c = () => interopDefault(import('../pages/contact/index.vue' /* webpackChunkName: "pages/contact/index" */))
const _60b0b24e = () => interopDefault(import('../pages/faqs.vue' /* webpackChunkName: "pages/faqs" */))
const _a941a4e2 = () => interopDefault(import('../pages/services.vue' /* webpackChunkName: "pages/services" */))
const _4e437d65 = () => interopDefault(import('../pages/testimonials.vue' /* webpackChunkName: "pages/testimonials" */))
const _82d31c1a = () => interopDefault(import('../pages/contact/success.vue' /* webpackChunkName: "pages/contact/success" */))
const _db31bd2a = () => interopDefault(import('../pages/page/_id.vue' /* webpackChunkName: "pages/page/_id" */))
const _1601311e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _5570e6a8,
    name: "about"
  }, {
    path: "/book",
    component: _bc2e61cc,
    name: "book"
  }, {
    path: "/contact",
    component: _7c149d7c,
    name: "contact"
  }, {
    path: "/faqs",
    component: _60b0b24e,
    name: "faqs"
  }, {
    path: "/services",
    component: _a941a4e2,
    name: "services"
  }, {
    path: "/testimonials",
    component: _4e437d65,
    name: "testimonials"
  }, {
    path: "/contact/success",
    component: _82d31c1a,
    name: "contact-success"
  }, {
    path: "/page/:id?",
    component: _db31bd2a,
    name: "page-id"
  }, {
    path: "/",
    component: _1601311e,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
