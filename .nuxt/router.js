import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ca611b10 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _2426ffce = () => interopDefault(import('../pages/book.vue' /* webpackChunkName: "pages/book" */))
const _6e510b0e = () => interopDefault(import('../pages/contact/index.vue' /* webpackChunkName: "pages/contact/index" */))
const _3a2239fc = () => interopDefault(import('../pages/faqs.vue' /* webpackChunkName: "pages/faqs" */))
const _e624377a = () => interopDefault(import('../pages/services.vue' /* webpackChunkName: "pages/services" */))
const _71208bce = () => interopDefault(import('../pages/testimonials.vue' /* webpackChunkName: "pages/testimonials" */))
const _7cfaee82 = () => interopDefault(import('../pages/contact/success.vue' /* webpackChunkName: "pages/contact/success" */))
const _43f9315c = () => interopDefault(import('../pages/file/_slug.vue' /* webpackChunkName: "pages/file/_slug" */))
const _73f5d81f = () => interopDefault(import('../pages/page/_id.vue' /* webpackChunkName: "pages/page/_id" */))
const _8af16586 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _ca611b10,
    name: "about"
  }, {
    path: "/book",
    component: _2426ffce,
    name: "book"
  }, {
    path: "/contact",
    component: _6e510b0e,
    name: "contact"
  }, {
    path: "/faqs",
    component: _3a2239fc,
    name: "faqs"
  }, {
    path: "/services",
    component: _e624377a,
    name: "services"
  }, {
    path: "/testimonials",
    component: _71208bce,
    name: "testimonials"
  }, {
    path: "/contact/success",
    component: _7cfaee82,
    name: "contact-success"
  }, {
    path: "/file/:slug?",
    component: _43f9315c,
    name: "file-slug"
  }, {
    path: "/page/:id?",
    component: _73f5d81f,
    name: "page-id"
  }, {
    path: "/",
    component: _8af16586,
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
