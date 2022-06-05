import axios from 'axios'

/**
    * @description: Gets news articles from the database
    * @param {string} newsID: The ID of the article to get, if blank, gets all events
    * @returns {object} eventData
*/
const getNews = async (newsID = '') => {

    let newsData = await axios.get(`/api/news/${newsID}`).catch((error) => {
        console.error(error)
    });

    newsData = newsData ? newsData.data : [];

    if (typeof newsData == 'object') {
        return newsData
    } else {
        const sortedNewsData = newsData.sort((a, b) => {
            return b.date - a.date
        })
        return sortedNewsData
    }
}

export default getNews