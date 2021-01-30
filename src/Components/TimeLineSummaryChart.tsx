import React, { useEffect, useState } from 'react';
import { CountryTimeLine } from '../Models/CountryTimeline.model';
import Chart, { ChartDataSets } from 'chart.js'
import 'bootstrap/dist/css/bootstrap.min.css';
type TimeLineSummaryChartProps = {
    labels:string[];
    chartData:number[];
    borderColor:string;
    type:string;
}

export default function TimeLineSummaryChart(props:TimeLineSummaryChartProps) {

    useEffect(() => {
        createChart()
    }, [props.labels, props.chartData])

    return (
        <canvas id={`covid-stats-${props.type}`}></canvas>
    )

    function createChart() {
        const covidChartCtx = document.getElementById(`covid-stats-${props.type}`) as HTMLCanvasElement;
        const chart = new Chart(covidChartCtx, {
            type:'line',
            data: {
                labels:props.labels,
                datasets:[
                    {
                        data:props.chartData,
                        borderColor:props.borderColor,
                        backgroundColor:'transparent',
                    }
                ],
            },
            options: {
                legend: {
                    display:false
                },
                scales: {
                    xAxes: [
                        {
                            gridLines:{
                                display:false,
                            },
                            ticks: {
                                display:false
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines:{
                                display:false,
                            },
                            ticks: {
                                display:false
                            }
                        }
                    ]
                }
            }
        })
    }

    
}