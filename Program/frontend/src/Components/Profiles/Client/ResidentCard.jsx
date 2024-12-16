import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Space, message, Modal } from 'antd';
import dayjs from 'dayjs';
import { getNationalityName, formatDate, editResidentCard } from './ClientService';
import { EditOutlined } from "@ant-design/icons";

export const ResidentCard = ( {user, fetchProfile} ) => {
    const [isEditingResidentCard, setIsEditingResidentCard] = useState(false);
    const [form] = Form.useForm();

    const handleCancelEditingResidentCard = () => {
        setIsEditingResidentCard(false);
    };

    const handleSubmit = async (values) => {
        try {
            const payload = {
                id: user.id,
                documentNumber: values.documentNumber,
                documentSerie: values.documentSerie,  
                dateOfIssue: values.dateOfIssue.format('YYYY-MM-DD'),
                dateOfExpiry: values.dateOfExpiry.format('YYYY-MM-DD'),
                issuingAuthority: values.issuingAuthority,                
            };

            await editResidentCard(
                payload.id,
                payload.documentNumber,
                payload.documentSerie,
                payload.dateOfIssue,
                payload.dateOfExpiry,
                payload.issuingAuthority,
            );

            setIsEditingResidentCard(false);
            message.success('ResidentCard Updated!');
            fetchProfile();
        } catch (error) {
            console.error('Error updating residentCard:', error);
            message.error('Failed to update residentCard!');
        }
    };

    return (
        <div className="passport-info">
            
            <div className="personal-info-header">
                <Space align="center">
                    <h4>Resident Card</h4>
                    <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => setIsEditingResidentCard(true)}
                    />
                </Space>
            </div>
            <Modal
                title="Edit Resident Card Info"
                visible={isEditingResidentCard}
                onCancel={handleCancelEditingResidentCard}
                footer={null}
            >
                <Form
                    className="personal-info-content"
                    form={form}
                    style={{ maxWidth: 600, textAlign: 'left' }}
                    initialValues={{
                        documentNumber: user.profile.residentCard.documentNumber,
                        documentSerie: user.profile.residentCard.documentSerie,
                        dateOfIssue: user.profile.residentCard.dateOfIssue ? dayjs(user.profile.residentCard.dateOfIssue) : null,
                        dateOfExpiry: user.profile.residentCard.dateOfExpiry ? dayjs(user.profile.residentCard.dateOfExpiry) : null,
                        issuingAuthority: user.profile.residentCard.issuingAuthority,
                    }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Number"
                        name="documentNumber"
                        rules={[
                            { required: true, message: 'Enter document number' },
                            { pattern: /^\d{9}$/, message: 'Document number must be exactly 9 digits' },
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Serie"
                        name="documentSerie"
                        rules={[
                            { required: true, message: 'Enter document serie' },
                            { pattern: /^\d{9}$/, message: 'Document serie must be exactly 9 digits' },
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Date Of Issue"
                        name="dateOfIssue"
                        rules={[{ required: true, message: 'Enter date of issue' }]}
                    >
                        <DatePicker style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Date Of Expiry"
                        name="dateOfExpiry"
                        rules={[{ required: true, message: 'Enter date of expiry' }]}
                    >
                        <DatePicker style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Issuing Authority"
                        name="issuingAuthority"
                        rules={[
                            { required: true, message: 'Enter Issuing Authority' }
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                            Save
                        </Button>
                        <Button type="default" onClick={handleCancelEditingResidentCard}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {!isEditingResidentCard && (
                <div>
                    <div className="personal-info-content">
                        <p><span className="personal-info-label">Document Number:</span> {user.profile.residentCard.documentNumber}</p>
                        <p><span className="personal-info-label">Serie:</span> {user.profile.residentCard.documentSerie}</p>
                        <p><span className="personal-info-label">Date Of Issue:</span> {formatDate(user.profile.residentCard.dateOfIssue)}</p>
                        <p><span className="personal-info-label">Date Of Expiry:</span> {formatDate(user.profile.residentCard.dateOfExpiry)}</p>
                        <p><span className="personal-info-label">Issuing Authority:</span> {user.profile.residentCard.issuingAuthority}</p>
                    </div>
                </div>
            )}
        </div>
    );
};