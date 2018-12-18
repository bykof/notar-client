import {store} from 'react-easy-state';

import {API} from 'aws-amplify';
import userStore from "./userStore";



const contractStore = store(
    {
        contracts: [],
        isLoading: false,
        async createContract(pin, contractPDF, users) {
            try {
                await API.post(
                    'notar', '/contracts', {
                        body: {
                            firstName: userStore.user.attributes['custom:firstName'],
                            lastName: userStore.user.attributes['custom:lastName'],
                            birthdayTimestamp: userStore.user.attributes['custom:birthdayTimestamp'],
                            pin: pin,
                            contractPDF: contractPDF,
                            users: users
                        }
                    }
                );
            } catch (error) {
                console.log(error);
            }
        },
        async updateContracts() {
            try {
                contractStore.isLoading = true;
                contractStore.contracts = await API.get(
                    'notar', '/contracts', {}
                );
                contractStore.contracts = contractStore.contracts.sort(
                    (a, b) => {
                        if (a.created < b.created) return 1;
                        if (a.created > b.created) return -1;
                        if (a.created === b.created) return 0;
                        return 0;
                    }
                );

            } finally {
                contractStore.isLoading = false;
            }
        },
    }
);

export default contractStore;