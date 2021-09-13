export const getElementText = (
    element: Element | Document,
    selector: string
) => {
    return element.querySelector(selector)?.textContent?.trim() ?? '';
};

export const getElementLink = (
    element: Element | Document,
    selector: string
) => {
    return element.querySelector(selector)?.getAttribute('href')?.trim() ?? '';
};

export const getElementsArray = (
    element: Element | Document,
    selector: string
) => {
    return Array.from(element.querySelectorAll(selector));
};

export const getShopLink = (element: Element | Document, selector: string) => {
    return getShopLinkFromString(
        element.querySelector(selector)?.getAttribute('onmouseover')
    );
};

export const getShopLinkFromString = (str: string | null = '') =>
    ((str || '').match(/this\.href="([^"]+)/) ?? [])[1] ?? '';
