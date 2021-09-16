import { JSDOM } from 'jsdom';
import { getElementText } from './parseUtils';

const url = 'https://www.marketwatch.com/investing/cryptocurrency/btcrub';

let btcRub: number | undefined;

export const getBtcRub = async () => {
    if (btcRub) return btcRub;

    const {
        window: { document },
    } = await JSDOM.fromURL(url);

    const priceRaw = getElementText(document, '.intraday__price bg-quote');

    const price = Number(priceRaw.replaceAll(',', ''));

    btcRub = price;

    return price;
};
