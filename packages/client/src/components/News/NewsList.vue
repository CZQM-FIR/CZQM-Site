<template>
    <div class="box">
        <h2><i class="fa-solid fa-newspaper"></i> News Articles</h2>
        <ul class="news-list">
            <div v-if="news.length == 0">
                <li>No News Articles Published</li>
            </div>
            <div v-else>
                <li v-for="article in news" :key="article">
                    <div class="article">
                        <span class="news-name">{{article.name}}</span>
                        <span class="news-time">{{getTime(article)}}</span>
                        <span class="news-learn-more"><router-link :to="{ path: '/news', query: { _id: article._id}}">Read More <i class="fa-solid fa-chevron-right"></i></router-link></span>
                    </div>
                </li>
            </div>
        </ul>
    </div>
</template>

<script>
    import { ref } from "vue";
    import getNews from '../../scripts/getNews'

    export default {
        setup: async () => {
            let news = ref(await getNews());

            return {
                news
            };
        },
        methods: {
            getTime: (article) => {
                const time = new Date(article.date);

                // Format the time/date in DD/MM HHMMz format
                const timeString = `${time.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2})}/${(time.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2})} ${time.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2})}${time.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2})}z`;

                return timeString;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .article {
        display: flex;
        flex-direction: row;
        gap: .5rem;
    }

    .news-learn-more {
        margin-left: auto;
    }

    .news-time {
        color: grey
    }
    ul.news-list {
        list-style: none;
        font-family: 'Arimo', sans-serif;
        padding: 0;
    }

    li:not(:last-child) { 
        margin-bottom: .5rem;  
    }

    h1 {
        align-self: center;
    }

    h2 {
        margin: .5rem 0 0 0;
    }

    li.subtitle {
        font-size: .85rem;
        color: gray;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
</style>