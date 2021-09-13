import { Page } from 'playwright-chromium';
import { shopUrl } from './constants';

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
