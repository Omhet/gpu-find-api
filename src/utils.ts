import { shopUrl } from './constants';
import { Card, ShopPriceTuple } from './types';

export const getCardsUrls = (cardsPath: string[]) => cardsPath.map(getCardUrl);

export const getCardUrl = (path: string) => `${shopUrl}/${path}`;

export const getPricesStatsFromShopPrices = (cardsArray: Card[][]) => {
    const sortedCards = cardsArray
        .flatMap((cards) => cards)
        .sort((a, b) => a.price - b.price);

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
