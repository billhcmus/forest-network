import {CHANGE_PAYMENT_LIST} from "../constants";

const initState =[];

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_PAYMENT_LIST: {
            let newState = [];
            if (action.payments) {
                action.payments.forEach((payment) => {
                    if (payment) {
                        newState = [...newState, payment]
                    }
                });
            }
            return newState;
        }
        default:
            return state
    }
};