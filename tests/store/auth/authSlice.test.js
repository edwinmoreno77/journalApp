import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";


describe('it should return the initial state and be called "auth"', () => {
    test('authSlice test', () => {
        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');
    });

    test('must authenticated ', () => {
        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
    });
    //whitout payload
    test('this should do the logout', () => {
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        });
    });
    //with payload
    test('this should do the logout', () => {
        const state = authSlice.reducer(authenticatedState, logout({ errorMessage: 'Error message' }));
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'Error message',
        });
    });
    //with payload (other way to do it)
    test('this should do the logout', () => {
        const state = authSlice.reducer(authenticatedState, logout(notAuthenticatedState));
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: notAuthenticatedState.uid,
            email: notAuthenticatedState.email,
            displayName: notAuthenticatedState.displayName,
            photoURL: notAuthenticatedState.photoURL,
            errorMessage: notAuthenticatedState.errorMessage,
        });
    });

    test('it should change the status to checking', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        expect(state.status).toEqual('checking');

    });

});