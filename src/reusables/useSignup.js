import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);
const signup = async (email, password, displayName) => {
  try {
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    if (!res) {
      throw Error("Could not complete the signup");
    }
    await res.user.updateProfile({ displayName });
    error.value = null;

    console.log(res);

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};

const useSighUp = () => {
  return { error, signup };
};

export default useSighUp;
