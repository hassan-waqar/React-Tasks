import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import {setUserAuthenticated} from "../redux/auth";
import {useDispatch} from "react-redux";
import {doSignInWithGoogle, doCreateUserWithEmailAndPassword} from "../firebase/auth";

const App = () => {
    // const { userLoggedIn } = useAuth()

    const dispatch = useDispatch();
    const navigate = useNavigate()

   // Import your authentication function for user registration

    const onFinish = async (values) => {
        try {
            console.log('Success:', values);

            // Create a new user account with email and password
            await doCreateUserWithEmailAndPassword(values.username, values.password);
            dispatch(setUserAuthenticated(true));
            navigate('/user');
        } catch (error) {
            console.error('Error signing up:', error);
            // Handle sign-up errors
        }
    };

    const onGoogleSignIn = async () => {
        try {
            await doSignInWithGoogle();
            dispatch(setUserAuthenticated(true));
            navigate('/user');
        } catch (error) {
            console.error('Error signing in with Google:', error);
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
                    <Button type="primary" onClick={onGoogleSignIn}>
                        Login With Google
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default App;