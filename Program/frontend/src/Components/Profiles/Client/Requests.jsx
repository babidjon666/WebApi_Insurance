import React, { useState, useEffect } from 'react';
import { createRequest, getUsersRequests } from './RequestService';
import { Button, Avatar, List, Modal, Tag, Form, Input, Select, message, DatePicker} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const Requests = ( {id} ) => {
    const [requests, setRequests] = useState([]);  
    const [isModalVisible, setIsModalVisible] = useState(false);  
    const [form] = Form.useForm();  

    useEffect(() => {
        fetchRequests(id);  
    }, [id]);

    const fetchRequests = async (id) => {
        try {
            const response = await getUsersRequests(id);
            const requestsData = response.$values; 
            setRequests(requestsData);  
            
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = async (values) => {
        const { goal } = values;
        try {
            const currentDate = new Date().toISOString();
            const newRequest = await createRequest(id, goal, currentDate, 0);
            console.log('Request created:', newRequest);
           
            fetchRequests(id);
            setIsModalVisible(false);
            message.success("Request Created"); 
        } catch (error) {
            console.error('Error creating request:', error);
            message.error("Error"); 
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 0:
                return 'orange'; // В ожидании
            case 1:
                return 'green'; // Принята
            case 2:
                return 'red'; // Отменена
            default:
                return 'default';
        }
    };

    return(
        <div className="section">
        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
            <Button 
                type="primary" 
                size="large" 
                icon={<PlusOutlined />} 
                style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                onClick={showModal} 
            >
                Create request
            </Button>
        </div>
        <List
            pagination={{
                position: 'bottom',
                align: 'center',
                pageSize: 3,
            }}
            dataSource={requests}  
            renderItem={(item, index) => (
                <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} size={80} style={{ marginRight: '20px' }} />
                        <div style={{textAlign: 'left'}}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                Request №{index + 1}: {item.descriptionOfGoal}
                            </div>
                            <div style={{ fontSize: '14px', color: '#777' }}>
                                <p><strong>Goal:</strong> {item.goal}</p>
                                <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                    <Tag color={getStatusColor(item.requestStatus)} style={{ fontSize: '16px', padding: '10px 20px' }}>
                        {item.requestStatus === 0 ? 'In Waiting' : item.requestStatus === 1 ? 'Accepted' : 'Cancelled'}
                    </Tag>
                </List.Item>
            )}
        />
        <Modal
                title="Create Request"
                visible={isModalVisible}  
                onCancel={handleCancel}  
                footer={null}  
                maskClosable={true}  
                centered  
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        label="Goal description"
                        name="goal"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Enter request description" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
    </div> 
    );
};