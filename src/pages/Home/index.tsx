import React, { ChangeEvent, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { HomeConfig, Options } from '../../global.model';

const PageHome: React.FC<HomeConfig> = ({onSubmitConfig}) => {
    const [formInfo, setFormInfo] = useState<Options>({
        pairCount: 6,
        time: 0,
        lifes: 0,
    })

    const changeFormInfo = (e: ChangeEvent<HTMLElement>) => {
        const name = (e.target as HTMLInputElement).name;
        const value = (e.target as HTMLInputElement).value;

        setFormInfo(prevState => {
            return {
                ...prevState,
                [name]: isNaN(Number(value)) ? value : Number(value)
            }
        })
    }

    const inputValidation = (value: number, min: number, max: number) => {
        return value >= min && value <=max
    }

    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            inputValidation(Number(formInfo.pairCount), 1, 50) &&
            inputValidation(Number(formInfo.lifes), 0, 50) &&
            inputValidation(Number(formInfo.time), 0, 9999)
        ) {
            onSubmitConfig(formInfo, true);
        } else {
            alert('Check the parameters')
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Game configuration</h1>
                    <Form className="form" onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formPairs">
                            <Form.Label>Pairs</Form.Label>
                            <Form.Control type="number" name="pairCount" placeholder="Enter the number of pairs of cards" value={formInfo.pairCount} min="1" max="50" onChange={changeFormInfo} required />
                            <Form.Text className="text-muted">min - 1; max - 50</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTime">
                            <Form.Label>Time (seconds)</Form.Label>
                            <Form.Control type="number" name="time" placeholder="Enter game time" value={formInfo.time} min="0" max="9999" onChange={changeFormInfo} required />
                            <Form.Text className="text-muted">0 is endlessly. min - 1; max - 9999</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formLifes">
                            <Form.Label>Lifes</Form.Label>
                            <Form.Control type="number" name="lifes" placeholder="Enter game lifes" value={formInfo.lifes} min="0" max="50" onChange={changeFormInfo} required />
                            <Form.Text className="text-muted">0 is endlessly. min - 1; max - 50</Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Start game
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default PageHome;
