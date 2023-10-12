import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Options } from './global.model';
import Footer from './components/Footer';
import Header from './components/Header';
import PageError from './pages/Error';
import PageGameField from './pages/GameField';
import PageHome from './pages/Home';

const App: React.FC = () => {
    const navigate = useNavigate();
    const [configDone, setConfigDone] = useState(false);
    const [options, setOptions] = useState<Options>({
        pairCount: 6,
        time: 0,
        lifes: 0,
    })

    const startGame = () => {
        navigate('/memory/game');
    }

    const onSubmitConfig = (obj: Options, configDone: boolean) => {
        setOptions(obj);
        setConfigDone(configDone);
        startGame();
    }

    return (
        <>
            <div>
                <Header />
                <Routes>
                    <Route path="/memory" element={<PageHome onSubmitConfig={onSubmitConfig}/>} />
                    <Route path="/memory/game" element={<PageGameField options={options} configDone={configDone} />} />
                    <Route path="*" element={<PageError />} />
                </Routes>
            </div>

            <Footer />
        </>
    )
}

export default App;
