import {useState , useEffect} from "react";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { MAIN_URL } from "../../Config/Url";
import axios from "axios";
import Swal from "sweetalert2";
const GoogleAuth =()=>{
  const navigate = useNavigate()
  const [google, setGoogle] = useState("");
  const checkUserExisting = async (userDetail) => {
    // console.log("id_tojken" , userDetail)
    const URL = ` ${MAIN_URL}posts/googleauth`; 
    const response = await axios.post(URL, userDetail, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("responsecode" ,response)
    if (response.status == 200) {
      Swal.fire({
        icon: "success",
        text: response.statusText,
        timer: 2000,
      });
      localStorage.setItem("isLogged", true);
      localStorage.setItem("_token", response.data.token);
      navigate('/dashboard')
    console.log("responseresponse",response)
  };
}
 
const firebaseConfig = {
  apiKey: "AIzaSyCgXZBSL9QS2vwPtDfff183xyNHd-8Pz2A",
  authDomain: "fblogin-c326f.firebaseapp.com",
  projectId: "fblogin-c326f",
  storageBucket: "fblogin-c326f.appspot.com",
  messagingSenderId: "160719322271",
  appId: "1:160719322271:web:3c2abddc85b6ce638376aa",
  measurementId: "G-5HE5YJG00Z"
};
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const fbprovider = new FacebookAuthProvider();

  const FacebookAuth = ()=>{
    signInWithPopup(auth ,fbprovider).then((fbresult)=>{
      console.log("facebookData" , fbresult)
    })
  }
  const GoogleAuthenti = () => {
    signInWithPopup(auth, provider).then((result) => {
     console.log("result" , result)
     setGoogle(result);
     const userData = {
       name: result.user.displayName,
       email: result.user.email,
       googleId: result.user.uid,
       userProfileImageUrl: result.user.photoURL,
     };
     checkUserExisting(userData);
    });
  };
  return(
    <div>
      <button onClick={GoogleAuthenti}>continue to google</button>
      <button onClick={FacebookAuth}>continue to facebook</button>

    </div>
  )
}
export default GoogleAuth