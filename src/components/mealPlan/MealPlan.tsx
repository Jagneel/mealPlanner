import React from 'react';
import './mealPlan.css';
import WeeklyCalender from './WeeklyCalender';
import './weeklyCalender.css'

interface MealPlanProps {
    selectedRecipes: any[][];
    macros: {
        carbs: number;
        protein: number;
        fat: number;
        newBmr: number;
    };
}

const MealPlan: React.FC<MealPlanProps> = ({ selectedRecipes, macros }) => {

    return (
        <div className='meal-plan-main'>
            <WeeklyCalender recipes={selectedRecipes} macros={macros} />
        </div>
    );
};

export default MealPlan;
