import React from 'react';
import { Passport } from './Passport.jsx';
import { EmploymentContract } from './EmploymentContract.jsx';
import { ResidentCard } from './ResidentCard.jsx';
import { TemporaryResidencePermit } from './TemporaryResidencePermit.jsx';

export const Profile = ( {user, fetchProfile}) => {
    return(
        <div className="section-container">
        <Passport user={user} fetchProfile={fetchProfile}/>
        <EmploymentContract user={user} fetchProfile={fetchProfile}/>
        <ResidentCard user={user} fetchProfile={fetchProfile}/>
        <TemporaryResidencePermit user={user} fetchProfile={fetchProfile}/>
        </div>
    );
};