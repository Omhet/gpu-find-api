import { Page } from 'playwright-chromium';
import { shopUrl } from './constants';
import { Card, ShopPriceTuple } from './types';

export const getText = (page: Page, selector: string) => {
    return page.$eval(selector, (el) => el.textContent?.trim());
};

export const getTextArray = (page: Page, selector: string) => {
    return page.$$eval(selector, (els) =>
        els.map((el) => el.textContent?.trim())
    );
};

export const getShopArray = (page: Page, selector: string) => {
    return page.$$eval(selector, (els) =>
        els.map((el) => ({
            name: el.textContent?.trim() ?? '',
            link:
                (String(el.onmouseover).match(/this\.href="([^"]+)/) ??
                    [])[1] ?? '',
        }))
    );
};

export const getCardsUrls = (cardsPath: string[]) =>
    cardsPath.map((path) => `${shopUrl}/${path}`);

export const getPricesStatsFromShopPrices = (cards: Card[][]) => {
    const sortedCards = cards
        .flatMap((card) => card)
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
