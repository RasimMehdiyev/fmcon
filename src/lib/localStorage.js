function getToken() {
  if (typeof window === "undefined")
    { 
        console.log("Type of window inside the if clause", typeof window);
        return null;
    }
  console.log("Type of window", typeof window);
  return localStorage.getItem("newApiToken");
}

function setToken(token) {
  if (typeof window === "undefined") 
  {
    console.log("Type of window inside the if clause", typeof window);
    return;
  }
  localStorage.setItem("newApiToken", token);
}

function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("newApiToken");
}
export { getToken, setToken, clearToken };