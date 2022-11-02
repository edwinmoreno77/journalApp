

export const initialState = {
    status: 'checking', // checking, authenticated, not-authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status: 'authenticated',
    uid: '123',
    email: 'demo@gmail.com',
    displayName: 'Demo',
    photoURL: 'https://www.google.com',
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: 'Error message',
}

export const demoUser = {
    uid: '123',
    email: 'demouser',
    displayName: 'Demo User',
    photoURL: 'https://www.google.com',

}