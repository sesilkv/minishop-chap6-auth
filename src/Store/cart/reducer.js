/* cart = [
    {
        id: 1,
        title: 'Product',
        price: 5000,
        count: 1
    }
]
*/

const reducer = (state = [], action) => {
    switch (action.type){
        case 'addCartItem':
            {
                const newState = [...state]
                const itemIndex = newState.findIndex(item => item.id === action.payload.id)
                if (itemIndex < 0){
                    newState.push({
                        id: action.payload.id,
                        title: action.payload.title,
                        price: action.payload.price,
                        count: 1
                    })
                } else {
                    newState[itemIndex].count += 1
                }
                console.log(newState)
                return newState
            }
        case 'lessCartItem':
            {
                const newState = [...state]
                const itemIndex = newState.findIndex(item => item.id === action.payload.id)
                if (newState[itemIndex].count <= 1){
                    newState.splice(itemIndex, 1)
                } else {
                    newState[itemIndex].count -= 1
                }
                console.log(newState)
                return newState
            }
        case 'removeCartItem':
            {
                const newState = [...state]
                newState.splice(action.payload.index, 1)
                return newState
            }
        default:
            return state
    }
}

export default reducer