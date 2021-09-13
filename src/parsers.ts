import { Browser, chromium } from 'playwright-chromium';
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
    const browser = await chromium.launch({
        chromiumSandbox: false,
        timeout: 100000,
    });

    const data: Record<string, any> = {};
    for (const [model, paths] of Object.entries(CardsPaths)) {
        const cards = await getCards(paths, browser);
        const stats = getPricesStatsFromShopPrices(cards);

        data[model] = {
            cards,
            stats,
        };
    }

    await browser.close();

    return data;
};

export const getCards = async (cardPaths: string[], browser: Browser) => {
    const urls = getCardsUrls(cardPaths);
    const requests = urls.map((url) => fetchCards(url, browser));
    const data = await Promise.all(requests);

    return data;
};

export const fetchCards = async (url: string, browser: Browser) => {
    const page = await browser.newPage();
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

    return cards;
};
