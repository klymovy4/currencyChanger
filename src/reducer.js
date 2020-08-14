export default function (state, action) {
    switch (action.type){
        case 'ADD':
            return [
                ...state,
                {
                    id: Date.now(),
                    name: action.payload,
                    completed: false
                }
            ]
        case 'TOGGLE':
            return state.map(el=>{
                if(el.id === action.payload){
                    el.completed = !el.completed
                }
                return el
            })
        case 'REMOVE':
            return state.filter(el=>{
                return el.id !== action.payload
            })
        default:
            return state
    }
}