import { NumberLiteralType } from "typescript";

export class TimeSeriesModel {
    date:string;
    recovered:number;
    confirmed:number;
    deceased:number;
    tested:number;
    totalconfirmed:number;
    totaldeceased:number;
    totalrecovered:number;
}

export class TodayCovidSummary {
    confirmed:number;
    deceased:number;
    recovered:number;
}