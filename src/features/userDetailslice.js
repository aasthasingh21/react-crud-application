import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";  // importing slice

// Operation using async thunk :-

// create action
export const createUser = createAsyncThunk("createuser", async (data, {rejectWithValue}) => { // createuser will be the name, data will be users data, reject = when error occours


    const Response = await fetch("https://652a47034791d884f1fcb8b1.mockapi.io/crud", {    // calling the api

        method : "POST",    // when we dont use axios, we define all these
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(data),   // data comming will be stringified

    }); 

    try {
        const result = await Response.json();
        return result;

    } catch (error) {
        
        return rejectWithValue(error)  // it returns with whatever error you get
    };

});

// To get all the data after submission on read page / fetching the data (here our mock api)

// read action 
export const showUser = createAsyncThunk("showUser", async (args, {rejectWithValue}) => {

    const Response = await fetch ("https://652a47034791d884f1fcb8b1.mockapi.io/crud");  // get the api (fetch = get)

    try {
        const result = await Response.json();
        console.log(result);
        return result;
        
    } catch (error) {
        return rejectWithValue(error);
    }
});

// delete action

export const deleteUser = createAsyncThunk("deleteUser", async (id, {rejectWithValue}) => {

    const Response = await fetch (`https://652a47034791d884f1fcb8b1.mockapi.io/crud/${id}`,  // to delete single user
    {method : "DELETE"}
    );

    try {
        const result = await Response.json();
        console.log(result);
        return result;
        
    } catch (error) {
        return rejectWithValue(error);
    }
});


// update action

export const updateUser = createAsyncThunk("updateUser", async (data, {rejectWithValue}) => { // createuser will be the name, data will be users data, reject = when error occours


    const Response = await fetch(`https://652a47034791d884f1fcb8b1.mockapi.io/crud/${data.id}`, {    // calling the api

        method : "PUT",    // when we dont use axios, we define all these
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(data),   // data comming will be stringified

    }); 

    try {
        const result = await Response.json();
        return result;

    } catch (error) {
        
        return rejectWithValue(error)  // it returns with whatever error you get
    };

});

export const userDetails = createSlice( {  // exporting the slice function so that it is available for all
    name: "userdetail",
    initialState : {     // when we open the app
        user: [],
        loading: false,
        error: null,
        searchData: [],
    },

    reducers : {
        searchUser : (state, action) => {
            state.searchData = action.payload
        },
    },

    // createAsyncThunk returns 3 promises (pending/reject/fulfilled) are handled by extrareducers in slice
    extraReducers: {
        [createUser.pending] : (state) => { 
            state.loading = true;   // since pending state so loading
        },
        [createUser.fulfilled] : (state, action) => { 
            state.loading = false;   // since we getting data so no loading (action = data coming)
            state.users.push(action.payload); // data of users ((gives error).push = bz in our api we already have 4 created next one will just add in it)
        },
        [createUser.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload.message;   // we will get an error so the error is assigned to the action
        },

        // read page
        [showUser.pending] : (state) => { 
            state.loading = true;  
        },
        [showUser.fulfilled] : (state, action) => { 
            state.loading = false;   
            state.users = action.payload; // since we are not adding any more data so no push, just assign the coming data to the state
        },
        [showUser.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload;   
        },

        // delete user
        [deleteUser.pending] : (state) => { 
            state.loading = true;  
        },
        [deleteUser.fulfilled] : (state, action) => { 
            state.loading = false;  
           
            // action has all the data, get id from it
            const {id} = action.payload;

            // if you have id then match the id with all ele and if it dosent match then put back and if match then delete
            if(id) {
                state.users = state.users.filter((ele) => ele.id !== id)
            }   
        },
        [deleteUser.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload;   
        },

        // update user
        [updateUser.pending] : (state) => { 
            state.loading = true;  
        },
        [updateUser.fulfilled] : (state, action) => { 
            state.loading = false;  
            state.users = state.users.map((ele) =>       
                ele.id === action.payload.id ? action.payload : ele
            );
        },
        [updateUser.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload;  
        },
    },
});

export default userDetails.reducer; 

export const { searchUser } = userDetails.actions;
