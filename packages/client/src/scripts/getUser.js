import axios from 'axios'
import getCookie from './getCookie'

const getUser = async () => {
    let user = { loggedIn: false };

    if (!getCookie('jwt')) {
        return user;
    }

    const userData = await axios.get(`/api/user/${getCookie('jwt')}`);

    user = {
        loggedIn: true,
        ...userData.data,
    }

    return user;
}

export default getUser