<template>
    <div v-if="asset" class="image-wrapper">
        <img :src="$urlFor(asset.url).size(600)" :alt="asset.altText" />
    </div>
</template>
<script>

export default {
    props: {
        asset: {
            type: Object,
        }
    }
};
</script>