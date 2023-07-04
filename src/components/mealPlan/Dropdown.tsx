import React, { useState } from 'react';
import './dropdown.css'

interface DropdownProps {
    options: any[][];
    onSelect: (selectedRecipe: any[][], day: string | null, meal: string | null | undefined) => void;
    mealType: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, mealType }) => {
    const [selectedOption, setSelectedOption] = useState<any>([]);
    const recipes = options;


    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tdOption = event.target;
        const trElement = tdOption.parentNode?.parentNode?.parentNode as HTMLTableRowElement;
        let day = ''

        switch (true) {
            case trElement.textContent?.includes('Monday'):
                day = 'Monday';
                break;
            case trElement.textContent?.includes('Tuesday'):
                day = 'Tuesday';
                break;
            case trElement.textContent?.includes('Wednesday'):
                day = 'Wednesday';
                break;
            case trElement.textContent?.includes('Thursday'):
                day = 'Thursday';
                break;
            case trElement.textContent?.includes('Friday'):
                day = 'Friday';
                break;
            case trElement.textContent?.includes('Saturday'):
                day = 'Saturday';
                break;
            case trElement.textContent?.includes('Sunday'):
                day = 'Sunday';
                break;
            default:
                break;
        }

        for (let i = 0; i < recipes.length; i++) {
            if (tdOption.value === recipes[i][0]) {
                recipes[i][10] = mealType
                setSelectedOption(recipes[i])
            }
        }

        if (tdOption.value === 'no meal') {
            onSelect([], day, mealType);
            setSelectedOption('no meal')

        }

        const selectedRecipe: any[] | undefined = recipes.find(recipe => recipe[0] === tdOption.value);

        if (selectedRecipe !== undefined) {
            onSelect(selectedRecipe, day, mealType);
        }

    };

    return (
        <div>
            <select className='select-element' value={selectedOption[0]} onChange={handleSelect}>
                <option value=''>Select a recipe</option>
                {recipes.length > 0 ? (
                    recipes.map((recipe: any, index: number) => (
                        <option key={index} value={recipe[0]}>
                            {recipe[0]}
                        </option>
                    ))
                ) : (
                    <option value=''>No Recipes</option>
                )}
                <option value={['no meal']}>No Meal</option>
            </select>
            <a href={selectedOption[8]} target='_blank' rel="noreferrer"><button className='dropdown-btn'>Go To Recipe</button></a>
        </div>
    );

};

export default Dropdown;
