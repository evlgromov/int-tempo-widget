import AuthService from '../services/auth.service';

const dialogue_id = JSON.parse(localStorage.getItem('dialogue_id'));

const initialState = dialogue_id
    ? { status: { loggedIn: true }, dialogue_id }
    : { status: { loggedIn: false }, dialogue_id: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                response => {
                    commit('loginSuccess', response.data.data.dialogue_id);
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
        loginSuccess(state, dialogue_id) {
            state.status.loggedIn = true;
            state.dialogue_id = dialogue_id;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.dialogue_id = null;
        }
    }
};
