import './App.css';
import './Components/Profiles/mainStyle.css';


import { Auth } from './Components/Auth/Auth.jsx';
import { ClientProfile } from './Components/Profiles/Client/ClientProfile.jsx';
import { AdminProfile } from './Components/Profiles/Admin/AdminProfile.jsx';
import { EmployeeProfile } from './Components/Profiles/Employee/EmployeeProfile.jsx';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Auth />} />
                <Route path="/clientProfile/:id" element={<ClientProfile />} />
                <Route path="/adminProfile/:id" element={<AdminProfile />} />
                <Route path="/employeeProfile/:id" element={<EmployeeProfile />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;