import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import getCountryTimeSeriesData from '../Api/covid-api';
import { TimeLineSummaryCard } from '../Components/TimeLineSummaryCard';
import { Constants } from '../Constants';
import { CountryTimeLine, CountryTimeLineResponse } from '../Models/CountryTimeline.model';
import getLastXDaysTimeLineData from '../Utils'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function ManageCountryData() {
    // let lastDayTimeSummary:CountryTimeLine;
    const[lastDayTimeSummary, updateLastDayTimeSummary] = useState(new CountryTimeLine());
    const [covidTimeSummaryList, updateCovidTimeLineList] = useState<CountryTimeLine[]>([])
    const [selectedType, updateSelectedCovidStatsTyope] = useState<string>(Constants.COVID_STATUS_TYPE_CONFIRMED);
    useEffect(() => {
        getCountryTimeSeriesData().then((data:any) => {
            const tempCovidData:any[] = data.cases_time_series;
            if(tempCovidData){
                const formattedCovidData = tempCovidData.map(cases => {
                    return new CountryTimeLine().mapJsonDataToCountryTimeLine(cases);
                })
                updateCovidTimeLineList([...formattedCovidData]);
            }
        })
    }, [])

    useEffect(() => {
        updateLastDayTimeSummary(fetchLatestDayCovidSummary(covidTimeSummaryList))
    }, [covidTimeSummaryList])

    const fetchLatestDayCovidSummary = (covidTimeSummary:CountryTimeLine[]) => {
        console.log(covidTimeSummary[covidTimeSummary.length - 1])
        return covidTimeSummary[covidTimeSummary.length - 1];
    }

    const showSummaryData = (type:string) => {
        if(lastDayTimeSummary){
            const propsToPass:any = {
                lastXDaysStats: getLastXDaysTimeLineData(covidTimeSummaryList),
                handleSelectedStatsType:handleSelectedStatsType
            }
            switch(type) {
                case Constants.COVID_STATUS_TYPE_CONFIRMED: {
                    propsToPass.type = Constants.COVID_STATUS_TYPE_CONFIRMED;
                    propsToPass.statsValue =  lastDayTimeSummary.totalconfirmed;
                    propsToPass.isSelected = selectedType === type ? true:false
                    break;
                }

                case Constants.COVID_STATUS_TYPE_DECEASED: {
                    propsToPass.type = Constants.COVID_STATUS_TYPE_DECEASED;
                    propsToPass.statsValue =  lastDayTimeSummary.totaldeceased;
                    propsToPass.isSelected = selectedType === type ? true:false
                    break;
                }

                case Constants.COVID_STATUS_TYPE_RECOVERED: {
                    propsToPass.type = Constants.COVID_STATUS_TYPE_RECOVERED;
                    propsToPass.statsValue =  lastDayTimeSummary.totalrecovered;
                    propsToPass.isSelected = selectedType === type ? true:false
                    break;
                }
            }
            return (
                <div>
                    <TimeLineSummaryCard
                    {...propsToPass}
                    ></TimeLineSummaryCard>
                </div>
            )
        }
        return null;
    }

    function handleSelectedStatsType(type:string) {
        updateSelectedCovidStatsTyope(type);
    }

    
    return (
        <div>
            <Container>
               <Row>
                    <Col xs={4}>
                        {showSummaryData(Constants.COVID_STATUS_TYPE_CONFIRMED)}
                    </Col>

                    <Col xs={4}>
                        {showSummaryData(Constants.COVID_STATUS_TYPE_RECOVERED)}
                    </Col>

                    <Col xs={4}>
                        {showSummaryData(Constants.COVID_STATUS_TYPE_DECEASED)}
                    </Col>
                </Row> 
            </Container>
        </div>
    )
}
