import { Page } from 'playwright-chromium';
import { CardsPaths, shopUrl } from './constants';

export const getText = (page: Page, selector: string) => {
    return page.$eval(selector, (el) => el.textContent?.trim());
};

export const getTextArray = (page: Page, selector: string) => {
    return page.$$eval(selector, (els) =>
        els.map((el) => el.textContent?.trim())
    );
};

export const getCardsUrls = () =>
    CardsPaths.map((path) => `${shopUrl}/${path}`);
