function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload };
    case 'GET_TRANSACTIONS':
      return { ...state, transactions: action.payload, loading: false };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          String(t.id) === String(action.payload.id)
            ? { ...action.payload.data, id: action.payload.id }
            : t
        )
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload)
      };
    case 'TRANSACTION_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export default appReducer;
