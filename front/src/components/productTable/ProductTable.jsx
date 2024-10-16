import useGetProducts from "../../hooks/useGetProducts"
import { Table, Space, Typography, Popconfirm, Form } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deleteProduct, updateProduct } from "../../api/product";
import { useState } from "react";
import EditableCell from "./EditableCell";


export default function ProductTable() {
    const { products, refreshProducts } = useGetProducts();

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const onDelete = async (id) => {
        await deleteProduct(id)
        refreshProducts()
    }

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const res = await updateProduct(key, row);
            setEditingKey('');
            refreshProducts()
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock'
        },
        {
            title: 'Alerta Stock',
            dataIndex: 'stock_alert',
            key: 'stock_alert'
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_, record) => {
                const editable = isEditing(record);

                const editView = (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginInlineEnd: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                )

                const normalView = (
                    <Space size="middle">
                        <EditOutlined onClick={() => edit(record)} />
                        <DeleteOutlined onClick={() => { onDelete(record.id) }} />
                    </Space>
                )

                return editable ? editView : normalView
            },
        },
    ]

    const mergedColumns = columns.map((col) => {
        if (col.key == "action") {
            return col
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'stock' || col.dataIndex === "stock_alert" ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                bordered
                columns={mergedColumns}
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                dataSource={products}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    )
    //<Table columns={columns} dataSource={products} bordered />
}