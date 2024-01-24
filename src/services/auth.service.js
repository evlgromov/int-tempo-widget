import axios from 'axios';

const API_URL = 'http://localhost:8000/api/widget/';

class AuthService {
    login(user) {
        return axios.post(API_URL + 'login', {
            username: user.username,
            chatbot_uuid: user.chatbot_uuid
        });
    }
}

export default new AuthService();