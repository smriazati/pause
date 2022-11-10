<template>
    <div class="booking-embed">
        <div v-if="content">
            <div v-if="content.embed">
                <div v-html="content.embed"> </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { groq } from "@nuxtjs/sanity";

export default {
    async fetch() {
        const query = groq`*[_type == "bookPage"]{embed}[0]`;
        this.content = await this.$sanity.fetch(query);
    },
    fetchOnServer: false,
    data: () => ({
        content: null,
    })
};
</script>
  