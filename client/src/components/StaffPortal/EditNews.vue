<template>
    <form class="news-form" @submit.prevent>
        <h1 v-if="id">Edit Article</h1>
        <h1 v-else>New Article</h1>

        <div v-if="id">
            <label class="">ID</label>
            <div class="input">
                <input type="text" v-model="id" name="_id" disabled class="input-field">
            </div>
        </div>

        <div class="input">
            <input type="text" class="input-field" name="name" v-model="name" required />
            <label class="input-label">Article Name</label>
        </div>

        <div class="input">
            <textarea class="input-field" name="text" required v-model="text" />
            <label class="input-label">Text</label>
        </div>

        <div class="input">
            <input type="datetime-local" name="date" v-model="date" readonly>
            <label class="input-label">Time</label>
        </div>

        {{notice}}

        <br><span class="disclamer">Check for errors before saving.</span>

        <div class="cta-row">
            <button class="cta" @click="saveArticle()">Save Article</button>
        </div>
        <div v-if="!id">
            <span>Note: Clicking the button will save the article, clicking it again will create a duplicate</span>
        </div>
    </form>

</template>

<script>
import { ref } from "vue";
import router from "../../router";
import axios from 'axios'

export default {
    data() {
        return {
            now: new Date(Date.now()).toISOString().substring(0, 16),
            notice: ''
            // name: '',
            // description: '',
            // start: '',
            // end: '',
            // image: '',
        }
    },
    setup: async () => {
        let id = ref('');
        let name = ref('');
        let text = ref('');
        let date = ref(`${new Date(Date.now()).toISOString().substring(0, 16)}`);

        id.value = router.currentRoute.value.query._id

        if (id.value) {

            let article = await axios.get(`/api/news/${id.value}`);

            if (!article) return;

            name.value = article.data.name;
            text.value = article.data.description;

            let date = new Date(article.data.date);

            date.value = date.toISOString().substring(0, 16);
        }

        return {
            id,
            name,
            text,
            date
        }
    },
    methods: {
        saveArticle() {

            if (this.name == '' || this.description == '' || this.start == '' || this.end == '' || this.image == '') return;

            let data = new FormData();
            data.append('name', `${this.name}`);
            data.append('text', this.text);
            data.append('date', this.date);

            if (this.id) { // If the event already exists or is new
                data.append('_id', this.id);
            }

            axios.post(`/api/editnews`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(() => {
                this.notice = 'Article saved!';
            })
        }
    }
}


</script>

<style lang="scss" scoped>
.disclamer {
    margin: 1rem 0 0 0;
    padding: 0;
    text-align: center;
}

h1 {
    margin: 0 0 0 0;
    text-align: center;
}

textarea {
    resize: vertical;
    min-height: 1.3rem;
}

input {
    appearance: none;
    border-radius: 0;
}

.event-form {
    padding: 2rem 1rem 0;
}

.input {
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    padding-top: 1.5rem;

    &+.input {
        margin-top: 1.5rem;
    }
}

.input-label {
    color: #8597a3;
    position: absolute;
    top: 1.5rem;
    transition: .25s ease;
}

.input-field {
    border: 0;
    z-index: 1;
    background-color: transparent;
    border-bottom: 2px solid #eee;
    font: inherit;
    font-size: 1.125rem;
    padding: .25rem 0;

    &:focus,
    &:valid {
        outline: 0;
        border-bottom-color: #000000;

        &+.input-label {
            color: #000000;
            transform: translateY(-1.5rem);
        }
    }
}

.cta-row {
    margin-top: .5rem;
    margin-bottom: 1rem;
    justify-content: center;
}

.cta {
    border: 0;
    font-size: 1rem;
}
</style>