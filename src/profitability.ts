import { getEthAlgo } from './algos';
import { getBtcRub } from './bitcoin';
import { CardModel, EthHashrate } from './constants';
import { Card, CardWithProfitability } from './types';

export const getCardsWithProfitability = async (
    cards: Card[],
    model: CardModel
): Promise<CardWithProfitability[]> => {
    const btcRub = await getBtcRub();
    const ethAlgo = await getEthAlgo();
    const rate = (ethAlgo.paying * btcRub) / 100;
    const profitability = Math.floor(EthHashrate[model] * rate);

    // console.log({ btcRub, ethAlgo, rate, profitability });

    return cards.map((card) => {
        const payBack = Math.floor(card.price / profitability / 30);

        return { ...card, profitability, payBack };
    });
};
