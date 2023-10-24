import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface StudentInfo {
    id: string,
    name: string,
    avatar: string,
    studentGroup: string,
    dateOfBirth: string,
}

export const studentApi = createApi({
    reducerPath: "studentApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://653336ebd80bd20280f6515d.mockapi.io"}),
    tagTypes: ['Students'],
    endpoints: (build) => ({
        //                       response       argument
        getStudents: build.query<StudentInfo[], string>({
            query: (searchTarget) => `students?name=${searchTarget}`,
            providesTags(result) {
                return result ? 
                [...result.map(({ id }) => ({type: 'Students' as const, id})), { type: 'Students' as const, id: 'LIST'}]:
                [{ type: 'Students', id: 'LIST'}];
            },
        }),
        addStudent: build.mutation<StudentInfo, Omit<StudentInfo, "id">> ({
            query: (student) => ({
                url: "students",
                method: "POST",
                body: student,
            }),
            invalidatesTags() {
                return [{type: 'Students', id: 'LIST'}];
            }
        }),
        deleteStudent: build.mutation<StudentInfo, string> ({
            query: (id) => ({
                url: `students/${id}`,
                method: "DELETE",
            }),
            invalidatesTags(_result, _error, id) {
                return [{type: 'Students', id: id}];
            }
        }),
        editStudent: build.mutation<StudentInfo, StudentInfo> ({
            query: (student) => ({
                url: `students/${student.id}`,
                method: 'PUT',
                body: student,
            }),
            invalidatesTags(_result, _error, { id }) {
                return [{type: 'Students', id: id}];
            }
        }),
    })
})

export const { 
    useGetStudentsQuery,
    useAddStudentMutation,
    useDeleteStudentMutation,
    useEditStudentMutation,
} = studentApi;