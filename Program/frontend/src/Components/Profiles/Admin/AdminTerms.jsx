import React, { useState, useEffect } from 'react';
import { Modal, Button, List, Input, Form } from 'antd';
import { createTerm, deleteTerm } from './AdminSerivce';
import { PlusOutlined, ToolOutlined } from '@ant-design/icons';
import { getTerms } from '../Client/TermsService';
import { formatDate } from '../Client/ClientService';

export const AdminTerms = () => {
    const [settings, setSettings] = useState([]);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); 
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false); 
    const [settingToDelete, setSettingToDelete] = useState(null); 

    const [form] = Form.useForm(); 

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await getTerms();
            const settingsData = response.$values;
            setSettings(settingsData);
        } catch (error) {
            console.error('Error fetching settingsData:', error);
        }
    };

    const handleDelete = async (settingId) => {
        try {
            await deleteTerm(settingId);
            setSettings(prevSettings => prevSettings.filter(setting => setting.id !== settingId));
            setIsDeleteModalVisible(false); 
        } catch (error) {
            console.error('Error deleting setting:', error);
        }
    };

    const handleCreateSetting = async (values) => {
        try {
            const { desc } = values;
            const dateTime = new Date().toISOString();
            await createTerm(desc, dateTime); 
            fetchSettings(); 
            setIsCreateModalVisible(false); 
        } catch (error) {
            console.error('Error creating setting:', error);
        }
    };

    const showDeleteModal = (settingId) => {
        setSettingToDelete(settingId);
        setIsDeleteModalVisible(true); 
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false); 
    };

    const showCreateModal = () => {
        setIsCreateModalVisible(true);
    };

    const handleCancelCreate = () => {
        setIsCreateModalVisible(false); 
    };

    return(
        <div className="section">
        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
            <Button 
                type="primary" 
                size="large" 
                icon={<PlusOutlined />} 
                style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                onClick={showCreateModal} 
            >
                Create term
            </Button>
        </div>
        <List
            pagination={{
                position: 'bottom',
                align: 'center',
                pageSize: 3,
            }}
            dataSource={settings}
            renderItem={(item, index) => (
                <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>  
                        <ToolOutlined 
                            style={{ fontSize: '40px', color: '#1890ff', marginRight: '20px' }} 
                        />
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                Term №{index + 1}: 
                            </div>
                            <div style={{ fontSize: '14px', color: '#777' }}>
                                <p><strong>Description:</strong> {item.desc}</p>
                                <p><strong>Date:</strong> {formatDate(item.dateTime)}</p>
                            </div>
                        </div>
                    </div>
                    <Button
                        type="primary"
                        danger
                        onClick={() => showDeleteModal(item.id)} 
                        style={{ alignSelf: 'center' }}
                    >
                        Delete
                    </Button>
                </List.Item>
            )}
        />
        <Modal
                title="Delete term"
                visible={isDeleteModalVisible}
                onOk={() => handleDelete(settingToDelete)} 
                onCancel={handleCancelDelete} 
                okText="Yes"
                cancelText="No"
            >
                <p>Are you sure you want to delete this term?</p>
            </Modal>

            <Modal
                title="Create New Setting"
                visible={isCreateModalVisible}
                onCancel={handleCancelCreate} 
                footer={null}
                width={500}
            >
                <Form
                    form={form}
                    onFinish={handleCreateSetting}
                    layout="vertical"
                >
                    <Form.Item
                        label="Description"
                        name="desc"
                        rules={[{ required: true, message: 'Please input the Description!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
    </div>
    );
};