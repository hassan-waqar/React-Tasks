import React, {useEffect} from 'react';
import {Button, Checkbox, Form, Input, message} from 'antd';
import { useNavigate } from 'react-router-dom';
import auth, {setUserAuthenticated} from "../redux/auth";
import {useDispatch} from "react-redux";
import {doSignInWithEmailAndPassword, doSignInWithGoogle, doSignOut, signOut} from "../firebase/auth";
import {useAuth} from "../contexts/authContext";

const App = () => {
    // const { userLoggedIn } = useAuth()

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            await doSignInWithEmailAndPassword(values.username, values.password);
            console.log('Success:', values);
            dispatch(setUserAuthenticated(true));
            navigate('/user');
        } catch (error) {
            message.error("Invalid Username Or Password")
            console.error('Error signing in:', error);
            // Handle sign-in errors
        }
    };
    const onGoogleSignIn = async (e) => {
        try {
            await signOutAndClearAuthState()
            await doSignInWithGoogle();
            dispatch(setUserAuthenticated(true));
            navigate('/user');
        } catch (err) {
            message.error("Invalid Username Or Password")
            console.log(err);
            // Handle error, if needed
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const signOutAndClearAuthState = async () => {
        try {
            await doSignOut()
        } catch (error) {
            console.error('Error signing out or clearing auth state:', error);
        }
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