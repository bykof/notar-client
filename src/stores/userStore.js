import {store} from 'react-easy-state';

import {Auth} from 'aws-amplify';


const userStore = store(
    {
        user: null,
        isLoading: true,
        get isLoggedIn() {
            return userStore.user !== null;
        },
        async refreshToken() {
            userStore.isLoading = true;
            try {
                userStore.user =  await Auth.currentUserInfo();
            } finally {
                userStore.isLoading = false;
            }
        },
        async login(email, password) {
            const user = await Auth.signIn(
                email,
                password,
            );
            userStore.user = user;
            return user;
        },
        async logout() {
            await Auth.signOut();
            userStore.user = null;
        }
    }
);

export default userStore;