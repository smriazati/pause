<template>
    <div class="page-container post-page">
        <div v-if="post" class="contained grid-fixed">
            <div class="header-wrapper">
                <h2 v-if="post.title">{{ post.title }}</h2>
                <p v-if="dateFormatted">{{ dateFormatted }}</p>
            </div>
            <div class="post-wrapper">
                <div v-if="post.content">
                    <SanityContent :blocks="post.content" :serializers="serializers"></SanityContent>
                </div>
            </div>
            <div class="pagination-wrapper">
                <nuxt-link v-if="prevSlug" :to="`/blog/${prevSlug}`" class="prev-button">{{ prevTitle }}</nuxt-link>
                <nuxt-link v-if="nextSlug" :to="`/blog/${nextSlug}`" class="next-button">{{ nextTitle }}</nuxt-link>
            </div>
        </div>
    </div>
</template>
  
<script>
import { groq } from "@nuxtjs/sanity";
import YouTube from '../../components/Serializers/Youtube.vue'
import Image from '../../components/Serializers/ImageItem.vue'
import SerializerLink from '../../components/Serializers/Link.vue'


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
    mounted() {
        this.getPrevSlug();
        this.getNextSlug();
    },
    methods: {
        async getNextSlug() {
            const lastId = this.post._id;
            const lastDate = this.post.date;
            if (!lastId || !lastDate) {
                return;
            }
            const testQuery = groq`*[_type == "blogs" && (
                date < $lastDate
                || (date == $lastDate && _id < $lastId)
            )] | order(date desc) [0] {
                "slug": slug.current, title
            }`;
            const data = await this.$sanity
                .fetch(testQuery, { lastDate, lastId })
                .then((res) => res);
            this.nextSlug = data.slug;
            this.nextTitle = data.title;
        },
        async getPrevSlug() {
            const lastId = this.post._id;
            const lastDate = this.post.date;
            if (!lastId || !lastDate) {
                return;
            }
            const testQuery = groq`*[_type == "blogs" && (
                date > $lastDate
                || (date == $lastDate && _id > $lastId)
            )] | order(date asc) [0] {
                "slug": slug.current, title
            }`;
            const data = await this.$sanity
                .fetch(testQuery, { lastDate, lastId })
                .then((res) => res);
            this.prevSlug = data.slug;
            this.prevTitle = data.title;
        },
    },
    computed: {
        dateFormatted() {
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            var date = new Date(this.post?.date);
            return date.toLocaleDateString('en-US', options)
        }
    },
    data() {
        return {
            nextSlug: undefined,
            nextTitle: undefined,
            prevSlug: undefined,
            prevTitle: undefined,
            serializers: {
                types: {
                    youtube: YouTube,
                    image: Image
                },
                marks: {
                    // internalLink: NuxtLink,
                    externalLink: SerializerLink,
                }
            }
        };
    }
};
</script>
  
<style lang="scss">
.post-page .grid-fixed {
    margin-top: 129px;

    .header-wrapper {
        grid-column: 2 / span 4;

        p {
            @include pDetailStyle;
            margin-top: 20px;
        }
    }

    .post-wrapper {
        grid-column: 6 / span 7;
        padding-top: 48px;
        margin-bottom: 84px;

        h2 {
            @include pBigStyle;
        }

        p {
            @include pSmallStyle;
        }

        em {
            font-style: italic;
        }

        p+p {
            margin-top: 24px;
        }


        .video-wrapper,
        .image-wrapper {
            max-width: 70%;
            margin: 96px auto;
        }


    }

    .pagination-wrapper {
        grid-column: 6/span 7;
        display: flex;
        justify-content: space-between;
        padding-bottom: 245px;

        >* {
            @include h3Style;
            font-size: 22px;
            line-height: 40px;
            letter-spacing: 0em;
        }

        .prev-button {
            align-self: flex-start;
        }

        .next-button {
            align-self: flex-end;
        }
    }
}
</style>