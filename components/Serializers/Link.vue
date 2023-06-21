<template>
    <span>
        <nuxt-link :to="destination ? destination : '/'" v-if="checkIfLocal">
            <slot />
        </nuxt-link>
        <a :href="href" :target="blank ? '_blank' : ''" v-else>
            <slot />
        </a>
    </span>
</template>
  
<script>
// const props = defineProps(['type', 'destination', 'href', 'blank'])
// const checkIfLocal = computed(() => {
//     if (type == 'internal') {
//         return true;
//     } else {
//         return false;
//     }
// })


export default {
    props: ['type', 'destination', 'href', 'blank'],
    computed: {
        checkIfLocal() {
            if (this.type == 'internal') {
                return true;
            } else {
                return false;
            }
        }
    }
};
</script>