import React from 'react';

import { useGetInformation } from "./useGetInformation"

const App = () => {
  const [
    { result, isSuccessful, isFetching, errorMessage },
    getInfoForId
  ] = useGetInformation();

  const onButton1Clicked = () => {
    getInfoForId(1);
  };

  const onButton2Clicked = () => {
    getInfoForId(2);
  };

  const onButton3Clicked = () => {
    // User with ID 100 is not present
    getInfoForId(100);
  };

  return (
    <div className="App">
      {isSuccessful && !isFetching && result && (
        <h2>First Name: {result.first_name}</h2>
      )}
      {!isSuccessful && !isFetching && errorMessage.length > 0 && (
        <h2>Error: {errorMessage}</h2>
      )}
      {isFetching && <h3>Please Wait</h3>}

      <button onClick={onButton1Clicked} disabled={isFetching}>
        Get User 1 Info
      </button>
      <button onClick={onButton2Clicked} disabled={isFetching}>
        Get User 2 Info
      </button>
      <button onClick={onButton3Clicked} disabled={isFetching}>
        Get Invalid User Info
      </button>
    </div>
  );
};

export default App;
