import axios from "axios";
import getCookie from "./getCookie";

const getUser = async (cid = "") => {
  if (cid) {
    const userData = await axios.get(`${import.meta.env.VITE_API_ROUTE}/api/user/${cid}`);

    return userData.data;
  } else {
    let user = { loggedIn: false };

    if (!getCookie("jwt")) {
      return user;
    }

    const userData = await axios.get(`${process.env.API_ROUTE}/api/user/${getCookie("jwt")}`);

    user = {
      loggedIn: true,
      ...userData.data,
    };

    return user;
  }
};

export default getUser;
