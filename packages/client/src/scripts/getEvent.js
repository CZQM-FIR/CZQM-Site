import axios from "axios";

/**
 * @description: Gets events from the database
 * @param {string} eventID: The ID of the event to get, if blank, gets all events
 * @returns {object} eventData
 */
const getEvent = async (includeOld = false, eventID = "") => {
  let eventData = await axios
    .get(`/api/event/${eventID}${includeOld ? "?old=true" : ""}`)
    .catch((error) => {
      console.error(`[ERROR] ${error}`);
    });

  eventData = eventData ? eventData.data : [];

  return eventData;
};

export default getEvent;
