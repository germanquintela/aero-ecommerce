const initialProps = {
    search: ''
}

export default function(state = initialProps, action) {
    switch (action.type){
        case 'SET_SEARCH_VALUE':
            return {
                ...state,
                search: action.payload
            };
        default: 
            return state
    }
}