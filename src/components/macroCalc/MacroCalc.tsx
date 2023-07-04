import React, { useState, useEffect } from 'react';
import UserProfile from '../userProfile/UserProfile';
import { UserGoals } from '../macroCalc/GoalForm';
import './macros.css'

export interface UserMacros {
    carbs: number;
    protein: number;
    fat: number;
    newBmr: number;
}

interface MacroCalcProps {
    goals: UserGoals;
    biometrics: UserProfile | null;
    setDietaryPreferencesSelected: (selected: boolean) => void;
    setMacros: (selectedMacros: UserMacros) => void;
}

const MacroCalc: React.FC<MacroCalcProps> = ({
    goals,
    biometrics,
    setDietaryPreferencesSelected,
    setMacros
}) => {
    const [handleMacros, setHandleMacros] = useState<UserMacros>({
        carbs: 0,
        protein: 0,
        fat: 0,
        newBmr: 0
    });

    useEffect(() => {
        if (goals.goal === '1') {
            console.log(goals.bmr)
            const protein = Math.round((biometrics?.weight ?? 0) * 2.5);
            const newBmr = Math.round(goals.bmr - goals.bmr * 0.2);
            console.log(newBmr)
            const updatedBmr = newBmr - protein * 4;
            const updatedMacros = {
                carbs: Math.round((updatedBmr * 0.7) / 4),
                protein,
                fat: Math.round((updatedBmr * 0.3) / 9),
                newBmr,
            };
            setMacros(updatedMacros);
            setHandleMacros(updatedMacros);
        } else if (goals.goal === '2') {
            const protein = Math.round((biometrics?.weight ?? 0) * 2.5);
            const newBmr = Math.round(goals.bmr + goals.bmr * 0.1);
            const updatedBmr = newBmr - protein * 4;
            const updatedMacros = {
                carbs: Math.round((updatedBmr * 0.7) / 4),
                protein,
                fat: Math.round((updatedBmr * 0.3) / 9),
                newBmr,
            };
            setMacros(updatedMacros);
            setHandleMacros(updatedMacros);
        } else if (goals.goal === '3') {
            const protein = Math.round((biometrics?.weight ?? 0) * 2.5);
            const newBmr = Math.round(goals.bmr + goals.bmr * 0.05);
            const updatedBmr = newBmr - protein * 4;
            const updatedMacros = {
                carbs: Math.round((updatedBmr * 0.7) / 4),
                protein,
                fat: Math.round((updatedBmr * 0.3) / 9),
                newBmr,
            };
            setMacros(updatedMacros);
            setHandleMacros(updatedMacros);
        }
    }, [goals, biometrics, setMacros]);

    const handleNext = () => {
        setDietaryPreferencesSelected(true);
    };

    return (
        <div className='container'>
            <h3>Your new daily caloric intake is: </h3>
            <h2>{handleMacros.newBmr}</h2>
            <h3>Your macros are:</h3>
            <h3>Carbohydrates: {handleMacros.carbs}g</h3>
            <h3>Protein: {handleMacros.protein}g</h3>
            <h3>Fats: {handleMacros.fat}g</h3>
            <button type='button' onClick={handleNext}>Select Dietry Prefrences</button>
        </div>
    );
};

export default MacroCalc;
