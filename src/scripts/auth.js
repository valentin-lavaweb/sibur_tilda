import axios from "axios";

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_API_URL,
  withCredentials: true, // required to handle the CSRF token
  headers:{
    Accept: 'application/json'
  }
});



export default {
  async login({email, password}) {
    await authClient.get("/sanctum/csrf-cookie");
    return authClient.post("/login", {email, password});
  },
  logout() {
    // await authClient.get("/sanctum/csrf-cookie");
    return authClient.post("/logout");
  },
  getAuthAdmin() {
    // await authClient.get("/sanctum/csrf-cookie");
    return authClient.get("/api/admin/auth");
  },

  // updatePassword(payload) {
  //   return authClient.put("/user/password", payload);
  // },
};