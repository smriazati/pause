<template>
  <div v-if="content">
    <div v-if="content.type === 'internal'">
      <nuxt-link :to="`/${content.internalLink}`" class="btn" :class="btnType"
        ><span>{{ content.title }}</span></nuxt-link
      >
    </div>
    <div v-if="content.type === 'external'">
      <a :href="`/${content.externalLink}`" class="btn" :class="btnType"
        ><span>{{ content.title }}</span></a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
    btnType: {
      type: String,
      required: true,
    },
  },
};
</script>