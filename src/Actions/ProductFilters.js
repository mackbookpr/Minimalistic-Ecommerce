export const fetchData = () => async (dispatch) => {
  try {
    const response = await fetch('../Data/products.json'); // Adjust path accordingly
    const data = await response.json();
    dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_DATA_FAILURE', payload: error });
  }
};
