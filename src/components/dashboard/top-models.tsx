"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface MSEData {
  [key: string]: {
    "Previous 1 Day": number;
    "Previous Month": number;
    "Previous Week": number;
    "Previous Year": number;
  };
}

interface ModelData {
  name: string;
  mse: number;
  [key: string]: number | string;
}

type DataState = {
  day: ModelData[];
  week: ModelData[];
  month: ModelData[];
  year: ModelData[];
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Card className=" bg-secondary shadow-none">
        <CardContent className="pt-2 pb-2 px-4">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">Model ID: </span>
            {`${label}`}
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">MSE: </span>
            {`${payload[0].value.toFixed(2)}`}
          </p>
        </CardContent>
      </Card>
    );
  }

  return null;
};

const sortData = (data: MSEData, key: keyof MSEData[string]): ModelData[] => {
  return Object.entries(data)
    .map(([modelId, values]) => ({
      name: `${modelId}`,
      mse: values[key],
      ...values,
    }))
    .sort((a, b) => a.mse - b.mse) // Sort in ascending order
    .slice(0, 5); // Get top 10 models
};

export const TopModels = () => {
  const [data, setData] = useState<DataState | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("day");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/models/average_mse_by_model_and_timeframe`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawData: MSEData = await response.json();
        setData({
          day: sortData(rawData, "Previous 1 Day"),
          week: sortData(rawData, "Previous Week"),
          month: sortData(rawData, "Previous Month"),
          year: sortData(rawData, "Previous Year"),
        });
        setLoading(false);
      } catch (error: any) {
        setError(`Failed to load data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="w-full px-10 h-[300px] md:h-[500px] pb-10 pt-30 rounded-xl lg:max-w-[70%]">
      <h1 className="text-2xl font-bold mb-10">Top Performing Models</h1>

      {loading || !data ? (
        <div className="w-full h-full">
          <Skeleton className="w-full h-full" />
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data[selectedTimeframe as keyof DataState]}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="name" dy={10} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="mse"
                stroke="#0096FF"
                fill="url(#colorGradient)"
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0096FF" stopOpacity={1} />
                  <stop offset="100%" stopColor="transparent" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-end space-x-3 mt-10 mb-5 ">
            <Tabs className="mb-6" defaultValue="1D">
              <TabsList>
                {[
                  { timeframe: "day", label: "1D" },
                  { timeframe: "week", label: "1W" },
                  { timeframe: "month", label: "1M" },
                  { timeframe: "year", label: "1Y" },
                ].map(({ timeframe, label }) => (
                  <TabsTrigger
                    value={label}
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
};
