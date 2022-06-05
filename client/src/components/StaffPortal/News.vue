<template>
    <div>
        <div>
            <router-link :to="{ query: { page: 'news-edit' } }" class="cta" style="color: white">New Article
            </router-link>
        </div>
        <ul class="news-list">
            <div v-if="news.length == 0">
                <li>No Articles Posted</li>
            </div>
            <div v-else>
                <li v-for="article in news" :key="article">
                    <div class="news">
                        <span class="news-name">{{ article.name }}</span>
                        <span class="news-time">{{ getNewsTime(article) }}</span>
                        <span class="news-edit">
                            <router-link :to="{ query: { page: 'news-edit', _id: article._id } }"><i
                                    class="fa-solid fa-pen-to-square"></i></router-link>
                            <router-link :to="{ query: { page: 'news-delete', _id: article._id } }"><i
                                    class="fa-solid fa-trash-can"></i></router-link>
                        </span>
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
        getNewsTime: (article) => {
            const time = new Date(article.date);

            // Format the time/date in DD/MM HHMMz format
            const timeString = `${time.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 })}/${(time.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 })} ${time.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 })}${time.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 })}z`;

            return timeString;
        }
    },
    computed: {
        subpage() {
            console.log(router.currentRoute.value.query.subage)
            return router.currentRoute.value.query.subage;
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

.news-edit {
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