import React, { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import UserProfile from './components/userProfile/UserProfile';
import GoalForm, { UserGoals } from './components/macroCalc/GoalForm';
import MacroCalc, { UserMacros } from './components/macroCalc/MacroCalc';
import DietaryPref from './components/dietaryPref/DietaryPref';
import RecipeList from './components/recipleList/RecipeList';
import MealPlan from './components/mealPlan/MealPlan';


const App = () => {
  const [biometricsEntered, setBiometricsEntered] = useState(false);
  const [goalsEntered, setGoalsEntered] = useState(false);
  const [savedBiometrics, setSavedBiometrics] = useState<UserProfile | null>(null);
  const [savedGoals, setSavedGoals] = useState<UserGoals>({
    goal: '',
    bmr: 0
  });
  const [macros, setMacros] = useState<UserMacros>({
    carbs: 0,
    protein: 0,
    fat: 0,
    newBmr: 0,
  });
  const [selectedRecipes, setSelectedRecipes] = useState<any[]>([]);
  const [dietaryPreferencesSelected, setDietaryPreferencesSelected] = useState(false);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState<string[]>([]);
  const [dietPrefSubmitted, setDietPrefSubmitted] = useState(false)
  const [recipesSelected, setRecipesSelected] = useState(false);


  // Handler functions

  const handleBiometricsSave = (profile: UserProfile) => {
    setSavedBiometrics(profile);
    setBiometricsEntered(true);
  };

  const handleGoalSave = (goal: UserGoals) => {
    setSavedGoals(goal);
    setGoalsEntered(true);
  };

  const handleSetMacros = (selectedMacros: UserMacros) => {
    setMacros(selectedMacros);
  };

  const handleAllergySelect = (option: string) => {
    setSelectedAllergies((selectedAllergies) => {
      if (selectedAllergies.includes(option)) {
        return selectedAllergies.filter((allergy) => allergy !== option);
      } else {
        return [...selectedAllergies, option];
      }
    });
  };

  const handleDietaryPreferenceSelect = (option: string) => {
    if (selectedDietaryPreferences.includes(option)) {
      setSelectedDietaryPreferences([])
    } else {
      setSelectedDietaryPreferences([option]);
    }
  };

  const handleGoBack = () => {
    if (biometricsEntered &&
      !goalsEntered &&
      !dietaryPreferencesSelected &&
      !dietPrefSubmitted) {
      setBiometricsEntered(false)
    } else if (goalsEntered &&
      !dietaryPreferencesSelected &&
      !dietPrefSubmitted) {
      setGoalsEntered(false)
    } else if (dietaryPreferencesSelected &&
      !dietPrefSubmitted) {
      setDietPrefSubmitted(false)
      setDietaryPreferencesSelected(false)
    } else if (dietPrefSubmitted &&
      !recipesSelected) {
      setDietPrefSubmitted(false)
    } else if (recipesSelected) {
      setRecipesSelected(false)
    }
  }

  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        {biometricsEntered &&
          !goalsEntered &&
          !dietaryPreferencesSelected &&
          !dietPrefSubmitted ? (
          <GoalForm biometrics={savedBiometrics!} onGoalSave={handleGoalSave} />
        ) : goalsEntered &&
          !dietaryPreferencesSelected &&
          !dietPrefSubmitted ? (
          <MacroCalc
            goals={savedGoals!}
            biometrics={savedBiometrics!}
            setMacros={handleSetMacros}
            setDietaryPreferencesSelected={setDietaryPreferencesSelected}
          />
        ) : dietaryPreferencesSelected &&
          !dietPrefSubmitted ? (
          <DietaryPref
            selectedAllergies={selectedAllergies}
            selectedDietaryPreferences={selectedDietaryPreferences}
            handleAllergySelect={handleAllergySelect}
            handleDietaryPreferenceSelect={handleDietaryPreferenceSelect}
            setDietPrefSubmitted={setDietPrefSubmitted}
          />
        ) : dietPrefSubmitted &&
          !recipesSelected ? (
          <RecipeList
            dietaryPreferences={selectedDietaryPreferences}
            allergies={selectedAllergies} macros={macros}
            goals={savedGoals}
            setRecipesSelected={setRecipesSelected}
            setSelectedRecipes={setSelectedRecipes}
          />
        ) : recipesSelected ? (
          <MealPlan
            selectedRecipes={selectedRecipes}
            macros={macros}
          />
        ) : (
          <UserProfile onSave={handleBiometricsSave} />
        )
        }

        <button onClick={handleGoBack}>Go Back</button>
      </main>
    </div>
  );
};

export default App;
