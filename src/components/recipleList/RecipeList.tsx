import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../api/api';
import { UserGoals } from '../macroCalc/GoalForm';
import { RecipeDetailProps } from './RecipeDetail';
import './recipeList.css';
import jsonData from '../data/data.json';
import TestCarousel from './TestCarousel';


interface RecipeListProps {
    dietaryPreferences: string[];
    allergies: string[];
    macros: {
        carbs: number;
        protein: number;
        fat: number;
        newBmr: number;
    };
    goals: UserGoals;
    setRecipesSelected: (selected: boolean) => void;
    setSelectedRecipes: (recipe: any) => any
}

const RecipeList: React.FC<RecipeListProps> = ({
    dietaryPreferences,
    allergies,
    goals,
    setRecipesSelected,
    setSelectedRecipes,
}) => {
    const [breakfastRecipes, setBreakfastRecipes] = useState<RecipeDetailProps[]>([]);
    const [sideDishRecipes, setSideDishRecipes] = useState<RecipeDetailProps[]>([]);
    const [mainCourseRecipes, setMainCourseRecipes] = useState<RecipeDetailProps[]>([]);
    const [snackRecipes, setSnackRecipes] = useState<RecipeDetailProps[]>([]);
    const [dessertRecipes, setDessertRecipes] = useState<RecipeDetailProps[]>([]);
    // const [data, setData] = useState<RecipeDetailProps[]>([]);

    const addToMealPlan = (recipe: any) => {
        setSelectedRecipes((prevRecipes: any) => [...prevRecipes, recipe]);
    }

    const removeFromMealPlan = (recipeId: string) => {
        setSelectedRecipes((prevRecipes: any) =>
            prevRecipes.filter((recipe: any) => recipe[0] !== recipeId)
        );
    }

    useEffect(() => {
        let breakfastMinProtein = '0';
        let sideDishMinProtein = '0';
        let mainCourseMinProtein = '0';
        let snackMinProtein = '0';
        let dessertMinProtein = '0';

        if (goals.goal === '1') {
            breakfastMinProtein = '25';
            sideDishMinProtein = '20';
            mainCourseMinProtein = '30';
            snackMinProtein = '10';
            dessertMinProtein = '15';
        } else if (goals.goal === '2') {
            breakfastMinProtein = '25';
            sideDishMinProtein = '20';
            mainCourseMinProtein = '50';
            snackMinProtein = '30';
            dessertMinProtein = '15'
        } else if (goals.goal === '3') {
            breakfastMinProtein = '25';
            sideDishMinProtein = '20';
            mainCourseMinProtein = '50';
            snackMinProtein = '20';
            dessertMinProtein = '15'
        }


        // const fetchData = async () => {
        //     try {
        //         // Fetching data from JSON file
        //         setData(jsonData as RecipeDetailProps[]);
        //         console.log(jsonData)
        //     } catch (error) {
        //         console.log('Error fetching data', error);
        //     }
        // };

        const getBreakfastRecipes = async () => {
            try {
                // Fetching breakfast recipes based on preferences
                const fetchedBreakfastRecipes = await fetchRecipes(dietaryPreferences, allergies, breakfastMinProtein, 'breakfast');
                // fetchData()
                // console.log(fetchedBreakfastRecipes)
                setBreakfastRecipes(fetchedBreakfastRecipes.results);
                // setBreakfastRecipes(data);

            } catch (error) {
                console.log('Failed to fetch recipes');
            }
        };

        const getSideDishRecipes = async () => {
            try {
                // Fetching lunch recipes based on preferences
                const fetchedSideDishRecipes = await fetchRecipes(dietaryPreferences, allergies, sideDishMinProtein, 'side dish');
                setSideDishRecipes(fetchedSideDishRecipes.results);
            } catch (error) {
                console.log('Failed to fetch recipes');
            }
        };

        const getMainCourseRecipes = async () => {
            try {
                // Fetching dinner recipes based on preferences
                const fetchedMainCourseRecipes = await fetchRecipes(dietaryPreferences, allergies, mainCourseMinProtein, 'main course');
                setMainCourseRecipes(fetchedMainCourseRecipes.results);
            } catch (error) {
                console.log('Failed to fetch recipes');
            }
        };

        const getSnackRecipes = async () => {
            try {
                // Fetching dinner recipes based on preferences
                const fetchedSnackRecipes = await fetchRecipes(dietaryPreferences, allergies, snackMinProtein, 'snack');
                setSnackRecipes(fetchedSnackRecipes.results);
            } catch (error) {
                console.log('Failed to fetch recipes');
            }
        };

        const getDessertRecipes = async () => {
            try {
                // Fetching dinner recipes based on preferences
                const fetchedDessertRecipes = await fetchRecipes(dietaryPreferences, allergies, dessertMinProtein, 'dessert');
                setDessertRecipes(fetchedDessertRecipes.results);
            } catch (error) {
                console.log('Failed to fetch recipes');
            }
        };


        getBreakfastRecipes();
        getSideDishRecipes();
        getMainCourseRecipes();
        getSnackRecipes();
        getDessertRecipes();
    }, [allergies, dietaryPreferences, goals]);

    const handleClick = () => {
        setRecipesSelected(true)
    }

    return (
        <div className="recipes-container">
            <div className="carousel-recipes-container">
                <h2>Breakfast</h2>
                {breakfastRecipes.length > 0 ? (
                    <TestCarousel
                        slides={breakfastRecipes}
                        addToMealPlan={addToMealPlan}
                        removeFromMealPlan={removeFromMealPlan}
                    />
                ) : (
                    <p>No recipes available</p>
                )}
            </div>
            <div className="carousel-recipes-container">
                <h2>Side Dishes</h2>
                {sideDishRecipes.length > 0 ? (
                    <TestCarousel slides={sideDishRecipes}
                        addToMealPlan={addToMealPlan}
                        removeFromMealPlan={removeFromMealPlan} />
                ) : (
                    <p>No recipes available</p>
                )}
            </div>
            <div className="carousel-recipes-container">
                <h2>Main Course</h2>
                {mainCourseRecipes.length > 0 ? (
                    <TestCarousel slides={mainCourseRecipes}
                        addToMealPlan={addToMealPlan}
                        removeFromMealPlan={removeFromMealPlan} />
                ) : (
                    <p>No recipes available</p>
                )}
            </div>
            <div className="carousel-recipes-container">
                <h2>Snacks</h2>
                {snackRecipes.length > 0 ? (
                    <TestCarousel slides={snackRecipes}
                        addToMealPlan={addToMealPlan}
                        removeFromMealPlan={removeFromMealPlan} />
                ) : (
                    <p>No recipes available</p>
                )}
            </div>
            <div className="carousel-recipes-container">
                <h2>Desserts</h2>
                {dessertRecipes.length > 0 ? (
                    <TestCarousel slides={dessertRecipes}
                        addToMealPlan={addToMealPlan}
                        removeFromMealPlan={removeFromMealPlan} />
                ) : (
                    <p>No recipes available</p>
                )}
            </div>
            <button className='next-btn' onClick={handleClick}>Go To Your Meal Planner</button>
        </div>
    );
};

export default RecipeList;


// const fetchedBreakfastRecipes = await fetchRecipes(dietaryPreferences, allergies, breakfastMinProtein, 'breakfast');