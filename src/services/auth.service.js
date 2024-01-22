import axios from 'axios';

const API_URL = 'http://localhost:8000/api/widget/';

class AuthService {
    login(user) {
        return axios.post(API_URL + 'login', {
            username: user.username,
            email: user.email,
            chatbotId: user.chatbotId
        });
    }
}

export default new AuthService();