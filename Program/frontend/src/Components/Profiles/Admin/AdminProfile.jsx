import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, Menu, Modal} from 'antd';

import { getProfile } from "../Client/ClientService";

import { AdminTerms } from './AdminTerms';
import { AdminRequests } from './AdminRequests';

export const AdminProfile = () =>{
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const [activeSection, setActiveSection] = useState('Terms');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () =>{
        try {
            const newUser = await getProfile(id);
            setUser(newUser);
        } catch (error) {
            console.error('Ошибка при получении профиля:', error);
        }
    }

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const handleLogout = () => {
        Modal.confirm({
            title: 'Exit',
            content: 'Are you sure you want to leave the page?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                navigate(`/login`, { replace: true });
            },
            onCancel: () => {
                handleSectionChange("personalInfo");
            },
        });
    };

    if (!user){
        return<div>Loading...</div>
    }

    return (
        <div className="dashboard-container">
            <div className="profile-header">
                <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${id}`}
                    size={100}
                    style={{
                        marginRight: '16px',
                        border: '2px solid #f0f0f0',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease',
                    }}
                    className="profile-avatar"
                />
                <div className="profile-info">
                    <h2 className="profile-title">Admin Profile</h2>
                    <div className="profile-details">
                        <h3 className="profile-name">Name: {user.name}</h3>
                        <h3 className="profile-surname">Surname: {user.surname} </h3>
                    </div>
                </div>
            </div>

            <Menu
                onClick={({ key }) => handleSectionChange(key)}
                selectedKeys={[activeSection]}
                mode="horizontal"
                style={{ marginBottom: '20px' }}
            >               
                <Menu.Item key="Terms">Terms</Menu.Item>
                <Menu.Item key="Requests">Requests</Menu.Item>
                <Menu.Item key="logout" onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>

            <div className="dashboard-content">
                {activeSection === 'Terms' && user &&(
                    <AdminTerms />
                )}
                {activeSection === 'Requests' && user &&(
                    <AdminRequests />
                )}
            </div>
        </div>
    );
};