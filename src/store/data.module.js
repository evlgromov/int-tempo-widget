import UserService from '../services/user.service';

const chatbotId = JSON.parse(localStorage.getItem('chatbotId'));

export const data = {
    namespaced: true,
    state: {
        chatbotId,
        messages: []
    },
    actions: {
        getMessages({ commit }, dialogueId) {
            return UserService.getMessages(dialogueId).then(
                response => {
                    commit('getMessagesSuccess', response.data.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        sendMessage({ commit }, data) {
            return UserService.sendMessage(data).then(
                response => {
                    commit('sendMessageSuccess', response.data.data.message);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('sendMessageFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        getMessagesSuccess(state, messages) {
            state.messages = messages;
        },
        sendMessageSuccess(state, message) {
            state.messages.push(message);
        }
    }
};
