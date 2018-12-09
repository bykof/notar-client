import {store} from 'react-easy-state';

import {API} from 'aws-amplify';



const contractStore = store(
    {
        contracts: [],
        isLoading: false,
    }
);

export default contractStore;