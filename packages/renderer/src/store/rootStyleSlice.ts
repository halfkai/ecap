import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RootStyleState {
  width: `${number}px`
  height: `${number}px`
}

const initialState: RootStyleState = {
  width: '0px',
  height: '0px',
}

export const rootStyleSlice = createSlice({
  name: 'rootStyle',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<[
      keyof RootStyleState,
      number
    ]>) => {
      state[action.payload[0]] = `${action.payload[1]}px`
    },
  }
})

export const { set } = rootStyleSlice.actions

export const rootStyleReducers = rootStyleSlice.reducer
