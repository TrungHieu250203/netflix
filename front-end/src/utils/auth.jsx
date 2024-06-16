import Cookies from "js-cookie";

export const isTokenPresent = () => !!Cookies.get("token");
export const isAdminTokenPresent = () => !!Cookies.get("adminToken");