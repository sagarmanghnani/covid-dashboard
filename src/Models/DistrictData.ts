export class DistrictData {
    notes:string;
    active:number;
    confirmed:number;
    deceased:number;
    recovered:number;
    delta:DeltaData;
    state_name:string;
    district_name:string;
}

export class DeltaData {
    confirmed:number;
    deceased:number;
    recovered:number;
}