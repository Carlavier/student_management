import { Form, Input, DatePicker, Select, Button } from "antd";
import { useForm } from "antd/es/form/Form";

import { useAddStudentMutation } from "../redux/student.service";
import { StudentInfo } from "../redux/students.slice";
import style from "./AddStudentForm.module.css";

interface FieldType {
    name?: string
    dateOfBirth?: string
    studentGroup?: string
    avatar?: string
}

function AddStudentForm() {
    const [form] = useForm();
    const [addStudent] = useAddStudentMutation();

    async function handleSubmit() {
        const values = form.getFieldsValue();
        const postBody = {
            name: values.name,
            dateOfBirth: values.dateOfBirth.toISOString(),
            studentGroup: values.studentGroup,
            avatar: values.avatar,
        } as Omit<StudentInfo, "id">;
        await addStudent(postBody);
        form.setFieldValue('name', '');
        form.setFieldValue('dateOfBirth', null);
        form.setFieldValue('studentGroup', null);
        form.setFieldValue('avatar', '');
    }

    return (
        <div>
            <div className={style.title}>Create new student</div>
            <Form form={form} className={style.form}>
                <Form.Item<FieldType>
                    label="Student name:"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input className={style.field} />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Date of birth:"
                    name="dateOfBirth"
                    rules={[{ required: true, message: "Please input your date of birth"}]}
                >
                    <DatePicker className={style.field} />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Student group:"
                    name="studentGroup"
                    rules={[{ required: true, message: "Please input your student group"}]}
                >
                    <Select className={style.field}>
                        <Select.Option value="aaaa">Demo</Select.Option>
                        <Select.Option value="bbbb">Demo2</Select.Option>
                    </Select>
                </Form.Item>
                {/* can not upload image, api can not save */}
                <Form.Item<FieldType>
                    label="Avatar url"
                    name="avatar"
                >
                    <Input className={style.field} />
                </Form.Item>
                <Button 
                    type="primary" 
                    htmlType="submit"
                    onClick={handleSubmit}
                    className={style.submitButton}
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AddStudentForm;