import { SESSION_ACTIONS } from "reducers/session";

export const setOrganisation = (id) => {
  return (dispatch) => {
    dispatch({ type: SESSION_ACTIONS.SET_ORGANISATION_INDEX, payload: id });
  };
};

export const setNewOrganisation = (boolean) => {
  return (dispatch) => {
    dispatch({ type: SESSION_ACTIONS.SET_NEW_ORGANISATION, payload: boolean });
  };
};
