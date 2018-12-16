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
                await API.post(
                    'notar', '/keys', {
                        body: {
                            firstName: userStore.user.attributes['custom:firstName'],
                            lastName: userStore.user.attributes['custom:lastName'],
                            birthdayTimestamp: userStore.user.attributes['custom:birthdayTimestamp'],
                            pin: pin
                        }
                    }
                );
                keysStore.updateKeys();
            } catch (error) {
                console.log(error);
            }
        },
        async updateKeys() {
            try {
                keysStore.isLoading = true;
                keysStore.keys = await API.get(
                    'notar', '/keys', {}
                );
                keysStore.keys = keysStore.keys.sort(
                    (a, b) => {
                        if (a.created < b.created) return 1;
                        if (a.created > b.created) return -1;
                        if (a.created === b.created) return 0;
                        return 0;
                    }
                );

            } finally {
                keysStore.isLoading = false;
            }
        },
    }
);

export default keysStore;