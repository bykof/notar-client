import {store} from 'react-easy-state';

import {API} from 'aws-amplify';

import userStore from './userStore';


const keysStore = store(
    {
        keys: [],
        isLoading: false,
        get hasKeys() {
            return keysStore.keys.length > 0;
        },
        async createKey(pin) {
            try {
                let key = await API.post(
                    'notar', '/keys', {
                        body: {
                            firstName: userStore.user.attributes['custom:firstName'],
                            lastName: userStore.user.attributes['custom:lastName'],
                            birthday: userStore.user.attributes['custom:birthdayTimestamp'],
                            pin: pin
                        }
                    }
                );
                keysStore.keys.push(key);
            } catch (error) {
                console.log(error);
            }

        },
        async updateKeys() {
            try {
                keysStore.isLoading = true;
                keysStore.keys = await API.get('notar', '/keys', {});
                console.log(keysStore.keys);
            } finally {
                keysStore.isLoading = false;
            }
        },
    }
);

export default keysStore;