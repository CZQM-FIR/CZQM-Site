import axios from 'axios'

/**
    * @description: Gets events from the database
    * @param {string} eventID: The ID of the event to get, if blank, gets all events
    * @returns {object} eventData
*/
const getEvent = async (eventID = '') => {

    let eventData = await axios.get(`/api/event/${eventID}`).catch((err) => {});

    eventData = eventData ? eventData.data : [];

    return eventData
}

export default getEvent