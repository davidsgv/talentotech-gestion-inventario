import React from 'react';
import { LockOutlined, UserOutlined, IdcardOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

export default function Register() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
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
    );
}