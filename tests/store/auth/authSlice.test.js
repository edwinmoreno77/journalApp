import { authSlice } from "../../../src/store/auth/authSlice";
import { initialState } from "../../fixtures/authFixtures";



describe('it should return the initial state and be called "auth"', () => {
    test('authSlice test', () => {
        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');
    });

});