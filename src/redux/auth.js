import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    userAuthenticated: localStorage.getItem('userAuthenticated') === 'true' || false,
    adminAuthenticated: localStorage.getItem('adminAuthenticated') === 'true' || false
};


// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action to set user authentication status
        setUserAuthenticated(state, action) {
            state.userAuthenticated = action.payload;
            localStorage.setItem('userAuthenticated', 'true');
            localStorage.setItem('adminAuthenticated', 'false');

            if (action.payload) {
                state.adminAuthenticated = false; // Reset admin authentication if user authenticates
            }
        },
        // Action to set admin authentication status
        setAdminAuthenticated(state, action) {
            state.adminAuthenticated = action.payload;
            localStorage.setItem('userAuthenticated', 'false');
            localStorage.setItem('adminAuthenticated', 'true');

            if (action.payload) {
                state.userAuthenticated = false; // Reset user authentication if admin authenticates
            }
        }
    }
});

// Actions
export const { setUserAuthenticated, setAdminAuthenticated } = authSlice.actions;

// Reducer
export default authSlice.reducer;