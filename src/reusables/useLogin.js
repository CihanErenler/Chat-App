import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);
const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
    error.value = null;

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = "Incorrect credentials";
  }
};

const useLogin = () => {
  return { error, login };
};

export default useLogin;
