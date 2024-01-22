import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const dialogue_id = JSON.parse(localStorage.getItem('dialogue_id'));

const initialState = user && dialogue_id
    ? { status: { loggedIn: true }, user, dialogue_id }
    : { status: { loggedIn: false }, user: null, dialogue_id: null };

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
        // loginSuccess(state, user) {
        //     state.status.loggedIn = true;
        //     state.user = user;
        // },
        // loginFailure(state) {
        //     state.status.loggedIn = false;
        //     state.user = null;
        // },
        // logout(state) {
        //     state.status.loggedIn = false;
        //     state.user = null;
        // },
        loginSuccess(state, dialogue_id) {
            state.status.loggedIn = true;
            state.dialogue_id = dialogue_id;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
        }
    }
};
