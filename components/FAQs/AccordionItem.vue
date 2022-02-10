<template>
  <div
    class="accordion-item"
    ref="accordionItem"
    :class="isExpanded ? 'accordion-item-expanded' : ''"
  >
    <div
      v-if="!isExpanded"
      class="accordion-open link-hover"
      @click="openAccordion()"
    >
      <div class="flex-row no-collapse space-between">
        <h3>{{ item.question }}</h3>
        <button class="icon down"></button>
      </div>
    </div>
    <div v-else class="accordion-collapse-area">
      <div class="flex-column">
        <div
          class="flex-row no-collapse space-between"
          @click="closeAccordion()"
        >
          <h3>{{ item.question }}</h3>
          <button class="icon up"></button>
        </div>

        <SanityContent :blocks="item.answer" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    openAccordion() {
      this.isExpanded = true;
      // set height
    },

    closeAccordion() {
      this.isExpanded = false;
    },
  },
};
</script>

<style lang="scss">
.accordion-item {
  padding: 28px 0;
  border-top: 1px solid $periwinkle;
  h3 {
    @include pBigStyle;
  }
  .accordion-collapse-area {
    h3 {
      margin-bottom: 28px;
    }
  }
}
</style>

