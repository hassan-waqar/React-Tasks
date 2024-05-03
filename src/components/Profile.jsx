import React, { useState } from "react";
import { Button, Form, Input, Modal } from 'antd';
import { getAuth, updatePassword } from "firebase/auth";

const Profile = () => {
    const auth = getAuth();
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChangePassword = async (values) => {
        const newPassword = values.newPassword;
        try {
            await updatePassword(auth.currentUser, newPassword);
            console.log('Password changed successfully.');
            setChangePasswordVisible(false);
        } catch (error) {
            console.error('Error changing password:', error.message);
        }
    };

    return (
        <>
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
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input placeholder={auth.currentUser.email} disabled />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button onClick={() => setChangePasswordVisible(true)} style={{ marginLeft: '10px' }}>
                        Change Password
                    </Button>
                </Form.Item>
            </Form>

            <Modal
                title="Change Password"
                visible={changePasswordVisible}
                onCancel={() => setChangePasswordVisible(false)}
                footer={null}
            >
                <Form
                    name="change-password"
                    onFinish={handleChangePassword}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                >
                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Profile;
