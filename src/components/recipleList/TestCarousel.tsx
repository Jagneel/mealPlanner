import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RecipeDetail, { RecipeDetailProps } from './RecipeDetail';


interface CarouselProps {
    slides: RecipeDetailProps[];
    addToMealPlan?: (recipe: any) => void;
    removeFromMealPlan?: (recipe: any) => void;
}

export const TestCarousel: React.FC<CarouselProps> = (props) => {
    const { slides } = props;

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <div className='carousel'>
            <Carousel responsive={responsive}>
                {slides.map((slide) => (
                    <RecipeDetail
                        key={slide.title}
                        title={slide.title}
                        diet={slide.diet}
                        dishTypes={slide.dishTypes}
                        image={slide.image}
                        nutrition={slide.nutrition}
                        ingredients={slide.ingredients}
                        sourceUrl={slide.sourceUrl}
                        vegan={slide.vegan}
                        vegetarian={slide.vegetarian}
                        glutenFree={slide.glutenFree}
                        dairyFree={slide.dairyFree}
                        readyInMinutes={slide.readyInMinutes}
                        addToMealPlan={props.addToMealPlan}
                        removeFromMealPlan={props.removeFromMealPlan}
                    />
                ))}
            </Carousel>
        </div>
    );
}


export default TestCarousel
