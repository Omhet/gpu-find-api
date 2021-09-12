export const getText = (element: Element, selector: string) => {
    return element.querySelector(selector)?.textContent?.trim();
};

export const getImage = (element: Element, selector: string) => {
    return element.querySelector(selector)?.getAttribute('src');
};

export const getLink = (element: Element, selector: string) => {
    return element.querySelector(selector)?.getAttribute('href');
};
