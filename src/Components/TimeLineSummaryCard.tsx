import React, { useEffect, useState } from 'react';
import { Constants } from '../Constants';
import { CountryTimeLine } from '../Models/CountryTimeline.model';
import TimeLineSummaryChart from './TimeLineSummaryChart';
import  classNames from 'classnames'
import './TimeLineSummaryCard.css'
type TimeLineSummaryCardProps = {
    type:string;
    statsValue:number;
    lastXDaysStats:CountryTimeLine[];
    handleSelectedStatsType:Function;
    isSelected:boolean;
}

export const TimeLineSummaryCard = (props:TimeLineSummaryCardProps) => {
    const [chartLabel, setLabel] = useState<string[]>([]);
    const [chartData, setChartData] = useState<number[]>([]);
    useEffect(() => {
        processChartData();
    }, [props.type, props.statsValue, props.lastXDaysStats])

    return (
        <div className={classNames({
            'confirmed-cases': props.type === Constants.COVID_STATUS_TYPE_CONFIRMED,
            'deceased-cases': props.type === Constants.COVID_STATUS_TYPE_DECEASED,
            'recovered-cases':props.type === Constants.COVID_STATUS_TYPE_RECOVERED,
            'confirmed-cases__active':props.isSelected && props.type === Constants.COVID_STATUS_TYPE_CONFIRMED,
            'deceased-cases__active':props.type === Constants.COVID_STATUS_TYPE_DECEASED && props.isSelected,
            'recovered-cases__active':props.type === Constants.COVID_STATUS_TYPE_RECOVERED && props.isSelected
        })}
        onClick={() => {
            props.handleSelectedStatsType(props.type)
        }}
         >
            <p> {getStatsSpecificDetails().name} </p>
            <p className="delta"> {deltaInStates()} </p>
            <h5> {props.statsValue} </h5>
            <TimeLineSummaryChart 
            labels={chartLabel} 
            chartData={chartData}
            type={props.type}
            borderColor={getStatsSpecificDetails().borderColor}
            ></TimeLineSummaryChart>
        </div>
    )

    

    function getStatsSpecificDetails(){
        const statsDataFromType:any = {}
        switch (props.type) {
            
            case Constants.COVID_STATUS_TYPE_CONFIRMED: {
                statsDataFromType.name = 'Confirmed';
                statsDataFromType.borderColor = Constants.CONFIRMED_COVID_CHART_COLOR;
                break;
            }

            case Constants.COVID_STATUS_TYPE_DECEASED: {
                statsDataFromType.name = 'Deceased';
                statsDataFromType.borderColor = Constants.DECEASED_COVID_CHART_COLOR;
                break;
            }

            case Constants.COVID_STATUS_TYPE_RECOVERED: {
                statsDataFromType.name = 'Recovered';
                statsDataFromType.borderColor = Constants.RECOVERED_COVID_CHART_COLOR;
                break;
            }
        }
        return statsDataFromType;
    }

    function getStatsFromType(stats:CountryTimeLine):number {
        let returnData:number;
        switch(props.type){
            case Constants.COVID_STATUS_TYPE_CONFIRMED: {
                returnData =  stats.dailyconfirmed;
                break;
            }

            case Constants.COVID_STATUS_TYPE_RECOVERED: {
                returnData =   stats.dailyrecovered
                break;
            }

            case Constants.COVID_STATUS_TYPE_DECEASED: {
                returnData =   stats.dailyrecovered
                break;
            }

            default: {
                returnData = 0
            }
        }
        return returnData;
    }

    function processChartData(){
        const labels:string[] = [];
        const dataNumber:number[] = [];
        for(const stats of props.lastXDaysStats){
            labels.push(stats.dateymd);
            dataNumber.push(getStatsFromType(stats))
        }

        const dataSet:ChartDataSet = {
            label:"",
            data:dataNumber,
            fillColor:'red',
            strokeColor:""
        }

        setChartData(dataNumber);
        setLabel(labels);

    }

    function deltaInStates(){
        if(props.lastXDaysStats && props.lastXDaysStats.length && props.lastXDaysStats.length > 1) {
            const length:number = props.lastXDaysStats.length;
            switch(props.type){
                case Constants.COVID_STATUS_TYPE_RECOVERED: {
                    return props.lastXDaysStats[length - 1].totalrecovered - props.lastXDaysStats[length - 2].totalrecovered;
                }

                case Constants.COVID_STATUS_TYPE_CONFIRMED: {
                    return props.lastXDaysStats[length - 1].totalconfirmed - props.lastXDaysStats[length - 2].totalconfirmed;
                }

                case Constants.COVID_STATUS_TYPE_DECEASED: {
                    return props.lastXDaysStats[length - 1].totaldeceased - props.lastXDaysStats[length - 2].totaldeceased;
                }
                
            }
        }
    }


    



}


