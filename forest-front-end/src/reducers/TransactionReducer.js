import {CHANGE_TRANSACTION} from "../constants";

const initState = ''

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_TRANSACTION: {
            if (action.transaction)
                return action.transaction
        }
        default:
            return state
    }
};