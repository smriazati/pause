<template>
    <client-only>
        <div class="video-wrapper">
            <div class="iframe-wrapper">
                <youtube :video-id="videoId"></youtube>
            </div>
            <p>{{ caption }}</p>
        </div>
    </client-only>
</template>
<script>
import getId from "get-youtube-id";

export default {
    data() {
        return {
            videoId: getId(this.url)
        };
    },
    props: {
        url: {
            type: String,
            default: () => ""
        },
        caption: {
            type: String
        }
    }
};
</script>

<style lang="scss" scoped>
p {
    text-align: left;
    @include pSmallStyle;
    color: #ADADAD;
    margin-top: 15px;
}
</style>