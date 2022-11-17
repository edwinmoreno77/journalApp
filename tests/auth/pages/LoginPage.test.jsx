import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSingIn = jest.fn();
const mockStartLoginWithEmailAndPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSingIn: () => mockStartGoogleSingIn,
    startLoginWithEmailAndPassword: ({ email, password }) => {
       return ()=> mockStartLoginWithEmailAndPassword({ email, password })
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => {
        return (fn) => fn()
    },
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});
describe('<LoginPage/> test', () => {

    beforeEach(() => jest.clearAllMocks());

    test('should render LoginPage correctly', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getAllByText('Iniciar Sesion').length).toBeGreaterThanOrEqual(1);
    });

    test('The google botton should call the startGoogleSingIn', () => {
        
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleButton = screen.getByTestId('google-button');
        fireEvent.click(googleButton);

        expect(mockStartGoogleSingIn).toHaveBeenCalled();

    });

    test('submit should call the startLoginWithEmailAndPassword', () => {

        const email = 'edwinmroeno@yahoo.com';
        const password ='123456';
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        // screen.debug();
        
        const emailField = screen.getByRole('textbox', {name:'Correo'});
        const passwordField = screen.getByTestId('input-password');

        fireEvent.change(emailField, { target: { name:'email', value: email } });
        fireEvent.change(passwordField, { target: { name:'password', value: password } });

        const loginBtn = screen.getByTestId('loginBtn');
        fireEvent.click(loginBtn);
        
        expect(mockStartLoginWithEmailAndPassword).toHaveBeenCalled();
        expect(mockStartLoginWithEmailAndPassword).toHaveBeenCalledWith({ email, password });
    });
});


