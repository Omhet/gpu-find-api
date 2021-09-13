import { Page } from 'playwright-chromium';
import { shopUrl } from './constants';
import { ShopPrices, ShopPriceTuple } from './types';

export const getText = (page: Page, selector: string) => {
    return page.$eval(selector, (el) => el.textContent?.trim());
};

export const getTextArray = (page: Page, selector: string) => {
    return page.$$eval(selector, (els) =>
        els.map((el) => el.textContent?.trim())
    );
};

export const getCardsUrls = (cardsPath: string[]) =>
    cardsPath.map((path) => `${shopUrl}/${path}`);

export const getPricesStatsFromShopPrices = (allShopPrices: ShopPrices[]) => {
    const shopPricesArray = allShopPrices.flatMap((shopPrices) =>
        Object.entries(shopPrices)
    );
    const sortedShopPricesArray = getSortedShopPricesArray(shopPricesArray);

    const min = getShopPriceFromTuple(sortedShopPricesArray[0]);
    const max = getShopPriceFromTuple(
        sortedShopPricesArray[sortedShopPricesArray.length - 1]
    );
    const med = getShopPriceFromTuple(
        sortedShopPricesArray[Math.floor(sortedShopPricesArray.length / 2)]
    );

    return {
        min,
        med,
        max,
    };
};

const getShopPriceFromTuple = ([shop, price]: [string, number]) => ({
    [shop]: price,
});

export const getSortedShopPricesArray = (shopPricesArray: ShopPriceTuple[]) =>
    shopPricesArray.sort(
        ([_aShop, aPrice], [_bShop, bPrice]) => aPrice - bPrice
    );
