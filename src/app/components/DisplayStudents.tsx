import { Button, Table, Input } from "antd";
import { useDeleteStudentMutation, useGetStudentsQuery } from "../redux/student.service";
import style from "./DisplayStudents.module.css";
import { useDispatch } from "react-redux";
import { setButtonContent, setFormData } from "../redux/addStudentForm.slice";
import { useState } from "react";

function DisplayStudents() {
    const [search, setSearch] = useState('');
    const { data: students } = useGetStudentsQuery(search);
    const [ deleteStudent ] = useDeleteStudentMutation();
    const dispatch = useDispatch();


    const column = [
        {
            width: '1%',
            title: 'Avatar',
            dataIndex: 'avatar',
            render: (url: string) => <img src={url} className={style.avatarImage} />,
            key: 'avatar',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Date of birth',
            dataIndex: 'dateOfBirth',
            render: (dateString: string) => `${dateString.substring(0, 10)}`,
            key: 'dateOfBirth',
        },
        {
            title: 'Student group',
            dataIndex: 'studentGroup',
            key: 'studentGroup',
        },
        {
            width: '1%',
            key: 'editButton',
            dataIndex: 'id',
            render(id: string) {
                return (
                    <Button
                        type="primary"
                        onClick={() => {
                            const student = students?.find((student) => student.id === id);
                            console.log(student);
                            dispatch(setFormData(student));
                            dispatch(setButtonContent('Edit'));
                        }}
                    >Edit</Button>
                );
            }
        },
        {
            width: '1%',
            key: 'deleteButton',
            dataIndex: 'id',
            render(id: string) {
                return (
                    <Button 
                        type="primary" 
                        danger
                        onClick={() => {
                            deleteStudent(id);
                            // .then((res) => console.log(res));
                        }}
                    >Delete</Button>
                );
            }
        },
    ];

    return (
        <div>
            <Input
                style={{margin: 10, padding: 10}}
                placeholder="Enter name to filter"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Table 
                dataSource={students} 
                columns={column} rowKey="id"
            />
        </div>
    );
}

export default DisplayStudents;