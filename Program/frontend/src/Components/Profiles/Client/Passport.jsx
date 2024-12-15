import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Select, message, Modal } from 'antd';
import dayjs from 'dayjs';
import { getNationalityName, formatDate, editPassport } from './ClientService';

export const Passport = ( {user, fetchProfile} ) => {
    const [isEditingPassport, setIsEditingPassport] = useState(false);
    const [form] = Form.useForm();

    const handleCancelEditingPassport = () => {
        setIsEditingPassport(false);
    };

    const handleSubmit = async (values) => {
        try {
            const payload = {
                userId: user.id,
                documentNumber: values.documentNumber,
                serie: values.serie,
                sex: values.sex === 'true' ? true : false,
                placeOfBirthday: values.placeOfBirthday,
                codeOfState: values.codeOfState,
                nationality: parseInt(values.nationality, 10),
                issuingAuthority: values.issuingAuthority,
                placeOfResidence: values.placeOfResidence,
                dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
                dateOfIssue: values.dateOfIssue.format('YYYY-MM-DD'),
                dateOfExpiry: values.dateOfExpiry.format('YYYY-MM-DD'),
            };

            await editPassport(
                payload.userId,
                payload.documentNumber,
                payload.serie,
                payload.sex,
                payload.placeOfBirthday,
                payload.codeOfState,
                payload.nationality,
                payload.issuingAuthority,
                payload.placeOfResidence,
                payload.dateOfBirth,
                payload.dateOfIssue,
                payload.dateOfExpiry,
            );

            setIsEditingPassport(false);
            message.success('Passport Updated!');
            fetchProfile();
        } catch (error) {
            console.error('Error updating passport:', error);
            message.error('Failed to update passport!');
        }
    };

    return (
        <div className="passport-info">
            <h4 className="personal-info-header">Passport</h4>
            
            <Modal
                title="Edit Passport Info"
                visible={isEditingPassport}
                onCancel={handleCancelEditingPassport}
                footer={null}
            >
                <Form
                    className="personal-info-content"
                    form={form}
                    style={{ maxWidth: 600, textAlign: 'left' }}
                    initialValues={{
                        documentNumber: user.profile.passport.documentNumber,
                        serie: user.profile.passport.serie,
                        sex: user.profile.passport.sex,
                        placeOfBirthday: user.profile.passport.placeOfBirthday,
                        codeOfState: user.profile.passport.codeOfState,
                        nationality: `${user.profile.passport.nationality}`,
                        issuingAuthority: user.profile.passport.issuingAuthority,
                        placeOfResidence: user.profile.passport.placeOfResidence,
                        dateOfBirth: user.profile.passport.dateOfBirth ? dayjs(user.profile.passport.dateOfBirth) : null,
                        dateOfIssue: user.profile.passport.dateOfIssue ? dayjs(user.profile.passport.dateOfIssue) : null,
                        dateOfExpiry: user.profile.passport.dateOfExpiry ? dayjs(user.profile.passport.dateOfExpiry) : null,
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
                        name="serie"
                        rules={[
                            { required: true, message: 'Enter series' },
                            { pattern: /^\d{2}$/, message: 'Serie must be exactly 2 digits' },
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Sex"
                        name="sex"
                        rules={[{ required: true, message: 'Select sex' }]}
                    >
                        <Select style={{ width: '250px' }}>
                            <Select.Option value="false">Female</Select.Option>
                            <Select.Option value="true">Male</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Place of Birth"
                        name="placeOfBirthday"
                        rules={[
                            { required: true, message: 'Enter place of birth' },
                            { pattern: /^[A-Za-z\s]+$/, message: 'Place of birth must contain only letters and spaces' },
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Code of State"
                        name="codeOfState"
                        rules={[
                            { required: true, message: 'Enter code of state' },
                            { pattern: /^\d{4}$/, message: 'Code of state must be exactly 4 digits' },
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Place of Residence"
                        name="placeOfResidence"
                        rules={[
                            { required: true, message: 'Enter place of residence' },
                            { pattern: /^[A-Za-z\s]+$/, message: 'Place of residence must contain only letters and spaces' },
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Issuing Authority"
                        name="issuingAuthority"
                        rules={[
                            { required: true, message: 'Enter issuing authority' },
                            { pattern: /^[A-Za-z\s]+$/, message: 'Issuing authority must contain only letters and spaces' },
                        ]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Nationality"
                        name="nationality"
                        rules={[{ required: true, message: 'Select nationality' }]}
                    >
                        <Select style={{ width: '250px' }}>
                            <Select.Option value="0">Azerbaijan</Select.Option>
                            <Select.Option value="1">Tajikistan</Select.Option>
                            <Select.Option value="2">Uzbekistan</Select.Option>
                            <Select.Option value="3">Moldova</Select.Option>
                            <Select.Option value="4">Ukraine</Select.Option>
                            <Select.Option value="5">Kyrgyzstan</Select.Option>
                            <Select.Option value="6">Kazakhstan</Select.Option>
                            <Select.Option value="7">Armenia</Select.Option>
                            <Select.Option value="8">Belarus</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Date of Issue"
                        name="dateOfIssue"
                        rules={[{ required: true, message: 'Enter date of issue' }]}
                    >
                        <DatePicker style={{ width: '250px' }} />
                    </Form.Item>
                    
                    <Form.Item
                        label="Date of Birth"
                        name="dateOfBirth"
                        rules={[{ required: true, message: 'Enter date of birth' }]}
                    >
                        <DatePicker style={{ width: '250px' }} />
                    </Form.Item>
                    
                    <Form.Item
                        label="Date of Expiry"
                        name="dateOfExpiry"
                        rules={[{ required: true, message: 'Enter date of expiry' }]}
                    >
                        <DatePicker style={{ width: '250px' }} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                            Save
                        </Button>
                        <Button type="default" onClick={handleCancelEditingPassport}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {!isEditingPassport && (
                <div>
                    <div className="personal-info-content">
                        <p><span className="personal-info-label">Document Number:</span> {user.profile.passport.documentNumber}</p>
                        <p><span className="personal-info-label">Serie:</span> {user.profile.passport.serie}</p>
                        <p><span className="personal-info-label">Sex:</span> {user.profile.passport.sex === false ? 'Female' : 'Male'}</p>
                        <p><span className="personal-info-label">Place of Birth:</span> {user.profile.passport.placeOfBirthday}</p>
                        <p><span className="personal-info-label">Code of State:</span> {user.profile.passport.codeOfState}</p>
                        <p><span className="personal-info-label">Place of Residence:</span> {user.profile.passport.placeOfResidence}</p>
                        <p><span className="personal-info-label">Issuing Authority:</span> {user.profile.passport.issuingAuthority}</p>
                        <p><span className="personal-info-label">Nationality:</span> {getNationalityName(user.profile.passport.nationality)}</p>
                        <p><span className="personal-info-label">Date of Issue:</span> {formatDate(user.profile.passport.dateOfIssue)}</p>
                        <p><span className="personal-info-label">Date of Birth:</span> {formatDate(user.profile.passport.dateOfBirth)}</p>
                        <p><span className="personal-info-label">Date of Expiry:</span> {formatDate(user.profile.passport.dateOfExpiry)}</p>
                    </div>
                    <Button type="primary" onClick={() => setIsEditingPassport(true)}>
                        Edit Passport Info
                    </Button>
                </div>
            )}
        </div>
    );
};