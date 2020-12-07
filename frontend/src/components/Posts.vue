<template>
    <div>
        <Header/>
        <div class="add-post-container">

            <AddPost :refresh="getPosts"/>

        </div>
        <div class="main-container">
            <div class="post" v-for="post in posts" :key="post.id">
                <span class="post-author">
                    <span class="post-author-info">
                        <img :src="post.author.avatar" :alt="post.author | profileName"/>
                        <small>{{post.author | profileName}}</small>
                    </span>
                    <small class="post-date">{{post.createTime | formatDate}}</small>
                </span>
                <div class="post-media" v-if="post.media">
                    <img class="post-image" :src="post.media.url" :alt="post.text" v-if="post.media.type === 'image'">
                    <video class="post-video" controls="" v-if="post.media.type === 'video'">
                        <source type="video/mp4" :src="post.media.url">
                    </video>
                </div>
                <div class="post-title">
                    <h3>{{post.text}}</h3>
                </div>
                <div class="post-actions">
                    <LikeButton :post="post"/>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'
    import Header from './Header'
    import AddPost from './AddPost'
    import LikeButton from './LikeButton'

    export default {
        name: 'Posts',
        components: {
            Header,
            AddPost,
            LikeButton
        },
        methods: {
            getPosts: function() {
                axios.get('posts/')
                    .then((response) => {
                        this.posts = response.data;
                    })
                    .catch(() => {
                        Header.methods.logout()
                    })
            }
        },
        data: function () {
            return {
                posts: []
            }
        },
        mounted() {
            this.getPosts()
        },
        filters: {
            formatDate: function (value) {
                return moment(value).format('LLLL');
            },
            profileName: function (profile) {
                return profile.firstname + ' ' + profile.lastname;
            }
        }
    }
</script>

<style scoped>
    .add-post-container {
        width: 50%;
        min-height: 100%;
        margin: auto auto;
        padding: 15px;
        background-color: #ffffff;
        margin-bottom: 20px;
    }

    .post {
        width: 80%;
        margin: 15px auto;
        box-shadow: 0 0 15px rgba(38, 50, 56, 0.33);
        border-radius: 5px;
    }

    .post .post-author {
        padding: 10px;
    }

    .post .post-author::after {
        content: "";
        display: block;
        clear: both;
    }

    .post .post-author .post-author-info {
        float: left;
        position: relative;
        width: 50%;
        margin: 10px 0;
    }

    .post .post-author .post-author-info img {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        object-fit: cover;
        object-position: top;
        margin: 5px;
    }

    .post .post-author .post-author-info small {
        position: absolute;
        top: 12px;
        left: 45px;
    }

    .post .post-author .post-author-info + small {
        float: right;
        color: grey;
        padding: 10px;
        margin: 10px 0;
    }

    .post .post-media img, video {
        width: 100%;
        min-height: 150px;
        max-height: 350px;
        object-fit: cover;
        object-position: top center;
    }

    .post .post-title {
        padding: 10px;
    }

    .post .post-title h3 {
        display: inline;
    }

    .post .post-title ~ .post-actions {
        padding: 10px;
    }
</style>
