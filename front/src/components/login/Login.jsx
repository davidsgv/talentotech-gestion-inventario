import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from "react-router-dom";
import useSesion from '../../hooks/useSesion';

export default function Login() {
    const { login } = useSesion();

    const onFinish = (values) => {
        login(values);
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "99vh"
        }}>
            <Form
                name="login"
                initialValues={{
                    remember: true,
                }}
                style={{
                    maxWidth: 360,
                    margin: "auto"
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Log in
                    </Button>
                    or <Link to="/register">Register now!</Link>
                </Form.Item>
            </Form>
        </div>
    );
}
