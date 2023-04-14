export interface Options {
    pairCount: number;
    time: number;
    lifes: number;
    language: string;
}

export interface TimerInterface {
    time: number;
    timerIsActive: boolean;
    timeIsOver: () => void;
}

export interface LifesInterface {
    life: number;
    lifeIsOver: () => void;
}

export interface GameFieldOptions {
    options: Options;
    configDone: boolean;
}

export interface HomeConfig {
    onSubmitConfig: (obj: Options, configDone: boolean) => void;
}

export interface CardInterface {
    id: string;
    status: boolean;
    pairId: string;
    text?: string;
    selectedCard?: boolean;
    onClickCard?: (pairId: string, id: string) => void;
}

export interface SelectedCards {
    pairId: string;
    id: string;
}