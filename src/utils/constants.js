// export const BASE_URL = "http://localhost:8080/";
export const BASE_URL = "https://ecomm-backend-pied.vercel.app/";

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
};
