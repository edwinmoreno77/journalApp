import { signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";



export const checkingAuthentication = (email, password) => {

    return async (dispatch) => {

        console.log({ email, password });
        dispatch(checkingCredentials());


    }
}


export const startGoogleSingIn = () => {
    return async (dispatch) => {


        dispatch(checkingCredentials());

        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));

        console.log({ result });
        // const provider = new firebase.auth.GoogleAuthProvider();
        // await firebase.auth().signInWithPopup(provider);
    }
}

 // const response = await fetch('http://localhost:3000/api/v1/auth/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         email,
            //         password
            //     })
            // });
            // const { token } = await response.json();
            // localStorage.setItem('token', token);
            // dispatch(setAuthenticated(true));
