import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Space, message, Modal } from 'antd';
import dayjs from 'dayjs';
import { getNationalityName, formatDate, editEmploymentContract } from './ClientService';
import { EditOutlined } from "@ant-design/icons";


export const EmploymentContract = ( {user, fetchProfile} ) => {
    const [isEditingContract, setIsEditingContract] = useState(false);
    const [form] = Form.useForm();

    const handleCancelEditingContract = () => {
        setIsEditingContract(false);
    };

    const handleSubmit = async (values) => {
        try {
            const payload = {
                id: user.id,
                numberOfContract: values.numberOfContract,
                date: values.date.format('YYYY-MM-DD'),
                inn: values.inn,    
                kpp: values.kpp,                
            };

            await editEmploymentContract(
                payload.id,
                payload.numberOfContract,
                payload.date,
                payload.inn,
                payload.kpp,
       
            );

            setIsEditingContract(false);
            message.success('Contract Updated!');
            fetchProfile();
        } catch (error) {
            console.error('Error updating contract:', error);
            message.error('Failed to update contract!');
        }
    };

    return (
        <div className="passport-info">
            <div className="personal-info-header">
                <Space align="center">
                    <h4>Employment</h4>
                    <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => setIsEditingContract(true)}
                    />
                </Space>
            </div>
            
            <Modal
                title="Edit Passport Info"
                visible={isEditingContract}
                onCancel={handleCancelEditingContract}
                footer={null}
            >
                <Form
                    className="personal-info-content"
                    form={form}
                    style={{ maxWidth: 600, textAlign: 'left' }}
                    initialValues={{
                        numberOfContract: user.profile.employmentContract.numberOfContract,
                        dateOfExpiry: user.profile.employmentContract.date ? dayjs(user.profile.employmentContract.date) : null,
                        inn: user.profile.employmentContract.inn,
                        kpp: user.profile.employmentContract.kpp,
                    }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Number"
                        name="numberOfContract"
                        rules={[
                            { required: true, message: 'Enter document number' },
                            { pattern: /^\d{9}$/, message: 'Document number must be exactly 9 digits' },
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="INN"
                        name="inn"
                        rules={[
                            { required: true, message: 'Enter your INN' },
                            { pattern: /^\d{9}$/, message: 'Document number must be exactly 9 digits' },
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="KPP"
                        name="kpp"
                        rules={[
                            { required: true, message: 'Enter your KPP' },
                            { pattern: /^\d{9}$/, message: 'Document number must be exactly 9 digits' },
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: 'Enter date of issue' }]}
                    >
                        <DatePicker style={{ width: '250px' }} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                            Save
                        </Button>
                        <Button type="default" onClick={handleCancelEditingContract}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {!isEditingContract && (
                <div>
                    <div className="personal-info-content">
                        <p><span className="personal-info-label">Document Number:</span> {user.profile.employmentContract.numberOfContract}</p>
                        <p><span className="personal-info-label">INN:</span> {user.profile.employmentContract.inn}</p>
                        <p><span className="personal-info-label">KPP:</span> {user.profile.employmentContract.kpp}</p>
                        <p><span className="personal-info-label">Date:</span> {formatDate(user.profile.employmentContract.date)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};