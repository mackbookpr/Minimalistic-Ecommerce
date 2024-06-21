import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./Firebase";
import { FaGoogle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authContext";

function SignInwithGoogle() {
  const navigate = useNavigate();
  const { setUserID, setUserName, setUrl } = useAuth();


  let email = "", password = "", username = "";

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const tokenResponse = result._tokenResponse;

      email = tokenResponse.email;
      password = tokenResponse.idToken;
      username = tokenResponse.displayName;

      setUrl(result.photoURL);

      const isRegistered = await registerUser();
      if (isRegistered) {
        await validateUser();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const registerUser = async (tokenResponse) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/Register',
        {
          email,
          password,
          username
        },
        { withCredentials: true }
      );

      return response.status === 200;
    } catch (error) {
      console.error('Error during registration:', error);
      return false;
    }
  };

  const validateUser = async () => {
    try {
      const response = await axios.get('http://localhost:8080/valid', {
        withCredentials: true,
      });

      if (response.data.valid && response.data.id) {
        setUserID(response.data.id);
        setUserName(response.data.username);
        navigate("/");
      } else {
        setUserID(null);
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  const handleError = (error) => {
    if (error.code === 'auth/popup-closed-by-user') {
      console.error('Popup was closed by the user before completing the sign in.');
    } else {
      console.error('An error occurred during sign in:', error);
    }
  };

  return (
    <div className="bg-orange-200 rounded-md py-2 hover:bg-orange-500">
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <p className="flex items-center text-xl gap-2">
          Sign In With <FaGoogle />
        </p>
      </div>
    </div>
  );
}

export default SignInwithGoogle;