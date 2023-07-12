import React, { useState } from 'react'
import './userProfile.css'

interface UserProfileProps {
    onSave: (profile: UserProfile) => void;
}

interface UserProfile {
    firstName: string;
    lastName: string;
    age: number;
    weight: number;
    height: number;
    gender: string;
    activityLevel: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ onSave }) => {
    const [profile, setProfile] = useState<UserProfile>({
        firstName: '',
        lastName: '',
        age: 0,
        weight: 0,
        height: 0,
        gender: 'male',
        activityLevel: '3'
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value,
        }));
    };


    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value,
        }));
    };


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave(profile); // Call the onSave prop and pass the biometric data
    };




    return (
        <div className="user-profile-container">
            <h2>Create Profile</h2>
            <form className="user-profile-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name: </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name: </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="age">Age: </label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={profile.age}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="weight">Weight (kg): </label>
                    <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={profile.weight}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="height">Height (cm):</label>
                    <input
                        type="number"
                        id="height"
                        name="height"
                        value={profile.height}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender: </label>
                    <select
                        id="gender"
                        name="gender"
                        value={profile.gender}
                        onChange={handleSelectChange}
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <div className='activityLevelForm'>
                        <label htmlFor="activityLevel">Activity Level: </label>
                        <select
                            id="activityLevel"
                            name="activityLevel"
                            value={profile.activityLevel}
                            onChange={handleSelectChange}
                        >
                            <option value="">Select</option>
                            <option value="1">Very Light: Almost no activity at all.</option>
                            <option value="2">Light: Example, walking, non-strenuous cycling or gardening approximately once a week.</option>
                            <option value="3">Moderate: Regular activity at least once a week, e.g., walking, bicycling, or gardening or walking to work 10–30 min day.</option>
                            <option value="4">Active: Regular activities more than once a week, e.g., intense walking or bicycling or sports.</option>
                            <option value="5">Very Active: Strenuous activities several times a week.</option>
                        </select>
                    </div>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default UserProfile
