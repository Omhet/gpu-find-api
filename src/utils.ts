import {
    AcceptableMhPrice,
    CardModel,
    EthHashrate,
    shopUrl,
} from './constants';
import { Card, CardWithExtraStats, ShopPriceTuple } from './types';

export const getCardsUrls = (cardsPath: string[]) => cardsPath.map(getCardUrl);

export const getCardUrl = (path: string) => `${shopUrl}/${path}`;

export const getPriceStatsFromShopPrices = (cardsArray: Card[]) => {
    const sortedCards = cardsArray.sort((a, b) => a.price - b.price);

    const min = sortedCards[0];
    const max = sortedCards[sortedCards.length - 1];
    const med = sortedCards[Math.floor(sortedCards.length / 2)];

    return {
        min,
        med,
        max,
    };
};

export const getSortedShopPricesArray = (shopPricesArray: ShopPriceTuple[]) =>
    shopPricesArray.sort(
        ([_aShop, aPrice], [_bShop, bPrice]) => aPrice - bPrice
    );

export const getCardsWithExtraStats = (
    cards: Card[],
    model: CardModel
): CardWithExtraStats[] => {
    return cards.map((card) => {
        const mhPrice = getMhPrice(EthHashrate[model], card.price);
        const isAcceptablePrice = mhPrice <= AcceptableMhPrice;

        return {
            ...card,
            mhPrice,
            isAcceptablePrice,
        };
    });
};

const getMhPrice = (hashrate: number, price: number) =>
    Math.floor(price / hashrate);

export const wait = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));
