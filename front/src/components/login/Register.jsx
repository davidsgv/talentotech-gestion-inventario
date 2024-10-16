import React from 'react';
import { LockOutlined, UserOutlined, IdcardOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import useSesion from '../../hooks/useSesion';

export default function Register() {
    const { register } = useSesion()

    const onFinish = (values) => {
        register(values)
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

                <Form.Item
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Role!',
                        },
                    ]}
                >
                    <Input prefix={<IdcardOutlined />} type="text" placeholder="Rol" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}