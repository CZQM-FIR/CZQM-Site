import axios from 'axios'

const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return;
}

const getUser = async () => {
    let user = { loggedIn: false };

    if (!getCookie('jwt')) {
        return user;
    }

    const userData = await axios.get(`/api/user/${getCookie('jwt')}`);

    user.personal = userData.data.personal;
    user.vatsim = userData.data.vatsim;
    user.cid = userData.data.cid;
    user.loggedIn = true;

    return user;
}

export default getUser

export {
    getCookie,
    getUser,
}