import { chromium } from 'playwright-chromium';
import { CardsPaths } from './constants';
import { Card, ShopPriceTuple } from './types';
import {
    getCardsUrls,
    getPricesStatsFromShopPrices,
    getShopArray,
    getText,
    getTextArray,
} from './utils';

export const getCardsPrices = async () => {
    const data: Record<string, any> = {};
    for (const [model, paths] of Object.entries(CardsPaths)) {
        const cards = await getCards(paths);
        const stats = getPricesStatsFromShopPrices(cards);

        data[model] = {
            cards,
            stats,
        };
    }
    return data;
};

export const getCards = async (cardPaths: string[]) => {
    const urls = getCardsUrls(cardPaths);
    const requests = urls.map(fetchCards);
    return await Promise.all(requests);
};

export const fetchCards = async (url: string) => {
    const browser = await chromium.launch({
        chromiumSandbox: false,
        timeout: 100000,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);

    const cardName = await getText(
        page,
        '#help_table > tbody > tr:nth-child(1) > td > div.op1-tt'
    );

    const textPrices = await getTextArray(
        page,
        '#item-wherebuy-table td.where-buy-price > a'
    );
    const prices = textPrices.map((price) =>
        price ? Number(price.replace(/\D/g, '')) : -1
    );

    const shops = await getShopArray(
        page,
        '#item-wherebuy-table td.where-buy-description > div > a'
    );

    const shopPricesArray: Array<ShopPriceTuple> = prices.map(
        (price, index) => [shops[index], price]
    );
    const shopPricesArraySorted = shopPricesArray.sort(
        ([_aShop, aPrice], [_bShop, bPrice]) => aPrice - bPrice
    );

    const cards: Card[] = shopPricesArraySorted.map(([shop, price]) => ({
        name: cardName ?? '',
        shop,
        price,
    }));

    await browser.close();

    return cards;
};
