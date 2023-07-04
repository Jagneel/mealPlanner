import React from 'react';
import Tile from './Tile';
import './dietaryPref.css';

export interface DietaryPrefProps {
    selectedAllergies: string[];
    selectedDietaryPreferences: string[];
    handleAllergySelect: (option: string) => void;
    handleDietaryPreferenceSelect: (option: string) => void;
    setDietPrefSubmitted: (selected: boolean) => void;
}

const DietaryPref = (props: DietaryPrefProps) => {
    const allergyOptions = [
        "Dairy",
        "Egg",
        "Peanut",
        "Tree nut",
        "Fish",
        "Seafood",
        "Sesame",
        "Shellfish",
        "Soy",
        "Sulfite",
        "Gluten",
        "Grain",
        "Wheat"
    ];
    const dietaryPreferenceOptions = [
        "Omnivore",
        "Vegan",
        "Vegetarian",
        "Pescatarian"
    ];

    const handleNext = () => {
        props.setDietPrefSubmitted(true);
    };

    return (
        <div className="dietary-pref">
            <h2>Select Dietary Preferences:</h2>
            <div className="tiles-container">
                {dietaryPreferenceOptions.map((option) => (
                    <Tile
                        key={option}
                        option={option}
                        selected={props.selectedDietaryPreferences.includes(option)}
                        onSelect={props.handleDietaryPreferenceSelect}
                    />
                ))}
            </div>
            <h2>Select Food Allergies:</h2>
            <div className="tiles-container">
                {allergyOptions.map((option) => (
                    <Tile
                        key={option}
                        option={option}
                        selected={props.selectedAllergies.includes(option)}
                        onSelect={props.handleAllergySelect}
                    />
                ))}
            </div>
            <button type='submit' onClick={handleNext}>Confirm dietary preferences</button>
        </div>
    );
};

export default DietaryPref;
