import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { StudentInfo } from "./students.slice";

export const studentApi = createApi({
    reducerPath: "studentApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://653336ebd80bd20280f6515d.mockapi.io"}),
    endpoints: (build) => ({
        getStudents: build.query<StudentInfo[], void>({
            query: () => 'students'
        }),
        addStudent: build.mutation<StudentInfo, Omit<StudentInfo, "id">> ({
            query: (student) => ({
                url: "students",
                method: "POST",
                body: student,
            }),
        }),
    })
})

export const { useGetStudentsQuery, useAddStudentMutation } = studentApi;