import React from 'react';
import { LifesInterface } from '../../global.model';

const Lifes: React.FC<LifesInterface> = ({life}) => {
    const OneLife = () => <span>&#10084;</span>

    return (
        <div className="lifes">
            Lifes: {life === 0 ? 0 : [...Array(life).fill(<OneLife />)].map((life, index) => <span key={index}>{life}</span>)}
        </div>
    )
}

export default Lifes;
