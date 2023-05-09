<template>
    <div class="template-blog">
        <header>
            <BlogPageIntro></BlogPageIntro>
        </header>
        <div class="featured-posts-wrapper">
            <BlogFeaturedPosts :posts="featured"></BlogFeaturedPosts>
        </div>

        <div class="post-list-wrapper contained">
            <div class="grid-fixed">
                <div>
                    <h3>Recent articles</h3>
                    <ul v-if="posts">
                        <li v-for="item in posts" :key="item._id">
                            <NuxtLink :to="`/blog/${item.slug.current}`">{{ item.title }}</NuxtLink>
                        </li>
                    </ul>
                    <div class="button-wrapper">
                        <nuxt-link to="/blog/archive" class="btn outline"><span>Continue reading</span></nuxt-link>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
    async asyncData({ $sanity }) {
        const query = groq`*[_type == "blogs"]|order(date asc)[0...9]{
            title, slug, _id
        }`;
        const featuredQuery = groq`*[_type == "blogs" && featured]|order(date asc)[0...3]{
            title, slug, _id, excerpt, 
            "featuredImg": {
                "url": featuredImg.asset->url,
                "alt": featuredImg.asset->altText
            }
        }`
        const posts = await $sanity.fetch(query).then((res) => res);
        const featured = await $sanity.fetch(featuredQuery).then((res) => res)
        return { posts, featured };
    }
};
</script>
  
<style lang="scss">
.template-blog .intro-wrapper .grid-fixed {
    h2 {
        grid-row: 1/2;
        grid-column: 2/span 5;
    }
}


.template-blog .post-list-wrapper .grid-fixed {
    padding-top: 144px;

    >div {
        grid-column: 2 / span 7;
        padding-bottom: 260px;
    }
}



.post-list-wrapper {
    h3 {
        @include pDetailStyle;
    }

    ul {
        margin-top: 78px;
        margin-bottom: 132px;
        list-style: none;
        display: flex;
        flex-direction: column;

        li {
            @include h3Style;

            &:not(:last-child) {
                margin-bottom: 48px;
            }

            a {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom-color: transparent;

                &:hover {
                    border-bottom-color: transparent;
                }

                &:after {
                    content: "";
                    background-image: url('/icons/caret.svg');
                    width: 11px;
                    height: 20px;
                    background-repeat: no-repeat;
                    background-size: contain;
                }

            }
        }
    }
}
</style>