import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import {setAdminAuthenticated} from "../redux/auth";
import {useDispatch} from "react-redux";
import {doSignInWithEmailAndPassword} from "../firebase/auth";


const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            // Check if the email ends with "@admin.com"
            if (!values.username.endsWith('@admin.com')) {
                throw new Error('Only admin accounts are allowed to sign in.');
            }

            // Sign in with email and password
            await doSignInWithEmailAndPassword(values.username, values.password);
            console.log('Success:', values);
            dispatch(setAdminAuthenticated(true));
            navigate('/admin');
        } catch (error) {
            console.error('Error signing in:', error);
            // Handle sign-in errors
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh"
            // margin: "auto"
        }}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                    margin: "auto"
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"

            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default App;