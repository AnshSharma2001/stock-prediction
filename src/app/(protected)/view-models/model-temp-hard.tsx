import { Button } from "@/components/ui/button";
import { ResponsiveLine } from "@nivo/line";
import { TabsTrigger, TabsList, Tabs } from "@/components/ui/tabs";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { JSX, ClassAttributes, HTMLAttributes } from "react";
import { Model } from "@/types/model";
import { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

interface GenericModelComponentProps {
  model?: Model; // Model is now optional

}
interface SelectValueProps {
    placeholder?: string;
    selectedTicker: string;
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

type Timeframe = '24hrs' | '1week' | '1month' | '1year';

const GenericModelComponent: React.FC<GenericModelComponentProps> = ({
  model = defaultModel,
}) => {

    const [chartData, setChartData] = useState(defaultChartData);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24hrs'); 
  const [selectedTicker, setSelectedTicker] = useState('AAPL'); // Default to AAPL

  const tickers = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'TSLA'];

  const generateRandomData = (timeframe : Timeframe) => {
    const dataPoints = { '24hrs': 12, '1week': 7, '1month': 30, '1year': 365 };

    const newData = [
      {
        id: "default",
        data: Array(dataPoints[timeframe]).fill(0).map((_, i) => ({
          x: `Analysis ${i + 1}`, // Example labeling
          y: Math.floor(Math.random() * 20)+5,
        })),
      },
    ];
    return newData;
  };
  const updateChartData = (ticker: string, timeframe: Timeframe) => {
    const updateChartData = (ticker: string, timeframe: Timeframe) => {
        // Since we're using generateRandomData, the ticker can be ignored
        const newData = generateRandomData(timeframe);
        setChartData(newData);
      };
  };

  useEffect(() => {
    updateChartData(selectedTicker, selectedTimeframe as Timeframe);
  }, [selectedTicker, selectedTimeframe]);

  // Update chart data on timeframe change
  useEffect(() => {
    const newData = generateRandomData( selectedTimeframe as Timeframe);
    setChartData(newData);
  }, [selectedTimeframe]);

  // Use either the provided model or the default model
    return (
        <div className="max-w-4xl mx-auto my-8">
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-3xl font-bold">{model.Model_Name}</h1>
                <Button variant="secondary">Like</Button>
            </div>
            <div className="my-6">
                <CurvedlineChart className="w-full h-[300px]" data={chartData} />
            </div>
            <div className="flex flex-row">  {/* Use flexbox for row layout */}
                <Tabs className=" flex-grow mb-6" defaultValue="24hrs" onValueChange={setSelectedTimeframe}>
                    <TabsList>
                        <TabsTrigger value="24hrs">24hrs</TabsTrigger>
                        <TabsTrigger value="1week">1 week</TabsTrigger>
                        <TabsTrigger value="1month">1 month</TabsTrigger>
                        <TabsTrigger value="1year">1 year</TabsTrigger>
                    </TabsList>
                </Tabs>
                <Select defaultValue="AAPL" >
                    <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder=""  >{selectedTicker}</SelectValue> 

                    </SelectTrigger>
                    <SelectContent >
                        {tickers.map((ticker) => (
                            <SelectItem key={ticker} value={ticker} onClick={() => setSelectedTicker(ticker)}>
                                {ticker}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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

interface CurvedlineChartProps {
  className?: string;
  data: {
    id: string;
    data: { x: string; y: number }[];
  }[];
}

const CurvedlineChart: React.FC<CurvedlineChartProps> = ({
  className,
  data,
}) => {
  return (
    <div className={className}>
      <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        enableGridX={false}
        enableGridY={false}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={false}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#477aea",
            },
            // Customize the grid lines
          },
        }}
        role="application"
      />
    </div>
  );
};