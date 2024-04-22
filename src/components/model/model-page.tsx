import { Button } from "@/components/ui/button";
import { ResponsiveLine } from "@nivo/line";
import { TabsTrigger, TabsList, Tabs } from "@/components/ui/tabs";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { JSX, ClassAttributes, HTMLAttributes } from "react";
import { Model } from "@/types/model";

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

const GenericModelComponent: React.FC<GenericModelComponentProps> = ({
  model = defaultModel,
}) => {
  // Use either the provided model or the default model
  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold">{model.Model_Name}</h1>
        <Button variant="secondary">Like</Button>
      </div>
      <div className="my-6">
        <CurvedlineChart className="w-full h-[300px]" data={defaultChartData} />
      </div>
      <Tabs className="mb-6" defaultValue="24hrs">
        <TabsList>
          <TabsTrigger value="24hrs">24hrs</TabsTrigger>
          <TabsTrigger value="1week">1 week</TabsTrigger>
          <TabsTrigger value="1month">1 month</TabsTrigger>
          <TabsTrigger value="1year">1 year</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-col gap-1 my-4">
        <span className="font-semibold">{model.Creator_Name}</span>
        <span className="text-muted-foreground">{model.Creator_Email}</span>
      </div>
      <p className="my-4">{model.Description}</p>
      {/* Render other elements like comments and likes here */}
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
        useMesh={true}
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
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
};
