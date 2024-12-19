import React, { useState, useEffect } from 'react';
import { Button, Avatar, List, Modal, Select, message } from 'antd';
import { getAllWaitingRequests, editRequestStatus } from './AdminSerivce';
import { getProfile, getNationalityName, formatDate } from '../Client/ClientService';

export const AdminRequests = () =>{
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalDocsVisible, setIsModalDocsVisible] = useState(false);
    const [documents, setDocuments] = useState();

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await getAllWaitingRequests();
            const requestsData = response.$values;
            setRequests(requestsData);
        } catch (error) {
            console.error('Error fetching requests:', error);
            message.error('Failed to load requests.');
        }
    };

    const fetchDocuments = async (userId) => {
        try {
            const response = await getProfile(userId);
            const documentData = response.profile;
            console.log(documentData);
            setDocuments(documentData);
        } catch (error) {
            console.error('Error fetching docs:', error);
            message.error('Failed to load docs.');
        }
    };

    const handleOpenRequest = async (request) => {
        setSelectedRequest(request);
        setIsModalVisible(true);
    };

    const handleCancelModal = () => {
        setIsModalVisible(false);
    };

    const handleOpenDocs = async (userId) => {
        setIsModalDocsVisible(true);
        fetchDocuments(userId);
    };

    const handleCancelModalDocs  = () => {
        setIsModalDocsVisible(false);
    };

    const handleAcceptRequest = async () => {
        try {
            await editRequestStatus(selectedRequest.id, 1);
            message.success('Request accepted.');
            fetchRequests();
            handleCancelModal();
        } catch (error) {
            console.error('Error accepting request:', error);
            message.error('Failed to accept request.');
        }
    };

    const handleCancelRequest = async () => {
        try {
            await editRequestStatus(selectedRequest.id, 2);
            message.success('Request cancelled.');
            fetchRequests();
            handleCancelModal();
        } catch (error) {
            console.error('Error cancelling request:', error);
            message.error('Failed to cancel request.');
        }
    };

    return (
        <div className="section">
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
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                    Request №{index + 1}: {item.descriptionOfGoal}
                                </div>
                                <div style={{ fontSize: '14px', color: '#777' }}>
                                    <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                                    <Button
                                        type="primary"
                                        style={{ alignSelf: 'center' }}
                                        onClick={() => handleOpenDocs(item.userId)}
                                    >
                                        Check Documents
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Button
                            type="primary"
                            style={{ alignSelf: 'center' }}
                            onClick={() => handleOpenRequest(item)}
                        >
                            Open
                        </Button>
                    </List.Item>
                )}
            />

            {/* Modal for Request Details */}
            <Modal
                title={`Request №${selectedRequest?.id}`}
                visible={isModalVisible}
                onCancel={handleCancelModal}
                footer={null}
                centered
            >
                <p><strong>Goal:</strong> {selectedRequest?.goal}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={handleCancelModal}>Exit</Button>
                    <Button onClick={handleCancelRequest}>Cancel Request</Button>
                    <Button
                        type="primary"
                        onClick={handleAcceptRequest}
                        //disabled={!selectedDoctor}
                    >
                        Accept
                    </Button>
                </div>
            </Modal>

            <Modal
                title="Documents"
                visible={isModalDocsVisible}
                onCancel={handleCancelModalDocs}
                footer={null}
                centered
                className="custom-modal"
                width={1500}
            >
                <div className="document-container">
                    <div className="document-section">
                        <h3>Passport</h3>
                        <div className="document-details">
                            <p><strong>Document Number:</strong> {documents?.passport.documentNumber}</p>
                            <p><strong>Serie:</strong> {documents?.passport.serie}</p>
                            <p><strong>Sex:</strong> {documents?.passport.sex ? "Male" : "Female"}</p>
                            <p><strong>Place Of Birthday:</strong> {documents?.passport.placeOfBirthday}</p>
                            <p><strong>Code Of State:</strong> {documents?.passport.codeOfState}</p>
                            <p><strong>Nationality:</strong> {getNationalityName(documents?.passport.nationality)}</p>
                            <p><strong>Issuing Authority:</strong> {documents?.passport.issuingAuthority}</p>
                            <p><strong>Place Of Residence:</strong> {documents?.passport.placeOfResidence}</p>
                            <p><strong>Date Of Birth:</strong> {formatDate(documents?.passport.dateOfBirth)}</p>
                            <p><strong>Date Of Issue:</strong> {formatDate(documents?.passport.dateOfIssue)}</p>
                            <p><strong>Date Of Expiry:</strong> {formatDate(documents?.passport.dateOfExpiry)}</p>
                        </div>
                    </div>
                    <div className="document-section">
                        <h3>Employment Contract</h3>
                        <div className="document-details">
                            <p><strong>Employment Contract:</strong> {documents?.employmentContract.numberOfContract}</p>
                            <p><strong>Date:</strong> {formatDate(documents?.employmentContract.date)}</p>
                            <p><strong>INN:</strong> {documents?.employmentContract.inn}</p>
                            <p><strong>KPP:</strong> {documents?.employmentContract.kpp}</p>
                        </div>
                    </div>
                    <div className="document-section">
                        <h3>Resident Card</h3>
                        <div className="document-details">
                            <p><strong>Document Number:</strong> {documents?.residentCard.documentNumber}</p>
                            <p><strong>Document Serie:</strong> {documents?.residentCard.documentSerie}</p>
                            <p><strong>Date Of Issue:</strong> {formatDate(documents?.residentCard.dateOfIssue)}</p>
                            <p><strong>Date Of Expiry:</strong> {formatDate(documents?.residentCard.dateOfExpiry)}</p>
                            <p><strong>Issuing Authority:</strong> {documents?.residentCard.issuingAuthority}</p>
                        </div>
                    </div>
                    <div className="document-section">
                        <h3>Temporary Residence Permit</h3>
                        <div className="document-details">
                            <p><strong>Document Number:</strong> {documents?.temporaryResidencePermit.documentNumber}</p>
                            <p><strong>Decision Date:</strong> {formatDate(documents?.temporaryResidencePermit.dacisionDate)}</p>
                            <p><strong>Date Of Expiry:</strong> {formatDate(documents?.temporaryResidencePermit.dateOfExpiry)}</p>
                            <p><strong>Issuing Authority:</strong> {documents?.temporaryResidencePermit.issuingAuthority}</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}