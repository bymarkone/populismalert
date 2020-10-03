import axios, { AxiosRequestConfig } from 'axios';
import { GetIndicatorResponse } from './responseTypes';

const economicsUrl = process.env.REACT_APP_ECONOMICS_API_URL

const config: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: economicsUrl,
};

export function getCountryData(country: string): Promise<GetIndicatorResponse> {
    const url = `${economicsUrl}/api/indicator/${encodeURIComponent(country)}`;
    return axios.get(url, config).then(res => res.data)
}
