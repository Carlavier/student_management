import { Col, Row } from "antd";

import DisplayStudents from "./DisplayStudents";
import AddStudentForm from "./AddStudentForm";

function Home() {
    return (
        <Row>
            <Col span={17}>
                <DisplayStudents />
            </Col>
            <Col span={1}/>
            <Col span={6}>
                <AddStudentForm />
            </Col>
        </Row>
    );
}

export default Home;