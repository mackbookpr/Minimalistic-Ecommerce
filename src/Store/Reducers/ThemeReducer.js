const initialState = { isDarkMode: false };

const themeReducer = (state = initialState, action) => {
  console.log('Reducer:', action.type, state);
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
    return { ...state, isDarkMode: !state.isDarkMode };
    default:
      return state;
  }
};

export default themeReducer;
