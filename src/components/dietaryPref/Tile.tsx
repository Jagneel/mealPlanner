import React from 'react'
import './dietaryPref.css'

interface TileProps {
    option: string;
    selected: boolean;
    onSelect: (option: string) => void;
}

const Tile: React.FC<TileProps> = ({ option, selected, onSelect }) => {
    const handleClick = () => {
        // if (option == 'Omnivore') {
        //     option = ''
        // }
        if (selected) {
            onSelect(option);
        } else {
            onSelect(option);
        }
    };

    return (
        <div
            className={`tile ${selected ? 'selected' : ''}`}
            onClick={handleClick}
        >
            {option}
        </div>
    );
};


export default Tile
