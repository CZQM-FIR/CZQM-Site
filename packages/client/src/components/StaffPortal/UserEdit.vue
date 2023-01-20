<template>
    <div v-if="error === 'invalid-id'">
        <h1>Error: No ID</h1>
        <p>This link is invalid, please return to the user management page.</p>
    </div>
    <div v-else-if="error === 'no-id'">
        <h1>Error: No ID</h1>
        <p>This link is invalid, please return to the user management page.</p>
    </div>
    <div v-else>
        <h1>Edit User</h1>

        <h2>User Info:</h2>
        <p>This is all of the users basic info. This must be edited through VATSIM.</p>
        <ul>
            <li>Name: {{ name }}</li>
            <li>CID: {{ cid }}</li>
            <li>Rating: {{ rating }}</li>
        </ul>

        <h2>User Flags:</h2>
        <p>This is a list of the users flags. These are used to customise how the user apears and their permissions. To toggle a flag, find it in the dropdown and select submit. Any contradictory flags will be dealt with. Many of these are dealt with automaticaly. Please only change ones that need changing<br><br>To remove a user, add the delete flag. Users will be removed at the top of every hour.</p>

        <ul>
            <li v-for="flag in flags" :key="flag">
                {{ flag }}
            </li>
        </ul>

        <div class="datalist">
            <input list="flags" name="flag" id="flag" v-model="flag">
            <datalist id="flags">
                <option v-for="flag in flagList" :key="flag">
                    {{ flag }}
                </option>
            </datalist>
            <button @click="submitFlag(flag, user, flagList)">Submit</button>
        </div>

    </div>
</template>

<script>
import { ref } from 'vue'
import router from '../../router';
import axios from 'axios';
import getUser from '../../scripts/getUser';

export default {
    setup: async () => {
        let cid = ref('')
        let name = ref('')
        let rating = ref('')
        let flag = ref('')
        let flags = ref([])
        let flagList = ref([
            'staff',
            'staff-instructing',
            'instructor',
            'mentor',
            'chief', ,
            'deputy',
            'chief-instructor',
            'web',
            'events',
            'sector',
            'roster-gnd-sup',
            'roster-twr-sup',
            'roster-app-sup',
            'roster-ctr-sup',
            'roster-twr-solo',
            'roster-app-solo',
            'roster-ctr-solo',
            'roster-gnd-cert',
            'roster-twr-cert',
            'roster-app-cert',
            'roster-ctr-cert',
            'fss',
            'controller',
            'visitor',
            'no-email',
            'inactive',
            'leave',
            'delete'
        ])

        cid.value = router.currentRoute.value.query._id;

        if (!cid.value) {
            return {
                cid,
                error: 'no-id'
            }
        }

        let user = await axios.get(`/api/user/`, {}, {
            withCredentials: true
        })
        user = user.data.users.filter(user => user.cid === cid.value)[0]

        if (!user) {
            return {
                cid,
                error: 'invalid-id'
            }
        }

        name.value = user.personal.name_full
        rating.value = user.vatsim.rating.short
        flags.value = user.flags

    const loggedInUser = await getUser()
    if (loggedInUser.flags.includes('admin')) flagList.value.push('admin')

        return {
            cid,
            name,
            rating,
            flag,
            flags,
            flagList,
            user,
            error: false
        }        
    },
    methods: {
        submitFlag: async (flag, user, flagList) => {
        if (!flag) return
            console.log(flagList)
            if (!flagList.includes(flag)) return
            await axios.get(`/api/edituser/`, {
                params: {
                    user,
                    flag
                }
            }, {
                withCredentials: true
            })
            window.location.reload()
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
  & + .input {
    margin-top: 1.5rem;
  }
}

.input-label {
  color: #8597a3;
  position: absolute;
  top: 1.5rem;
  transition: 0.25s ease;
}

.input-field {
  border: 0;
  z-index: 1;
  background-color: transparent;
  border-bottom: 2px solid #eee;
  font: inherit;
  font-size: 1.125rem;
  padding: 0.25rem 0;
  &:focus,
  &:valid {
    outline: 0;
    border-bottom-color: #000000;
    & + .input-label {
      color: #000000;
      transform: translateY(-1.5rem);
    }
  }
}

.cta-row {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.cta {
  border: 0;
  font-size: 1rem;
}
</style>