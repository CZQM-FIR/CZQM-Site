<template>	
    <form class="event-form" @submit.prevent>
		<h1 v-if="_id">Edit Event</h1>
		<h1 v-else >New Event</h1>
		
		<div v-if="_id">
			<label class="">ID</label>
			<div class="input">
				<input type="text" v-model="_id" name="_id" disabled class="input-field">
			</div>
		</div>

		<div class="input">
			<input type="text" class="input-field" name="name" v-model="name" required/>
			<label class="input-label">Event Name</label>
		</div>

		<div class="input">
			<textarea class="input-field" name="description" required v-model="description"/>
			<label class="input-label">Description</label>
		</div>

		<div class="input">
			<input type="datetime-local" class="input-field" name="start" v-model="start" :min="now" required>
			<label class="input-label">Start Time</label>
		</div>

		<div class="input">
			<input type="datetime-local" class="input-field" name="end" v-model="end" :min="start" required>
			<label class="input-label">End Time</label>
		</div>

		<div class="input">
			<input type="file" class="input-field" required name="image" @change="updateImage">
		</div>
		
		<br><span class="disclamer">Check for errors before saving.</span>

		<div class="cta-row">
			<button class="cta" @click="saveEvent()">Save Event</button>
		</div>
	</form>

</template>

<script>

	import router from "../../router";
	import axios from 'axios'

    export default {
		computed: {
            _id() {
                return router.currentRoute.value.query._id;
            }
        },
        data() {
            return {
				now: new Date(Date.now()).toISOString().substring(0, 16),
                name: '',
				description: '',
				start: '',
				end: '',
				image: undefined,
            }
        },
        methods: {
            saveEvent() {
				
				if (this.name == '' || this.description == '' || this.start == '' || this.end == '' || !this.image) return;

                console.log('saving event');

				let data = new FormData();
				data.append('name', `${this.name}`);
				data.append('description', this.description);
				data.append('start', this.start);
				data.append('end', this.end);
				data.append('image', this.image, this.image.name);

				if (this._id) { // If the event already exists or is new
					data.append('_id', this._id);
				} 

				axios.post(`/api/editevent`, data, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})

				console.log('event saved')
            },
			updateImage(e) {
				let files = e.target.files;
				if (!files.length) return;
				let file = files[0];

				this.image = file
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
	&:focus, &:valid {
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