import { JSDOM } from 'jsdom';

const ekatalogUrl = 'https://izpriuta.ru/sobaki';

export const getAnimal = async () => {
    const dom = await JSDOM.fromURL(ekatalogUrl);
    const doc = dom.window.document;

    return {};
};
