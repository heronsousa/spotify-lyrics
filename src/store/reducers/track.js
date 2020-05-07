const INITIAL_STATE = {
    data: {
        artist: [], 
        playButton: 'play-arrow', 
        name: '', 
        image: '',
        duration: 0,
        progress: 0
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