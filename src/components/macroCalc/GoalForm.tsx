import React, { useState } from 'react';
import UserProfile from '../userProfile/UserProfile';
import '../userProfile/userProfile.css'
import './macros.css';

interface GoalFormProps {
    biometrics: UserProfile | null;
    onGoalSave: (goal: UserGoals) => void;
}

export interface UserGoals {
    goal: string;
    bmr: number;
}

const GoalForm: React.FC<GoalFormProps> = ({ biometrics, onGoalSave }) => {
    const [goal, setGoal] = useState<UserGoals>({
        goal: '',
        bmr: 0,
    });

    // Calculate BMR and activity level
    if (biometrics?.gender === 'female') {
        goal.bmr = Math.round(
            655.1 +
            9.563 * biometrics.weight +
            1.85 * biometrics.height -
            4.676 * biometrics.age
        );
    } else if (biometrics?.gender === 'male') {
        goal.bmr = Math.round(
            66.47 +
            13.75 * biometrics.weight +
            5.003 * biometrics.height -
            6.755 * biometrics.age
        );
    } else {
        return <h1>Please select a gender</h1>;
    }

    // Apply activity level
    if (biometrics.activityLevel === '1') {
        goal.bmr *= 1.2;
    } else if (biometrics.activityLevel === '2') {
        goal.bmr *= 1.375;
    } else if (biometrics.activityLevel === '3') {
        goal.bmr *= 1.55;
    } else if (biometrics.activityLevel === '4') {
        goal.bmr *= 1.725;
    } else {
        goal.bmr *= 1.9;
    }

    goal.bmr = Math.round(goal.bmr)


    const handleGoalForm = (event: React.FormEvent) => {
        event.preventDefault();
        onGoalSave(goal);
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setGoal(prevGoal => ({
            ...prevGoal,
            [name]: value,
        }));
    };
    return (
        <div className='container'>
            <div className="bmr">
                <h2>Hello {biometrics?.firstName}, your basal metabolic rate is:</h2>
                <h3>{goal.bmr} calories</h3>
                <h4>
                    You need to consume this many calories to maintain your current weight of {biometrics?.weight} kgs.
                 </h4>
            </div>
            <div className="personal-goals">
                <h2>What are your fitness goals?</h2>
                <form onSubmit={handleGoalForm}>
                    <select
                        required
                        id="goal"
                        name="goal"
                        value={goal.goal}
                        onChange={handleSelectChange}
                    >
                        <option value="">Select</option>
                        <option value="1">Lose Fat</option>
                        <option value="2">Gain Muscle</option>
                        <option value="3">Body Recomposition (Lose fat whilst gaining muscle)</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default GoalForm;
