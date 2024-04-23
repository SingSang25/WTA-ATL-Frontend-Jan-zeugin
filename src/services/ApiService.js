import axios from 'axios';


export default {
    async getAPIData(path) {
        try {
            const response = await axios.get(path);
            const data = response.data;
            return data;
        } catch (error) {
            console.error('API request failed', error);
        }
    },

    async postAPIData(path, data) {
        try {
            const response = await axios.post(path, data);
            const responseData = response.data;
            return responseData;
        } catch (error) {
            console.error('API request failed', error);
        }
    },


    async putAPIData(path, data) {
        try {
            const response = await axios.put(path, data);
            const responseData = response.data;
            return responseData;
        } catch (error) {
            console.error('API request failed', error);
        }
    },

    async deleteAPIData(path) {
        try {
            const response = await axios.delete(path);
            const responseData = response.data;
            return responseData;
        } catch (error) {
            console.error('API request failed', error);
        }
    },
}