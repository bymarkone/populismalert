export interface SeriesItem {
    date: string;
    value: number;
}

export default interface Indicator {
    name: string;
    series: SeriesItem[]
}

