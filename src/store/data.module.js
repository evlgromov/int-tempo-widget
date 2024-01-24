import UserService from '../services/user.service';

const chatbotId = localStorage.getItem('chatbotId');

export const data = {
    namespaced: true,
    state: {
        chatbotId,
        dialogueId: null,
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
        },
        getDialogueData({ commit }, data) {
            return UserService.getDialogueData(data).then(
                response => {
                    commit('storeDialogueDataSuccess', response.data.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('storeDialogueDataFailure');
                    return Promise.reject(error);
                }
            );
        },
        storeMessage({ commit }, data) {
            if (data.data.message.dialogue_id == data.dialogueId) {
                commit('storeMessageSuccess', data.data.message);
            }
        },
    },
    mutations: {
        getMessagesSuccess(state, messages) {
            state.messages = messages;
        },
        sendMessageSuccess(state, message) {
            state.messages.push(message);
        },
        storeMessageSuccess(state, message) {
            const messageExists = state.messages.some(el => el.integration_message_id === message.integration_message_id)
            if (!messageExists && message.direction === 'out') {
                state.messages.push(message);
            }
        },
        storeDialogueDataSuccess(state, data) {
            state.chatbotId = data.chatbot_id;
            state.dialogueId = data.dialogue_id;
        }
    }
};
