import AuthService from '../services/auth.service';

const dialogueUuid = localStorage.getItem('dialogue_uuid');

const initialState = dialogueUuid
    ? { status: { loggedIn: true }, dialogueUuid }
    : { status: { loggedIn: false }, dialogueUuid: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                response => {
                    commit('loginSuccess', response.data.data.dialogue_uuid);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        loginSuccess(state, dialogueUuid) {
            state.status.loggedIn = true;
            state.dialogueUuid = dialogueUuid;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.dialogueUuid = null;
        }
    }
};
