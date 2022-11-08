import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailAndPassword, startGoogleSingIn, startLoginWithEmailAndPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('auth thunks test', () => {

    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('must invoke the checkingCredentials()', async () => {
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('startGoogleSignIn must call checkingCredentials and login -Exito', async () => {

        const loginData = {
            ok: true,
            ...demoUser
        };
        await signInWithGoogle.mockResolvedValue(loginData);
        //thunks
        await startGoogleSingIn()(dispatch);
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });

    test('startGoogleSignIn must call checkingCredentials and logout -error', async () => {

        const loginData = {
            ok: false,
            errorMessage: 'Error message in google sing in',
        };
        await signInWithGoogle.mockResolvedValue(loginData);
        //thunks
        await startGoogleSingIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));

    });

    test('startCreatingUserWithEmailAndPassword must call checkingCredentials and login - Exito', async () => {

        const loginData = { ok: true, ...demoUser };
        const fromData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

        const { uid, photoURL, email, displayName } = loginData;
        //thunks
        await registerUserWithEmailAndPassword.mockResolvedValue(loginData);
        await startCreatingUserWithEmailAndPassword(fromData)(dispatch);

        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({ uid, photoURL, email, displayName }));
    });

    test('startCreatingUserWithEmailAndPassword must call checkingCredentials and logout - Error', async () => {

        const loginData = { ok: false, ...demoUser };
        const fromData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

        const { errorMessage } = loginData;
        //thunks
        await registerUserWithEmailAndPassword.mockResolvedValue(loginData);
        await startCreatingUserWithEmailAndPassword(fromData)(dispatch);

        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage }));
    });

    test('startLoginWithEmailAndPassword must call checkingCredentials and login - Exito', async () => {

        const loginData = { ok: true, ...demoUser };
        const fromData = { email: demoUser.email, password: '123456' };

        const { uid, photoURL, email, displayName } = loginData;
        //thunks
        await loginWithEmailAndPassword.mockResolvedValue(loginData);
        await startLoginWithEmailAndPassword(fromData)(dispatch);

        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({ uid, photoURL, email, displayName }));
    });

    test('startLoginWithEmailAndPassword must call checkingCredentials and logout - Error', async () => {

        const loginData = { ok: false, ...demoUser };
        const fromData = { email: demoUser.email, password: '123456' };

        const { errorMessage } = loginData;
        //thunks
        await loginWithEmailAndPassword.mockResolvedValue(loginData);
        await startLoginWithEmailAndPassword(fromData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage }));
    });

    test('startLogout test', async () => {

        await startLogout()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(logout());
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(logoutFirebase).toHaveBeenCalled();

    });

});