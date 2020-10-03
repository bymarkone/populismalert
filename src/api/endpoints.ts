import axios, { AxiosRequestConfig } from 'axios';
import { GetIndicatorsResponse } from './responseTypes';

const economicsUrl = process.env.REACT_APP_ECONOMICS_API_URL

const config: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: economicsUrl,
};

export function getCountryData(country: string): Promise<GetIndicatorsResponse> {
    const url = `${economicsUrl}/api/indicators/${encodeURIComponent(country)}`;
    return axios.get(url, config).then(res => res.data)
}
