import { chromium } from 'playwright-chromium';
import { CardsPaths } from './constants';
import { getCardsUrls, getText, getTextArray } from './utils';

export const getCardsPrices = async () => {
    const data: Record<string, any> = {};
    for (const [model, paths] of Object.entries(CardsPaths)) {
        const prices = await getCardPrices(paths);
        data[model] = prices;
    }
    return data;
};

export const getCardPrices = async (cardPaths: string[]) => {
    const urls = getCardsUrls(cardPaths);
    const requests = urls.map(fetchCardPrices);
    return await Promise.all(requests);
};

export const fetchCardPrices = async (url: string) => {
    const browser = await chromium.launch({ chromiumSandbox: false });
    const page = await browser.newPage();
    await page.goto(url);

    const cardName = await getText(
        page,
        '#help_table > tbody > tr:nth-child(1) > td > div.op1-tt'
    );

    const prices = await getTextArray(
        page,
        '#item-wherebuy-table td.where-buy-price > a'
    );
    const shops = await getTextArray(
        page,
        '#item-wherebuy-table td.where-buy-description > div > a'
    );

    const shopPrices = shops.reduce(
        (rest, shop, index) => ({ ...rest, [shop ?? '']: prices[index] }),
        {}
    );

    await browser.close();

    return {
        cardName,
        shopPrices,
    };
};
