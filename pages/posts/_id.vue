<template>
    <div class="page-container post-page">
        <div v-if="post">
            <h2 v-if="post.title">{{ post.title }}</h2>
            <div v-if="post.content">
                <SanityContent :blocks="post.content" :serializers="serializers"></SanityContent>
            </div>
        </div>
    </div>
</template>
  
<script>
import { groq } from "@nuxtjs/sanity";
import YouTube from '../../components/Serializers/Youtube.vue'
import Image from '../../components/Serializers/ImageItem.vue'


export default {
    async asyncData({ params, $sanity }) {
        const query = groq`*[_type == "blogs"  && slug.current == "${params.id}"]{
            ...,
            content[]{
                ...,
                _type == "image" => {
                ...,
                asset->
                }
            }
        }[0]`;
        const post = await $sanity.fetch(query).then((res) => res);
        return { post };
    },
    data() {
        return {
            serializers: {
                types: {
                    youtube: YouTube,
                    image: Image
                }
            }
        };
    }
};
</script>
  