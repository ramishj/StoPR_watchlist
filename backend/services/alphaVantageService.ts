import axios from 'axios';
const ALPHA_VANTAGE_API_KEY = 'YQKC5RLIBF1VXMGH';

interface IntradayData {
    [key: string]: {
        '1. open': string;
        '2. high': string;
        '3. low': string;
        '4. close': string;
        '5. volume': string;
    };
}

export const getIntradayData = async (symbol: string, interval: string): Promise<IntradayData> => {
    try {
        const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${ALPHA_VANTAGE_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data: IntradayData = response.data[`Time Series ${interval}`]; // Adjust this key based on your interval
        return data;
    } catch (error) {
        throw new Error('Error fetching intraday data');
    }
};

export const searchSymbols = async (keywords: string): Promise<any> => {
    try {
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${ALPHA_VANTAGE_API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Error searching symbols');
    }
};
