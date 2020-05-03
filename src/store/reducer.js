const INITIAL_STATE = {
    data: {}
}

export default function track(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'GET_CURRENT_TRACK':
            console.log(action.data)
            return { data: action.data }
        
        default:
            return state;
    }
}