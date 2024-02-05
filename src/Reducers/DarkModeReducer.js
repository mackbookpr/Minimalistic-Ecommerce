const initialState = { isDarkMode: false };

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOOGLE_LIGHT_MODE':
      console.log("Madhav");
      return { ...state, isDarkMode: false };
    case 'TOGGLE_DARK_MODE':
      console.log("Madhav");
      return { ...state, isDarkMode: true };
    default:
      return state;
  }
};

export default themeReducer;