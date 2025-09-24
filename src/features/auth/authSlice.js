import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from "../clientAPI";
const initialState = {
    user: null,
    token:null,
    loading: false,
    error: null
}

export const signup=createAsyncThunk("auth/signup",async(user)=>{
    try {
        const response=await apiClient.post("/user/signup",user);
        console.log('this is thunk log',response.data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
})

export const login=createAsyncThunk("auth/login",async(user)=>{
    try {
        console.log(" this is the thunk and the user here:",user)
        const response=await apiClient.post("/user/login",user);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
})
export const profile=createAsyncThunk('auth/Profile',async(id)=>{
    try {
        const response=await apiClient.get(`/user/profile?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
})
export const googleSignup=createAsyncThunk('auth/googleSignup',async(user)=>{
    try {
        const response=await apiClient.post("/user/google",user);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
})

export const logout=createAsyncThunk('auth/logout',async()=>{
    try {
        const response=await apiClient.post("/user/logout");
        console.log('this is thunk log',response.data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
})

const authSlice = createSlice({
    name: 'auth',          
    initialState: initialState,  // initial state
    reducers: {
    
    },
    extraReducers: (builder) => {
        //signup
        builder.addCase(signup.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(signup.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.data.user;
            state.token=action.payload.data.token;
            console.log('this is reducer log',state.user);
            console.log('this is reducer log',state.token);
        })
        builder.addCase(signup.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        //login
        builder.addCase(login.pending,(state)=>{
            state.loading=true;
        })
        builder .addCase(login.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.user;
            state.token=action.payload.token;
        })
        builder.addCase(login.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })

        //profile
        builder.addCase(profile.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(profile.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.user;
        })
        builder.addCase(profile.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        //googleSignup
        builder.addCase(googleSignup.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(googleSignup.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.user;
            state.token=action.payload.token;
        })
        builder.addCase(googleSignup.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
       //logout
       builder.addCase(logout.pending,(state)=>{
           state.loading=true;
       })
       builder.addCase(logout.fulfilled,(state)=>{
           state.loading=false;
           state.user=null;
           state.token=null;
       })
       builder.addCase(logout.rejected,(state,action)=>{
           state.loading=false;
           state.error=action.payload;
       })
       
    }
  });

  export default authSlice.reducer;
                
            