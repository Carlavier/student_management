import { Form, Input, DatePicker, Select, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from 'react';
import dayjs from 'dayjs';

import { useAddStudentMutation, useEditStudentMutation } from "../redux/student.service";
import { StudentInfo } from "../redux/student.service";
import style from "./AddStudentForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { resetState, setAvatar, setDateofBirth, setName, setStudentGroup } from "../redux/addStudentForm.slice";

interface FieldType {
    name?: string
    dateOfBirth?: string
    studentGroup?: string
    avatar?: string
}

function AddStudentForm() {
    const [form] = useForm();
    const formData = useSelector((state: RootState) => state.addStudentForm);
    const [addStudent] = useAddStudentMutation();
    const [editStudent] = useEditStudentMutation();
    const selectOptions = [
        {value: 'studentGroup 1', label: 'Student group 1'},
        {value: 'studentGroup 2', label: 'Student group 2'},
        {value: 'studentGroup 3', label: 'Student group 3'},
        {value: 'studentGroup 4', label: 'Student group 4'},
        {value: 'studentGroup 5', label: 'Student group 5'},
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        form.setFieldsValue({
            name: formData.name,
            dateOfBirth: (formData.dateOfBirth?.length as number > 0) ? dayjs(formData.dateOfBirth) : null,
            studentGroup: formData.studentGroup,
            avatar: formData.avatar,
        });
    }, [formData]);

    function handleSubmit() {
        form.validateFields({ validateOnly: true})
        .then(async () => {
            const requestBody = {
                name: formData.name,
                dateOfBirth: formData.dateOfBirth,
                studentGroup: formData.studentGroup,
                avatar: formData.avatar,
            } as Omit<StudentInfo, "id">;
    
            switch (formData.buttonContent) {
                case 'Submit':
                    await addStudent(requestBody);
                    break;
                case 'Edit':
                    await editStudent({...requestBody, id: formData.id});
                    break;
            }
    
            dispatch(resetState());
            form.resetFields();
        })
        .catch(error => console.log(error));
    }

    return (
        <div>
            <div className={style.title}>Create new student</div>
            <Form 
                form={form} 
                className={style.form}
            >
                <Form.Item<FieldType>
                    label="Student name:"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    shouldUpdate={(prev) => prev !== formData.name}
                >
                    <Input 
                        className={style.field} 
                        onChange={() => dispatch(setName(form.getFieldValue('name')))}
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Date of birth:"
                    name="dateOfBirth"
                    rules={[{ required: true, message: "Please input your date of birth"}]}
                >
                    <DatePicker 
                        className={style.field} 
                        onChange={() => dispatch(setDateofBirth(form.getFieldValue('dateOfBirth').toISOString()))}
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Student group:"
                    name="studentGroup"
                    rules={[{ required: true, message: "Please input your student group"}]}
                >
                    <Select 
                        className={style.field}
                        onChange={() => dispatch(setStudentGroup(form.getFieldValue('studentGroup')))}
                    >
                        {selectOptions.map((option) => (
                            <Select.Option value={option.value}>{option.label}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                {/* can not upload image, api can not save */}
                <Form.Item<FieldType>
                    label="Avatar url"
                    name="avatar"
                >
                    <Input 
                        className={style.field} 
                        onChange={() => dispatch(setAvatar(form.getFieldValue('avatar')))}
                    />
                </Form.Item>
                <Button 
                    type="primary" 
                    htmlType="submit"
                    onClick={handleSubmit}
                    className={style.submitButton}
                >{formData.buttonContent}</Button>
            </Form>
        </div>
    );
}

export default AddStudentForm;