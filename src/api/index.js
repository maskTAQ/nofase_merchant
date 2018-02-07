import { post } from "./base";

export default {
  login({ username, password }) {
    return post("/login", { username, password });
  }
};
