import { Constants } from "../Constants"
import { CountryTimeLineResponse } from "../Models/CountryTimeline.model";

export default function getCountryTimeSeriesData() {
    return new Promise((resolve, reject) => {
        fetch(Constants.INDIA_TIME_SERIES_URL).then(countryTimeSeries=> {
            resolve(countryTimeSeries.json());
        }).catch(err => {
            reject(err);
        })
    })
}