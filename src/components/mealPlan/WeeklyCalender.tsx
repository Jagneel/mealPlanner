import React, { useState } from 'react'
import DailyMacros from './DailyMacros'
import Dropdown from './Dropdown'

interface WeeklyCalendarProps {
    recipes: any[][];
    macros: {
        carbs: number;
        protein: number;
        fat: number;
        newBmr: number;
    };
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ recipes, macros }) => {
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack', 'dessert'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const [selectedRecipes, setSelectedRecipes] = useState<{ [key: string]: any[][] }>({});

    const handleRecipeSelect = (selectedRecipe: any[][], day: string | null, meal: string | null | undefined) => {
        setSelectedRecipes((prevSelectedRecipes) => {
            const updatedRecipes = { ...prevSelectedRecipes };
            console.log(updatedRecipes)
            updatedRecipes[day!] = updatedRecipes[day!] || [];
            // Remove existing recipe with the same id and meal type
            for (let i = 0; i < updatedRecipes[day!].length; i++) {
                const recipe = updatedRecipes[day!][i];
                if (recipe[10] === meal) {
                    updatedRecipes[day!].splice(i, 1);
                    break; // Exit the loop after removing the first matching recipe
                }
            }
            updatedRecipes[day!].push(selectedRecipe);
            return updatedRecipes;
        });
    };


    return (
        <div>
            <h1>Weekly Meal Plan</h1>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        {mealTypes.map((mealType) => (
                            <th key={mealType}>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</th>
                        ))}
                        <th>Macros</th>
                    </tr>
                    {days.map((day) => (
                        <tr key={day}>
                            <td className="calendar-day">{day}</td>
                            {mealTypes.map((mealType) => (
                                <td key={mealType}>
                                    <Dropdown
                                        options={recipes.filter((r) => r[9].includes(mealType))}
                                        onSelect={handleRecipeSelect}
                                        mealType={mealType}
                                    />
                                </td>
                            ))}
                            <td>
                                <DailyMacros weeklyList={selectedRecipes[day] || []} macros={macros} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WeeklyCalendar;
