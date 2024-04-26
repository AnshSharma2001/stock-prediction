
"use client"

import { Button } from "@/components/ui/button";
import { ResponsiveLine } from "@nivo/line";
import { TabsTrigger, TabsList, Tabs } from "@/components/ui/tabs";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { JSX, ClassAttributes, HTMLAttributes, useEffect, useState } from "react";
import { Model } from "@/types/model";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { constrainedMemory } from "process";
import { usePathname } from "next/navigation";
import { Jacquarda_Bastarda_9 } from "next/font/google";
import { set } from "date-fns";
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GenericModelComponentProps {
  model?: Model; // Model is now optional
}

// Default data to display if the model data is not loaded
const defaultModel: Model = {
  Creator_Email: "default@example.com",
  Creator_ID: 0,
  Creator_Name: "Default Creator",
  Creator_Profile_Picture: null,
  Description: "This is a default description for the model.",
  Like_Count: 0,
  Model_File_Path: "",
  Model_ID: 0,
  Model_Name: "Default Model",
  Subscribe_Count: 0,
  review_ids: [],
  Tags: [{ Model_ID: 0, Name: "Default Tag", TagID: 0 }],
};

const defaultChartData = [
  {
    id: "default",
    data: [
      { x: "Jan", y: 10 },
      { x: "Feb", y: 20 },
      { x: "Mar", y: 15 },
      { x: "Apr", y: 37 },
      { x: "May", y: 48 },
      { x: "Jun", y: 53 },
    ],
  },
];

const TKRS = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"];


const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  

interface StockData {
  Evaluation_Date: string;
  MSE_Value: number;
  Model_ID: number;
  Raw_Data: string;
  Result_ID: number;
  Stock_ID: number;
  Timeframe_Name: string;
}

interface StockResults {
  [key: string]: StockData[];
}

interface ProcessedStockData {
  previousDay?: StockData;
  previousYear?: StockData;
  previousMonth?: StockData;
  previousWeek?: StockData;
}

interface GraphData {
    x: string; 
    y: number; 
    z: string; 
  }
  

const GenericModelComponent: React.FC<GenericModelComponentProps> = ({
  model = defaultModel,
}) => {
const [data, setData] = useState<{ [key: string]: ProcessedStockData }>({});
const [selectedTicker, setSelectedTicker] = useState('');
const [selectedTimeframe, setSelectedTimeframe] = useState('24hrs');
const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const pathname = usePathname();
                // const modelId = pathname.split("/").pop();
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/models/latest_mse_results_grouped/5`);
                const data = await response.json();
                const processedData: { [key: string]: { x: string[]; y: number; y_p : number[]}[] } = {};

                console.log("test");
                console.log(data);

                Object.keys(data).forEach(ticker => {
                    const results = data[ticker] || [];

                    //on;y 4 as 0 is 1 day, 1 is 1 week, 2 is 1 month, 3 is 1 year
                    processedData[ticker] = results.slice(0, 4).map((item: { Raw_Data : {actual_dates : string[], actual_values : number[], predicted_values : number[]}, MSE_Value : number, Evaluation_Date : string }) => {

                        return {
                            x: item.Raw_Data,
                            y: item.MSE_Value,
                            z: item.Evaluation_Date
                        }
                        
                    });
                });
                
                console.log(processedData);

                

                return data;

            } catch (error) {
                console.error(error);
            }

        }

        fetchData();

    }, []);

    // useEffect(() => {
    //     if (!data[selectedTicker]) return;

    //     const timeframeMapping = {
    //         '24hrs': 0, // Assuming these correspond to indices in your data structure
    //         '1week': 1,
    //         '1month': 2,
    //         '1year': 3
    //     };
    //     const timeframeData = data[selectedTicker][timeframeMapping[selectedTimeframe]];
    //     if (timeframeData) {
    //         setGraphData(timeframeData.x.map((x, i) => ({
    //             x,
    //             y: timeframeData.y[i],
    //             z: timeframeData.z
    //         })));
    //     }
    // }, [selectedTicker, selectedTimeframe, data]);

    const handleTimeframeChange = (value: string) => {
        setSelectedTimeframe(value);
    };

    const handleTickerChange = (value: string) => {
        setSelectedTicker(value);
    };
    

  return (
    <div className="max-w-4xl mx-auto my-8">
        <h1>Data for model</h1>
        <p>
            {/* {JSON.stringify(response)} */}
        </p>
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold">{model.Model_Name}</h1>
        <Button variant="secondary">Like</Button>
      </div>
      <div className="my-6">
        {/* <CurvedlineChart className="w-full h-[300px]" data={defaultChartData} /> */}
        <MLgraph />
         

      </div>
      <div className="flex justify-between"> 
      <Tabs className="mb-6" defaultValue="24hrs" onValueChange={handleTimeframeChange}>
        <TabsList>
          <TabsTrigger value="24hrs">24hrs</TabsTrigger>
          <TabsTrigger value="1week">1 week</TabsTrigger>
          <TabsTrigger value="1month">1 month</TabsTrigger>
          <TabsTrigger value="1year">1 year</TabsTrigger>
        </TabsList>
      </Tabs>
      < div flex-shrink-0>
      <Select  value={selectedTicker} onValueChange={handleTickerChange} defaultValue="AAPL">
          <SelectTrigger>
            <SelectValue>{ 'Select a stock'}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {TKRS.map((ticker) => (
              <SelectItem key={ticker} value={ticker}>
                {ticker}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>
        </div>

      <div className="flex flex-col gap-1 my-4">
        <span className="font-semibold">{model.Creator_Name}</span>
        <span className="text-muted-foreground">{model.Creator_Email}</span>
      </div>
      <p className="my-4">{model.Description}</p>
    </div>
  );
};

export default GenericModelComponent;


export function MLgraph() {
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    );
  }








