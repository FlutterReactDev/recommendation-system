import { db } from "@fb";
import { LOGIN_URL } from "@router/router";
import { getAuth, getIdToken, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function getUserInfo() {
  const auth = getAuth();

  const [user, setUser] = useState<User | null>();
  const navigate = useNavigate();

  const logout = async () => {
    await auth.signOut();
    localStorage.removeItem("RS_TOKEN");
    navigate(LOGIN_URL);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return {
    user,
    logout,
  };
}

export default getUserInfo;
