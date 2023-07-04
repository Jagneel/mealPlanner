import React from 'react'
import './dailyMacros.css';

interface DailyMacrosProps {
    weeklyList: any[][]
    macros: {
        carbs: number;
        protein: number;
        fat: number;
        newBmr: number;
    };
}

const DailyMacros: React.FC<DailyMacrosProps> = ({ weeklyList, macros }) => {
    // const [nutrients, setNutriesnt] = useState()

    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;



    if (weeklyList) {
        for (let i = 0; i < weeklyList.length; i++) {
            if (weeklyList[i].length > 0) {
                calories += Math.round(weeklyList[i][7].nutrients[0].amount)
                protein += Math.round(weeklyList[i][7].nutrients[8].amount)
                carbs += Math.round(weeklyList[i][7].nutrients[3].amount)
                fat += Math.round(weeklyList[i][7].nutrients[1].amount)
            } else {
                calories += 0
                protein += 0
                carbs += 0
                fat += 0
            }
        }
    }

    function difference(macro: number) {
        return Math.abs(macro - macros.newBmr);
    }
    return (
        <div>
            <table className='macros-table'>
                <tbody>
                    <tr>
                        <td>Calories</td>
                        <td className={difference(calories) <= 10 ? "near-limit" : calories < macros.newBmr ? "under-limit" : "over-limit"}>{calories} / {macros.newBmr}</td>
                    </tr>
                    <tr>
                        <td>Proteins</td>
                        <td className={difference(protein) <= 10 ? "near-limit" : protein < macros.protein ? "under-limit" : "over-limit"}>{protein} / {macros.protein}</td>
                    </tr>
                    <tr>
                        <td>Carbs</td>
                        <td className={difference(carbs) <= 10 ? "near-limit" : carbs < macros.carbs ? "under-limit" : "over-limit"}>{carbs} / {macros.carbs}</td>
                    </tr>
                    <tr>
                        <td>Fats</td>
                        <td className={difference(fat) <= 10 ? "near-limit" : fat < macros.fat ? "under-limit" : "over-limit"}>{fat} / {macros.fat}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DailyMacros
