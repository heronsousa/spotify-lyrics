const INITIAL_STATE = {
    data: {
        artist: [], 
        playButton: 'play-arrow', 
        name: '', 
        image: ''
    }
}

export default function track(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'GET_CURRENT_TRACK':
            return { data: action.data }
        
        default:
            return state;
    }
}