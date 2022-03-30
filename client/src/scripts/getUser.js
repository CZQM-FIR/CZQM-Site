import axios from 'axios'
import getCookie from './getCookie'

const getUser = async () => {
    let user = { loggedIn: false };

    if (!getCookie('jwt')) {
        return user;
    }

    const userData = await axios.get(`/api/user/${getCookie('jwt')}`);

    user.personal = userData.data.personal;
    user.vatsim = userData.data.vatsim;
    user.cid = userData.data.cid;
    user.role = userData.data.role;
    user.loggedIn = true;

    return user;
}

export default getUser