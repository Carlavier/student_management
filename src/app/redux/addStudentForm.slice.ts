import { createSlice } from "@reduxjs/toolkit";

type ButtonContent = 'Submit' | 'Edit';
interface ChangeButtonContentAction {
    payload: ButtonContent,
    type: string,
}

const addStudentFormSlice = createSlice({
    name: 'addStudentForm',
    initialState: {
        id: '',
        name: '',
        dateOfBirth: '' as string | null,
        studentGroup: '',
        avatar: '',
        buttonContent: 'Submit' as ButtonContent,
    },
    reducers: {
        setName(state, action) {
            state.name = action.payload;
        },
        setDateofBirth(state, action) {
            state.dateOfBirth = action.payload;
        },
        setStudentGroup(state, action) {
            state.studentGroup = action.payload;
        },
        setAvatar(state, action) {
            state.avatar = action.payload;
        },
        setButtonContent(state, action: ChangeButtonContentAction) {
            state.buttonContent = action.payload;
        },
        resetState(state) {
            state.name = state.avatar = state.studentGroup = state.dateOfBirth = '';
            state.buttonContent = 'Submit';
        },
        setFormData(state, action) {
            state.name = action.payload.name;
            state.dateOfBirth = action.payload.dateOfBirth;
            state.studentGroup = action.payload.studentGroup;
            state.avatar = action.payload.avatar;
            state.buttonContent = 'Submit';
            state.id = action.payload.id;
        },
        setId(state, action) {
            state.id = action.payload.id;
        }
    }
});

export const { 
    setName, 
    setButtonContent, 
    setAvatar, 
    setDateofBirth, 
    setStudentGroup, 
    resetState,
    setFormData,
} = addStudentFormSlice.actions;
export default addStudentFormSlice.reducer;