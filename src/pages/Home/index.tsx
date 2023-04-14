import React, { ChangeEvent, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { HomeConfig, Options } from '../../global.model';


const PageHome: React.FC<HomeConfig> = ({onSubmitConfig}) => {
    const [formInfo, setFormInfo] = useState<Options>({
        pairCount: 6,
        time: 0,
        lifes: 0,
        language: 'default'
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

                        {/* <Form.Group className="mb-3" controlId="formLanguage">
                            <Form.Label>English to...</Form.Label>
                            <Form.Select name="language" aria-label="Select language" onChange={changeFormInfo}>
                                <option value="default">English</option>
                                <option value="ar">Arabic</option>
                                <option value="az">Azerbaijani</option>
                                <option value="cs">Czech</option>
                                <option value="da">Danish</option>
                                <option value="de">German</option>
                                <option value="el">Greek</option>
                                <option value="eo">Esperanto</option>
                                <option value="es">Spanish</option>
                                <option value="fa">Persian</option>
                                <option value="fi">Finnish</option>
                                <option value="fr">French</option>
                                <option value="ga">Irish</option>
                                <option value="he">Hebrew</option>
                                <option value="hi">Hindi</option>
                                <option value="hu">Hungarian</option>
                                <option value="id">Indonesian</option>
                                <option value="it">Italian</option>
                                <option value="ja">Japanese</option>
                                <option value="ko">Korean</option>
                                <option value="nl">Dutch</option>
                                <option value="pl">Polish</option>
                                <option value="pt">Portuguese</option>
                                <option value="ru">Russian</option>
                                <option value="sk">Slovak</option>
                                <option value="sv">Swedish</option>
                                <option value="tr">Turkish</option>
                                <option value="uk">Ukranian</option>
                                <option value="zh">Chinese</option>
                            </Form.Select>
                        </Form.Group> */}

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