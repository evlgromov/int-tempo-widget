import authHeader from './auth.header';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/widget';

class UserService {
    getMessages(dialogueUuid) {
        return axios.get(`${API_URL}/dialogue/${dialogueUuid}`);
    }

    sendMessage(data) {
        return axios.post(`${API_URL}/message/`, data );
    }

    getDialogueData(data) {
        return axios.post(`${API_URL}/dialogue/`, data );
    }
}

export default new UserService();