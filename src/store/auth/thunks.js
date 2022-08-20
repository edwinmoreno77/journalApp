import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
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
    }
}


export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailAndPassword({ email, password, displayName });

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, photoURL, email, displayName }));
    }
}

export const startLoginWithEmailAndPassword = ({ email, password }) => {

    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage, displayName } = await loginWithEmailAndPassword({ email, password });

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, photoURL, email, displayName }));
    }

}

export const startLogout = () => {
    return async (dispatch) => {

        await logoutFirebase();

        dispatch(clearNotesLogout());

        dispatch(logout());
    }
}


