import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "../types";

interface TrackState{
  playing: boolean;
  currentTrack?: Track;
  queue: Track[];
}

const initialState : TrackState = {
  playing: false,
  queue: [],
}

export const trackSlice = createSlice({
  name: 'track',
  initialState, 
  reducers:{
    play(state: TrackState, action: PayloadAction<boolean>){
      if(!state.currentTrack){
        state.playing = false;
      }
      else{
        state.playing = action.payload;
      }
    },
    finishTrack(state: TrackState){
      if(state.queue.length > 0){
        state.currentTrack = state.queue.shift();
        state.playing = true;
      }
      else{
        state.currentTrack = undefined;
        state.playing = false;
      }
    },
    selectTrack(state: TrackState, action: PayloadAction<Track>){
      state.currentTrack = action.payload
      state.playing = false;
    },
    addInQueue(state: TrackState, action: PayloadAction<Track>){
      state.queue.push(action.payload);
      if(!state.currentTrack && state.queue.length > 0){
        state.currentTrack = state.queue.shift();
        state.playing = true;
      }
    },
  }
})

export default trackSlice.reducer; 