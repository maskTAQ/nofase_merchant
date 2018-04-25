const NAVIGATE_GO = "NAVIGATE_GO";
const NAVIGATE_BACK = "NAVIGATE_BACK";
const NAVIGATE_TAb_GO = "NAVIGATE_TAb_GO";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const action = {
  navigate: {
    go({ routeName, params = {} }) {
      return {
        type: NAVIGATE_GO,
        payload: {
          routeName,
          params
        }
      };
    },
    tabGo({ routeName, params = {} }) {
      return {
        type: NAVIGATE_TAb_GO,
        payload: {
          routeName,
          params
        }
      };
    },
    back({ params = {} } = {}) {
      return {
        type: NAVIGATE_BACK,
        payload: {
          params
        }
      };
    }
  },
  login(data) {
    return {
      type: LOGIN,
      payload: data
    };
  },
  logout(payload) {
    return {
      type: LOGOUT,
      payload
    };
  },
  LOGOUT,
  NAVIGATE_GO,
  NAVIGATE_BACK,
  NAVIGATE_TAb_GO,
  LOGIN
};
export default action;
