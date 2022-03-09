export { default as SanityContent } from '../../node_modules/@nuxtjs/sanity/dist/components/sanity-content.js'
export { default as SanityFile } from '../../node_modules/@nuxtjs/sanity/dist/components/sanity-file.js'
export { default as SanityImage } from '../../node_modules/@nuxtjs/sanity/dist/components/sanity-image.js'
export { default as BioBanner } from '../../components/BioBanner.vue'
export { default as CustomButton } from '../../components/CustomButton.vue'
export { default as FooterCTA } from '../../components/FooterCTA.vue'
export { default as HorizontalBanner } from '../../components/HorizontalBanner.vue'
export { default as PageIntro } from '../../components/PageIntro.vue'
export { default as ContactFormNetlify } from '../../components/Contact/FormNetlify.vue'
export { default as ContactFormWrapper } from '../../components/Contact/FormWrapper.vue'
export { default as ContactSecurityMsg } from '../../components/Contact/SecurityMsg.vue'
export { default as BookCalendlyEmbed } from '../../components/Book/CalendlyEmbed.vue'
export { default as AboutIntro } from '../../components/About/Intro.vue'
export { default as AboutPeriBanner } from '../../components/About/PeriBanner.vue'
export { default as SiteFooter } from '../../components/Site/Footer.vue'
export { default as SiteFooterMsg } from '../../components/Site/FooterMsg.vue'
export { default as SiteHeader } from '../../components/Site/Header.vue'
export { default as SiteLogo } from '../../components/Site/Logo.vue'
export { default as SiteSubmark } from '../../components/Site/Submark.vue'
export { default as HomeBanner } from '../../components/Home/Banner.vue'
export { default as HomeCTA } from '../../components/Home/CTA.vue'
export { default as TestimonialsGrid } from '../../components/Testimonials/Grid.vue'
export { default as TestimonialsSlider } from '../../components/Testimonials/Slider.vue'
export { default as FAQsAccordion } from '../../components/FAQs/Accordion.vue'
export { default as FAQsAccordionItem } from '../../components/FAQs/AccordionItem.vue'
export { default as FAQsAccordionShort } from '../../components/FAQs/AccordionShort.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
