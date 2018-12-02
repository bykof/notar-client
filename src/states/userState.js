import {store} from 'react-easy-state';

import {Auth} from 'aws-amplify';


const userStore = store(
    {
        user: null,
        get isLoggedIn() {
            return userStore.user !== null;
        },
        async checkForToken() {
            Auth.currentUserInfo().then(
                (user) => {
                    userStore.user = user;
                    console.log('get current user info: ', user);
                }
            );
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