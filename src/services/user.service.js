import authHeader from './auth.header';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/widget';

class UserService {
    getMessages(id) {
        return axios.get(`${API_URL}/dialogue/${id}`);
    }

    sendMessage(data) {
        return axios.post(`${API_URL}/message/`, data );
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();