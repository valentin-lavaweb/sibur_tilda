import axios from "axios";
import useStore from "@/stores/interface-interaction.js";
const store = useStore();

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_API_URL,
  withCredentials: true, // required to handle the CSRF token
});

/*
 * Add a response interceptor
 */
authClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      error.response &&
      [401, 419].includes(error.response.status) &&
      Boolean(store.admin)
    ) {
      store.logout();
    }
    return Promise.reject(error);
  }
);

export default {
  async login({email, password}) {
    await authClient.get("/sanctum/csrf-cookie");
    return authClient.post("/login", {email, password});
  },
  logout() {
    return authClient.post("/logout");
  },
  getAuthUser() {
    return authClient.get("/api/admin/auth");
  },

  // updatePassword(payload) {
  //   return authClient.put("/user/password", payload);
  // },
};