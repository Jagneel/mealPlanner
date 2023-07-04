import React, { useState } from 'react';
import './recipseDetail.css'

export interface RecipeDetailProps {
    title: string;
    diet?: string;
    dishTypes?: any[];
    image?: string;
    nutrition?: any;
    ingredients?: string[];
    sourceUrl?: string;
    vegan?: boolean;
    vegetarian?: boolean;
    glutenFree?: boolean;
    dairyFree?: boolean;
    readyInMinutes?: number;
    addToMealPlan?: (recipe: any) => void;
    removeFromMealPlan?: (recipe: any) => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({
    title,
    readyInMinutes,
    vegetarian,
    glutenFree,
    dairyFree,
    vegan,
    image,
    nutrition,
    sourceUrl,
    dishTypes,
    addToMealPlan,
    removeFromMealPlan
}) => {
    const ifVegetarian = vegetarian ? 'circle-green' : 'circle-red'
    const ifGlutenFree = glutenFree ? 'circle-green' : 'circle-red'
    const ifDairyFree = dairyFree ? 'circle-green' : 'circle-red'
    const ifVegan = vegan ? 'circle-green' : 'circle-red'
    const [isFlipped, setIsFlipped] = useState(false);
    const [clicked, setClicked] = useState(false)

    const handleAddToMealPlan = () => {
        if (addToMealPlan) {
            addToMealPlan([title, readyInMinutes, vegetarian, glutenFree, dairyFree, vegan, image, nutrition, sourceUrl, dishTypes]);
        }
        setClicked(true)
    };

    const handleRemoveFromMealPlan = () => {
        if (removeFromMealPlan) {
            removeFromMealPlan(title);
        }
        setClicked(false);
    };

    return (
        <div
            className={`recipe-card ${isFlipped ? 'flipped' : ''}`}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div className='recipe-container'>
                {clicked && <div className="top-banner">
                </div>}
                <div className="front">
                    <div className="recipe-info">
                        <div className="recipe-header">
                            <h4>{title}</h4>
                            <h5>READY IN: {readyInMinutes}</h5>
                        </div>
                        <div className="recipe-prefrences">
                            <div className="recipe-pref">
                                <h5>Vegetarian</h5>
                                <div className={ifVegetarian}></div>
                            </div>
                            <div className="recipe-pref">
                                <h5>Vegan</h5>
                                <div className={ifGlutenFree}></div>
                            </div>
                            <div className="recipe-pref">
                                <h5>Gluten Free</h5>
                                <div className={ifDairyFree}></div>
                            </div>
                            <div className="recipe-pref">
                                <h5>Dairy Free</h5>
                                <div className={ifVegan}></div>
                            </div>
                        </div>
                    </div>
                    <div className="recipe-image">
                        <img src={image} alt='recipe image' />
                    </div>
                </div>
                <div className="back">
                    <div className="recipe-info">
                        <div className="recipe-header-back">
                            <h4>{title}</h4>
                        </div>
                        <div className="recipe-macros">
                            <h5>Calories: {nutrition?.nutrients[0].amount}kcal</h5>
                            <h5>Carbs: {nutrition?.nutrients[3].amount}g</h5>
                            <h5>Fat: {nutrition?.nutrients[1].amount}g</h5>
                            <h5>Protein: {nutrition?.nutrients[8].amount}g</h5>
                        </div>
                        <div className="recipe-link">
                            <a href={sourceUrl} target='_blank' rel="noreferrer">
                                <button>Go To Recipe</button>
                            </a>

                            {clicked ? (
                                <button id='remove-recipe' onClick={handleRemoveFromMealPlan}>Remove from Meal Plan</button>
                            ) : <button onClick={handleAddToMealPlan}>Add to Meal Plan</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
