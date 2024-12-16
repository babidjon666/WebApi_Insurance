import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Space, message, Modal } from 'antd';
import dayjs from 'dayjs';
import { getNationalityName, formatDate, editTemporaryResidencePermit } from './ClientService';
import { EditOutlined } from "@ant-design/icons";

export const TemporaryResidencePermit = ( {user, fetchProfile} ) => {
    const [isEditingTemporary, setIsEditingTemporary] = useState(false);
    const [form] = Form.useForm();

    const handleCancelEditingTemporary = () => {
        setIsEditingTemporary(false);
    };

    const handleSubmit = async (values) => {
        try {
            const payload = {
                id: user.id,
                documentNumber: values.documentNumber,
                dacisionDate: values.dacisionDate.format('YYYY-MM-DD'),
                dateOfExpiry: values.dateOfExpiry.format('YYYY-MM-DD'),
                issuingAuthority: values.issuingAuthority,                
            };

            await editTemporaryResidencePermit(
                payload.id,
                payload.documentNumber,
                payload.dacisionDate,
                payload.dateOfExpiry,
                payload.issuingAuthority,
            );

            setIsEditingTemporary(false);
            message.success('TemporaryResidencePermit Updated!');
            fetchProfile();
        } catch (error) {
            console.error('Error updating temporaryResidencePermit:', error);
            message.error('Failed to update temporaryResidencePermit!');
        }
    };

    return (
        <div className="passport-info">
            <div className="personal-info-header">
                <Space align="center">
                    <h4>Temporary Permit</h4>
                    <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => setIsEditingTemporary(true)}
                    />
                </Space>
            </div>
            
            <Modal
                title="Edit Temporary Residence Permit Info"
                visible={isEditingTemporary}
                onCancel={handleCancelEditingTemporary}
                footer={null}
            >
                <Form
                    className="personal-info-content"
                    form={form}
                    style={{ maxWidth: 600, textAlign: 'left' }}
                    initialValues={{
                        documentNumber: user.profile.temporaryResidencePermit.documentNumber,
                        dacisionDate: user.profile.temporaryResidencePermit.dacisionDate ? dayjs(user.profile.residentCard.dacisionDate) : null,
                        dateOfExpiry: user.profile.temporaryResidencePermit.dateOfExpiry ? dayjs(user.profile.residentCard.dateOfExpiry) : null,
                        issuingAuthority: user.profile.temporaryResidencePermit.issuingAuthority,
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
                        label="Decision Date"
                        name="dacisionDate"
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
                        <Button type="default" onClick={handleCancelEditingTemporary}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {!isEditingTemporary && (
                <div>
                    <div className="personal-info-content">
                        <p><span className="personal-info-label">Document Number:</span> {user.profile.temporaryResidencePermit.documentNumber}</p>
                        <p><span className="personal-info-label">Decision Date:</span> {formatDate(user.profile.temporaryResidencePermit.dacisionDate)}</p>
                        <p><span className="personal-info-label">Date Of Expiry:</span> {formatDate(user.profile.temporaryResidencePermit.dateOfExpiry)}</p>
                        <p><span className="personal-info-label">Issuing Authority:</span> {user.profile.temporaryResidencePermit.issuingAuthority}</p>
                    </div>
                </div>
            )}
        </div>
    );
};