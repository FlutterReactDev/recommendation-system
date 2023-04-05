import { UserEntity } from "@entities/UserEntity";
import { db } from "@fb";
import { LOGIN_URL } from "@router/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function getUserInfo() {
  const auth = getAuth();

  const [user, setUser] = useState<UserEntity | DocumentData>();
  const navigate = useNavigate();

  const logout = async () => {
    await auth.signOut();
    localStorage.removeItem("RS_TOKEN");
    navigate(LOGIN_URL);
  };
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.uid) {
        await getDoc(doc(db, "users", currentUser?.uid)).then((user) => {
          const userData = user.data();
          setUser(userData);
        });
      }
    });
  }, []);

  return {
    user,
    logout,
  };
}

export default getUserInfo;
