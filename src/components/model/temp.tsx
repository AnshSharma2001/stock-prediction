import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ResponsiveLine } from "@nivo/line";
import { TabsTrigger, TabsList, Tabs } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Model } from "@/types/model";
import { ModelChart } from './model-chart';

// Define interfaces for the props and state handling
interface GenericModelComponentProps {
  model?: Model; // Optional model prop
}

interface StockData {
  Evaluation_Date: string;
  MSE_Value: number;
  Model_ID: number;
  Raw_Data: string;
  Result_ID: number;
  Stock_ID: number;
  Timeframe_Name: string;
}

interface StockAPIResponse {
  [key: string]: StockData[];
}

interface ChartPoint {
  x: string;
  y: number;
}

interface ChartData {
  id: string;
  data: ChartPoint[];
}

const defaultModel: Model = {
  Creator_Email: "default@example.com",
  Creator_ID: 0,
  Creator_Name: "Default Creator",
  Creator_Profile_Picture: null,
  Description: "This is a default description for the model.",
  Like_Count: 0,
  Model_File_Path: "",
  Model_ID: 1, // Assuming a default Model ID for demonstration
  Model_Name: "Default Model",
  Subscribe_Count: 0,
  review_ids: [],
  Tags: [{ Model_ID: 0, Name: "Default Tag", TagID: 0 }],
};

// Function to fetch data from the API
const fetchData = async (modelId: number): Promise<StockAPIResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/models/latest_mse_results_grouped/${modelId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const GenericModelComponent: React.FC<GenericModelComponentProps> = ({
  model = defaultModel,
}) => {
  const [data, setData] = useState<StockAPIResponse>({});
  const [selectedStock, setSelectedStock] = useState<string>('AAPL'); // Default to AAPL for initial load
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('24hrs');
  const [chartData, setChartData] = useState<ChartData[]>([]);


  useEffect(() => {
    fetchData(model.Model_ID).then(setData).catch(console.error);
  }, []);

  // useEffect(() => {
  //   if (!selectedStock || !data[selectedStock]) return;

  //   const timeframeData = data[selectedStock].find(d => d.Timeframe_Name.includes(selectedTimeframe));
  //   if (timeframeData) {
  //     const raw = JSON.parse(timeframeData.Raw_Data);
  //     setChartData([
  //       { id: 'Actual Prices', data: raw.actual_dates.map((date: string, i: number) => ({ x: date, y: raw.actual_prices[i] })) },
  //       { id: 'Predicted Prices', data: raw.actual_dates.map((date: string, i: number) => ({ x: date, y: raw.predicted_prices[i] })) },
  //     ]);
  //   }
  // }, [selectedStock, selectedTimeframe, data]);

  console.log(chartData)
  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold">{model.Model_Name}</h1>
        <Button variant="secondary">Like</Button>
      </div>
       <div className="my-6">
        <ModelChart />
     {/* <ResponsiveLine
  data={chartData}
  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
  xScale={{ type: 'point' }}
  yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
  axisTop={null}
  axisRight={null}
  axisBottom={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Date',
    legendOffset: 36,
    legendPosition: 'middle'
  }}
  axisLeft={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Price',
    legendOffset: -40,
    legendPosition: 'middle'
  }}
  colors={{ scheme: 'nivo' }}
  pointSize={10}
  pointColor={{ theme: 'background' }}
  pointBorderWidth={2}
  pointBorderColor={{ from: 'serieColor' }}
  pointLabel="y"
  pointLabelYOffset={-12}
  useMesh={true}
  legends={[
    {
      anchor: 'bottom-right',
      direction: 'column',
      justify: false,
      translateX: 100,
      translateY: 0,
      itemsSpacing: 0,
      itemDirection: 'left-to-right',
      itemWidth: 80,
      itemHeight: 20,
      itemOpacity: 0.75,
      symbolSize: 12,
      symbolShape: 'circle',
      symbolBorderColor: 'rgba(0, 0, 0, .5)',
      effects: [
        {
          on: 'hover',
          style: {
            itemBackground: 'rgba(0, 0, 0, .03)',
            itemOpacity: 1
          }
        }
      ]
    }
  ]}
/> */}

      </div>
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="24hrs" onValueChange={setSelectedTimeframe}>
          <TabsList>
            <TabsTrigger value="24hrs">1 Day</TabsTrigger>
            <TabsTrigger value="1week">1 Week</TabsTrigger>
            <TabsTrigger value="1month">1 Month</TabsTrigger>
            <TabsTrigger value="1year">1 Year</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select onValueChange={setSelectedStock}>
          <SelectTrigger>
            <SelectValue>{selectedStock || 'Select a stock'}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.keys(data).map(key => (
              <SelectItem key={key} value={key}>{key}</SelectItem>
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

// const CurvedlineChart: React.FC<CurvedlineChartProps> = ({
//     className,
//     data,
//   }) => {
//     return (
//       <div className={className}>
//         <ResponsiveLine
//           data={data}
//           margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
//           xScale={{ type: "point" }}
//           yScale={{ type: "linear", min: 0, max: "auto" }}
//           curve="monotoneX"
//           axisTop={null}
//           axisRight={null}
//           axisBottom={{
//             tickSize: 0,
//             tickPadding: 16,
//           }}
//           axisLeft={{
//             tickSize: 0,
//             tickValues: 5,
//             tickPadding: 16,
//           }}
//           colors={["#2563eb", "#e11d48"]}
//           pointSize={6}
//           useMesh={true}
//           gridYValues={6}
//           theme={{
//             tooltip: {
//               chip: {
//                 borderRadius: "9999px",
//               },
//               container: {
//                 fontSize: "12px",
//                 textTransform: "capitalize",
//                 borderRadius: "6px",
//               },
//             },
//             grid: {
//               line: {
//                 stroke: "#f3f4f6",
//               },
//             },
//           }}
//           role="application"
//         />
//       </div>
//     );
//   };

