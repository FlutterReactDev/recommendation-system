import { inject, singleton } from "tsyringe";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getIdToken,
  onAuthStateChanged,
} from "firebase/auth";
import { RegisterFormData } from "@pages/RegisterPage/RegisterPage";
import { LoginFormData } from "@pages/LoginPage/LoginPage";
import { db } from "@fb";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  DocumentData,
} from "firebase/firestore";
import { ResetFormData } from "@pages/ResetPage/ResetPage";

class AuthService {
  constructor() {}

  async register(data: RegisterFormData) {
    const { email, password, name, age, gender } = data;
    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, email, password).then(
      ({ user }) => {
        setDoc(doc(db, "users", user.uid), {
          name,
          gender,
          age,
          photoURL: null,
        });

        user
          .getIdToken()
          .then((token) => localStorage.setItem("RS_TOKEN", token));
      }
    );
  }

  async login(data: LoginFormData) {
    const auth = getAuth();
    const { email, password } = data;
    await signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      user.getIdToken().then((token) => {
        localStorage.setItem("RS_TOKEN", token);
      });
    });
  }

  async registerWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    await signInWithPopup(auth, provider).then(({ user }) => {
      const userData = {
        name: user.displayName,
        photoUrl: user.photoURL,
        gender: "",
        age: null,
      };

      setDoc(doc(db, "users", user.uid), userData);

      user.getIdToken().then((token) => {
        localStorage.setItem("RS_TOKEN", token);
      });
    });
  }

  async resetPassword(data: ResetFormData) {
    const auth = getAuth();
    const { email } = data;
    await sendPasswordResetEmail(auth, email).then(() => {
      console.log("Reset");
    });
  }

  addTags(tags: string[]) {
    const auth = getAuth();
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.uid) {
        await updateDoc(doc(db, "users", currentUser?.uid), {
          tags,
        });
      }
    });
  }
  async getUserTags() {
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    const userRef = doc(db, `users/${uid}`);
    const data: DocumentData | { tags: string[] } | undefined = (
      await getDoc(userRef)
    ).data();

    return data?.tags;
  }
}

export default AuthService;
