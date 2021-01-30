import { SearchUtility } from "./SearchData.interface";

export class CountrySummary {
    total:number;
    confirmedCasesIndian:number;
    confirmedCasesForeign:number;
    discharged:number;
    deaths:number;
    confirmedButLocationUnidentified:number;
}

export class CountryRegionalModel {
    loc:string;
    confirmedCasesIndian:number;
    confirmedCasesForeign:number;
    discharged:number;
    deaths:number;
    totalConfirmed:number;
}

export class CountryDataResponse {
    success:boolean;
    data:CountryData;
}

export abstract class CountryData {
    summary: CountrySummary;
    regional: CountryRegionalModel[];

    // abstract searchDistricts<T>():T;
}

export class IndiaData extends CountryData {
    
}