export class CountryTimeLineResponse {
    cases_time_series: CountryTimeLine[];
    statewise:StateWiseTimeLineSummary[];

}

export class CountryTimeLine {
    dailyconfirmed:number;
    dailydeceased:number;
    dailyrecovered:number;
    dateymd:string;
    totalconfirmed:number;
    totaldeceased:number;
    totalrecovered:number;

    mapJsonDataToCountryTimeLine(data:any) {
        const countryTimeLine = new CountryTimeLine();
        Object.assign(countryTimeLine, data);
        return countryTimeLine;
    }
}

export class StateWiseTimeLineSummary {
    active:number;
    confirmed:number;
    deaths:number;
    deltaconfirmed:number;
    deltadeaths:number;
    deltarecovered:number;
    lastupdatedtime:string;
    migratedother:number;
    recovered:number;
    state:string;
    statecode:string;
    statenotes:string;
}