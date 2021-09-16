import axios from 'axios';
const algosUrl =
    'https://api2.nicehash.com/main/api/v2/public/simplemultialgo/info';

let algos: Algo[] | undefined;

type Algo = {
    algorithm: string;
    title: string;
    paying: number;
};
export const getAlgos = async () => {
    if (algos) return algos;

    const {
        data: { miningAlgorithms },
    } = await axios.get<{ miningAlgorithms: Algo[] }>(algosUrl);

    algos = miningAlgorithms;

    return miningAlgorithms;
};

export const getEthAlgo = async () => {
    const algos = await getAlgos();

    return algos.find(
        ({ algorithm }) => algorithm === 'DAGGERHASHIMOTO'
    ) as Algo;
};
