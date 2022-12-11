<template>
    <div>
        <ul class="news-list">
            <div v-if="news.length == 0">
                <li>No Articles Posted</li>
            </div>
            <div v-else>
                <li v-for="article in news.slice(0, 5)" :key="article">
                    <div class="news">
                        <span class="news-name"><router-link :to="{ path: '/news', query: { _id: article._id}}">{{article.name}}</router-link></span>
                        <span class="news-time">{{getTime(article)}}</span>
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
            let news = ref((await getNews()).slice(0, 3));

            return {
                news
            };
        },
        methods: {
            getTime: (article) => {
                const time = new Date(article.date);
                const timeUTC = new Date(time.getTime() + time.getTimezoneOffset() * 60000)

                // Format the time/date in DD/MM HHMMz format
                const timeString = `${timeUTC.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, timeZone: 'UTC' })}/${(timeUTC.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, timeZone: 'UTC' })} ${timeUTC.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, timeZone: 'UTC' })}${timeUTC.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, timeZone: 'UTC' })}z`;

                return timeString;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .news {
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