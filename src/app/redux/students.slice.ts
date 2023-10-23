import { createSlice } from "@reduxjs/toolkit";

export interface StudentInfo {
    id: number,
    name: string,
    dateOfBirth: string,
    studentGroup: string,
    avatar: string,
}

export const studentSlice = createSlice({
    name: "students",
    initialState: {
        students: [] as StudentInfo[],
    },
    reducers: {
        initStudents: (state, action) => {
            state = action.payload;
        }
    }
});

export const { initStudents } = studentSlice.actions;
export default studentSlice.reducer;