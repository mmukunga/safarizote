
const addToCart = (safari, state) => {
    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === safari.id
    );
  
    if (updatedItemIndex < 0) {
      updatedCart.push({ ...safari, quantity: 1 });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem.quantity++;
      updatedCart[updatedItemIndex] = updatedItem;
    }
    return { ...state, cart: updatedCart };
  };
  
  const removeFromCart = (safariId, state) => {
    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex(item => item.id === safariId);
  
    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedCart[updatedItemIndex] = updatedItem;
    }
    return { ...state, cart: updatedCart };
  };
  
  const initialState = {
    cart: [],
    hidden: true
  };
  
  export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return addToCart(action.safari, state);
      case 'REMOVE_FROM_CART':
        return removeFromCart(action.safariId, state);
      default:
        return state;
    }
  };
  