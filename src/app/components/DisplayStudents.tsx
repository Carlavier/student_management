import { Table, Form, Input, Select } from "antd";
import { useGetStudentsQuery } from "../redux/student.service";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

import { RootState } from "../redux/store";
import { initStudents } from "../redux/students.slice";

import style from "./DisplayStudents.module.css";

interface Filter {
    targetString?: string
    targetColumn?: string
}

type StudentInfoIndex = 'name' | 'dateOfBirth' | 'studentGroup' | 'avatar';

function DisplayStudents() {
    const column = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            render: (url: string) => <img src={url} />,
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
    ];

    const [form] = useForm();
    const dispatch = useDispatch();
    // const { students } = useSelector((state: RootState) => state.students);
    const { data: students } = useGetStudentsQuery();
    // dispatch(initStudents(data)); // NEED FIX ASAP

    // if (isLoading) return (<div>isloading...</div>);

    useEffect(() => {}, [form.getFieldValue('targetString'), form.getFieldValue('targetColumn')])

    return (
        <div>
            <Form layout="inline" className={style.form} form={form}>
                <div className={style.label}>Filter:</div>
                <Form.Item<Filter>
                    name="targetString"
                >
                    <Input className={style.input}/>
                </Form.Item>
                <Form.Item<Filter>
                    name="targetColumn"
                >
                    <Select className={style.select}>
                        {column.map((item) => (
                            <Select.Option value={item.dataIndex}>{item.title}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
            <Table 
                dataSource={
                    (form.getFieldValue('targetString') && form.getFieldValue('targetColumn')) ?
                    students?.filter((student) => student[form.getFieldValue('targetColumn') as StudentInfoIndex].includes(form.getFieldValue('targetString') as string))
                    : students
                } 
                columns={column} rowKey="id"
            />
        </div>
    );
}

export default DisplayStudents;