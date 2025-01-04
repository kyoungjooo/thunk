import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* 
function getUser(){
  try{
    dispatch(loadingUsers())
    const response = await axios.get()
    dispatch(getUsers(response.data))
  }catch(error){
    dispatch(errorUsers(error.response))
  }
}
*/
//thunk는 고차함수를 통해서 세가지 dispatch를 하나의 dispatch로 바꿔주는 함수
//rtk로 넘어오면서 이런로직이 모두 자동화
//로딩, 에러 사항을 알려주는데 만약 그 값이 전역 상태되는 값이라면, dispatch 를 여러번 보내야해서 복잡하니깐 thunk 사용

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [], //data
    getUsersStatus: {
      loading: false, //로딩 여부
      done: false, //성공 실패 상관없이 데이터를 불러왔는지
      error: null, //에러 메시지
    },
    //addUsersState
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.getUsersStatus.loading = true;
      //reset, 다시 데이터를 불러왔을 때 이전에 데이터를 불러온 결과를 초기화
      state.getUsersStatus.done = false;
      state.getUsersStatus.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.getUsersStatus.loading = false;
      state.getUsersStatus.done = true;
      state.users = action.payload; //createAsyncThunk의 return 값이 payload에 전달
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.getUsersStatus.loading = false;
      state.getUsersStatus.done = true;
      state.getUsersStatus.error = action.payload; //getUsers가 throw 하는 에러를 자동으로 캐치해서 Payload에 전달
    });
  },
});

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await axios.get("/api/user/list");
  return response.data;
});
