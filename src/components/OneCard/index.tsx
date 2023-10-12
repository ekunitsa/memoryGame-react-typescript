import React from 'react';
import { Card } from 'react-bootstrap';
import { CardInterface } from '../../global.model';

const OneCard: React.FC<CardInterface> = ({id, status, pairId, text, onClickCard, selectedCard}) => {
    const baseClasses = 'p-3 text-center h-100 justify-content-center text-nowrap custom-cards';

    const onClick = (pairId: string, id: string) => {
        if (id && onClickCard !== undefined && !status) {
            onClickCard(pairId, id);
        }
    }

    if (status) {
        return (
            <Card text="success" className={baseClasses}>
                <Card.Title>◕‿◕</Card.Title>
            </Card>
        )
    }

    return (
        <Card text="primary" className={baseClasses} onClick={() => onClick(pairId, id)}>
            <Card.Title>{selectedCard ? text : '◕‿◕'}</Card.Title>
        </Card>
    )
}

export default OneCard;
