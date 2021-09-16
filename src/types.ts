export type ShopPrices = Record<string, number>;

export type Shop = {
    name: string;
    link: string;
};

export type Card = {
    name: string;
    shop: Shop;
    price: number;
};

export type CardWithExtraStats = Card & {
    mhPrice: number;
    isAcceptablePrice: boolean;
};

export type CardWithProfitability = Card & {
    profitability: number;
    payBack: number;
};

export type ShopPriceTuple = [Shop, number];
