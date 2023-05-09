<template>
    <div class="archive-template">
        <div class="grid-fixed contained">
            <h1>All blog articles</h1>
            <div v-for="item in postList" :key="item.id">
                <h2>{{ item.date }}</h2>
                <ul>
                    <li v-for="post in item.posts" :key="post._id">
                        <nuxt-link :to="`/blog/${post.slug.current}`"> {{ post.title }}</nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
    async asyncData({ $sanity }) {
        const query = groq`*[_type == "blogs"]|order(date asc)[0...100]{
            title, slug,date, _id
        }`;
        const posts = await $sanity.fetch(query).then((res) => res);
        return { posts };
    },
    computed: {
        postList() {
            const list = [];
            this.posts.forEach((post, index) => {
                const dateRaw = new Date(post.date);
                var options = { year: 'numeric', month: 'long' };
                const date = dateRaw.toLocaleDateString("en-US", options);
                const match = list.findIndex(listItem => listItem.date == date)
                if (match > 0) {
                    list[match].posts.push(post)
                } else {
                    list.push({ id: `${index}-${index}`, date: date, posts: [post] })
                }
            })
            return list.reverse()
        }
    }
};
</script>
<style lang="scss" scoped>
.archive-template {
    .grid-fixed {
        padding-top: 129px;
        padding-bottom: 129px;

        >* {
            grid-column: 2 / span 7;
        }
    }

    h1 {
        @include h2Style;
    }

    h2 {
        margin-top: 120px;
        @include pDetailStyle;
        margin-bottom: 72px;
    }

    ul {
        list-style: none;

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
