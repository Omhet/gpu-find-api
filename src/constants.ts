export enum CardModel {
    'GTX 1660' = 'GTX 1660',
    'GTX 1660 Super' = 'GTX 1660 Super',
    'GTX 1660 Ti' = 'GTX 1660 Ti',
    'RTX 2060 Super' = 'RTX 2060 Super',
    'RTX 2070 Super' = 'RTX 2070 Super',
    'RTX 3060' = 'RTX 3060',
    'RTX 3060 Ti' = 'RTX 3060 Ti',
    'RTX 3070' = 'RTX 3070',
    'RTX 3070 Ti' = 'RTX 3070 Ti',
    'RTX 3080' = 'RTX 3080',
    'RTX 3080 Ti' = 'RTX 3080 Ti',
    'RTX 3090' = 'RTX 3090',
}

export const EthHashrate = {
    [CardModel['GTX 1660']]: 25.5,
    [CardModel['GTX 1660 Super']]: 31.56,
    [CardModel['GTX 1660 Ti']]: 31.0,
    [CardModel['RTX 2060 Super']]: 40.0,
    [CardModel['RTX 2070 Super']]: 42.0,
    [CardModel['RTX 3060']]: 50.0,
    [CardModel['RTX 3060 Ti']]: 61.0,
    [CardModel['RTX 3070']]: 66.0,
    [CardModel['RTX 3070 Ti']]: 53.0,
    [CardModel['RTX 3080']]: 100.0,
    [CardModel['RTX 3080 Ti']]: 85.0,
    [CardModel['RTX 3090']]: 123.6,
};

export const shopUrl = 'https://www.e-katalog.ru';

export const CardsPaths = {
    [CardModel['RTX 3060']]:
        'ek-list.php?presets_=45227%2C43493&katalog_=189&pf_=1&order_=pop&save_podbor_=1',
    [CardModel['RTX 3070']]:
        'ek-list.php?presets_=45227%2C42256&katalog_=189&pf_=1&order_=pop&save_podbor_=1',
    [CardModel['RTX 3080']]:
        'ek-list.php?presets_=45227%2C42257&katalog_=189&pf_=1&order_=pop&save_podbor_=1',
    [CardModel['RTX 3090']]:
        'ek-list.php?presets_=45227%2C42258&katalog_=189&pf_=1&order_=pop&save_podbor_=1',
};

export const AcceptableMhPrice = 1800;
