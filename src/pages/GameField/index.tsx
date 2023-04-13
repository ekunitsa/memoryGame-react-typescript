import React from 'react'
import { useEffect, useState } from "react"

import { CardInterface, GameFieldOptions, Options, SelectedCards } from "../../global.model"

import randomWords from 'random-words'
import arrayShuffle from 'array-shuffle'
import { Row, Container, Col } from "react-bootstrap"
import { v4 as uuidv4 } from 'uuid'

import OneCard from "../../components/OneCard"
import { useNavigate } from 'react-router-dom'
import Timer from '../../components/Timer'

const pushToArray = (arr: object[], id: string, pairId: string, text: string, status: boolean ) => arr.push({id, pairId, text, status})

const PageGameField: React.FC<GameFieldOptions> = ({options, configDone}) => {
    const navigate = useNavigate()
    const [cards, setCards] = useState<CardInterface[] | null>(null)
    const [selectedCards, setSelectedCards] = useState<SelectedCards[] | []>([])
    const [gameStatus, setGameStatus] = useState<boolean>(true)
    const [gameOver, setGameOver] = useState<boolean>(false)

    const restartGame = () =>{
        setCards(null)
        setSelectedCards([])
        navigate('/')
    }

    // generate pairs and field
    useEffect(() => {
        if (!configDone) {
            // check that the user bypassed the settings and went directly into the game
            navigate('/')
        }
        if (cards === null) {
            const generateCards = (options: Options) => {
                const arrayOfCards: CardInterface[] = []
                const wordArray = randomWords(options.pairCount)

                for(let i = 0; i < options.pairCount; i++) {
                    const pairId = uuidv4()
                    const pairWord = wordArray[i];

                    pushToArray(arrayOfCards, uuidv4(), pairId, pairWord, false)
                    pushToArray(arrayOfCards, uuidv4(), pairId, pairWord, false)
                }

                return arrayShuffle(arrayOfCards);
            }

            setCards(generateCards(options));
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (selectedCards.length === 2) {
                if (selectedCards[0].pairId === selectedCards[1].pairId) {
                    setCards(prevState => prevState!.map(item => item.pairId === selectedCards[0].pairId ? {...item, status: true} : item))
                }

                setSelectedCards([])
            }
        }, 500)
    }, [selectedCards])

    useEffect(() => {
        if (cards !== null) setGameStatus(!cards.every(item => item.status === true))
    }, [cards])


    const gameIsOver = () => {
        setGameStatus(false)
        setGameOver(true)
    }

    const onClickCard = (pairId:string, id: string) => {
        if (selectedCards.some(item => item.id === id) || selectedCards.length === 2) {
            return;
        }

        setSelectedCards(prevState => [...prevState, {pairId, id}])
    }

    return (
        <Container className="mb-4">
            <Row className="gy-4 mb-4">
                <Col sm={6}>
                    {options.time > 0 && (<Timer time={options.time} timerIsActive={gameStatus} timeIsOver={gameIsOver} />)}
                </Col>
                <Col sm={6} className="text-end">
                    Lifes
                </Col>
            </Row>

            {cards === null && (
                <Container className="mb-4">
                    <Row className="py-4 text-center">
                        <Col>Loading...</Col>
                    </Row>
                </Container>
            )}

            {cards !== null && gameStatus && (
                <Row className="gy-4">
                    {cards.map(item =>
                        (
                            <Col sm={3} key={uuidv4()}>
                                <OneCard
                                    id={item.id}
                                    status={item.status}
                                    text={item.text}
                                    pairId={item.pairId}
                                    selectedCard={selectedCards.some(sel => sel.id === item.id)}
                                    onClickCard={(pairId: string, id: string) => onClickCard(pairId, id)}
                                />
                            </Col>
                        )
                    )}
                </Row>
            )}

            {cards !== null && !gameStatus && (
                <Container className="mb-4">
                    <Row className="py-4 text-center">
                        <Col>
                            <h1>{!gameOver ? `You win!` : `You have lost!`}</h1>
                            <button className="btn btn-primary btn-restart" type="button" onClick={restartGame}>
                                Restart
                            </button>
                        </Col>
                    </Row>
                </Container>
            )}
        </Container>
    )
}

export default PageGameField;