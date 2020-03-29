import React from "react";
import { Info, HookState } from "./interfaces"
  
type HookAction =
    | { type: "fetching" }
    | { type: "success"; payload: Info }
    | { type: "error" };

const hookInitialState: HookState = {
    isFetching: false,
    isSuccessful: false,
    errorMessage: "",
    result: null
  };
  
  const hookReducer = (state: HookState, action: HookAction): HookState => {
    switch (action.type) {
      case "fetching":
        return {
          ...state,
          isFetching: true,
          isSuccessful: false,
          errorMessage: "",
          result: null
        };
  
      case "success":
        return {
          ...state,
          isFetching: false,
          isSuccessful: true,
          result: { ...action.payload }
        };
  
      case "error":
        return {
          ...state,
          isFetching: false,
          isSuccessful: false,
          errorMessage: "User not found"
        };
    }
  };
  
  export const useGetInformation = (): [HookState, (id: number) => void] => {
    const [fetchState, dispatch] = React.useReducer(
      hookReducer,
      hookInitialState
    );
  
    const fetchInfo = (id: number) => {
      fetch(`https://reqres.in/api/users/${id}?delay=2`)
        .then(response =>
          response.status === 200
            ? Promise.resolve(response.json())
            : Promise.reject(response.status)
        )
        .then(data => {
          dispatch({
            type: "success",
            payload: { ...data.data }
          });
        })
        .catch(() => {
          dispatch({ type: "error" });
        });
    };
  
    const getInfoForId = (id: number) => {
      dispatch({ type: "fetching" });
      fetchInfo(id);
    };
  
    return [fetchState, getInfoForId];
  };