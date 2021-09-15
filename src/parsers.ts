import { JSDOM } from 'jsdom';
import { CardModel, CardsPaths } from './constants';
import { getElementsArray, getElementText, getShopLink } from './parseUtils';
import { Card } from './types';
import {
    getCardsWithExtraStats,
    getCardUrl,
    getPriceStatsFromShopPrices,
} from './utils';

export const getCardsPrices = async () => {
    const data: Record<string, any> = {};
    for (const [model, path] of Object.entries(CardsPaths)) {
        const cards = await getCards(path);
        const cardsWithExtraStats = await getCardsWithExtraStats(
            cards,
            model as CardModel
        );
        const priceStats = getPriceStatsFromShopPrices(cardsWithExtraStats);

        data[model] = {
            cards: cardsWithExtraStats,
            priceStats,
        };
    }

    return data;
};

export const getCards = async (path: string) => {
    const url = getCardUrl(path);
    return await fetchCards(url);
};

export const fetchCards = async (url: string): Promise<Card[]> => {
    const {
        window: { document },
    } = await JSDOM.fromURL(url);
    const modelElements = getElementsArray(document, '.model-short-block');
    const cards = modelElements.map((modelElement) => {
        const cardName = getElementText(modelElement, '.model-short-title');

        const shopElements = getElementsArray(
            modelElement,
            '.model-hot-prices tr'
        );
        return shopElements.map((shopElement) => {
            return {
                name: cardName ?? '',
                shop: {
                    name: getElementText(shopElement, '.model-shop-name u'),
                    link: getShopLink(shopElement, '.model-shop-name a'),
                },
                price: Number(
                    getElementText(shopElement, '.model-shop-price a').replace(
                        /\D/g,
                        ''
                    )
                ),
            };
        });
    });

    return cards.flatMap((cards) => cards);
};
