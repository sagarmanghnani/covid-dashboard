import { Constants } from "./Constants";
import { CountryTimeLine } from "./Models/CountryTimeline.model";

export default function getLastXDaysTimeLineData(timeLineData:CountryTimeLine[]) {
    if(timeLineData && timeLineData.length > Constants.COVID_LAST_X_DAYS_CHART_SUMMARY){
        let initialIndex = (timeLineData.length - 1) - Constants.COVID_LAST_X_DAYS_CHART_SUMMARY;
        const lastXDaysData:CountryTimeLine[] = [];
        for(let i = initialIndex;i < timeLineData.length;i++){
            lastXDaysData.push(timeLineData[i]);
        }
        return lastXDaysData;
    }else{
        return timeLineData;
    }
}