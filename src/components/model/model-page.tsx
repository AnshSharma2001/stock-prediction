
import { Button } from "@/components/ui/button"
import { ResponsiveLine } from "@nivo/line"
import { TabsTrigger, TabsList, Tabs } from "@/components/ui/tabs"
import { AvatarImage, Avatar } from "@/components/ui/avatar"
import { JSX, ClassAttributes, HTMLAttributes } from "react"

export default function Component() {
  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold">Stock Prediction Model</h1>
        <Button variant="secondary">Like</Button>
      </div>
      <div className="my-6">
        <CurvedlineChart className="w-full h-[300px]" />
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
        <span className="font-semibold">Jane Doe</span>
        <span className="text-muted-foreground">@janedoe</span>
      </div>
      <p className="my-4">
        This model uses machine learning to predict stock market performance based on historical data and current market
        trends. It aims to provide accurate forecasts to assist investors in making informed decisions.
      </p>
      <div className="border-t pt-4 mt-4">
        <h2 className="text-2xl font-semibold mb-3">Comments</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="flex-1">Great accuracy on the predictions, helped me make some profitable trades!</p>
            <Avatar>
              <AvatarImage alt="User avatar" src="/placeholder.svg?height=40&width=40" />
            </Avatar>
          </div>
          <div className="flex items-center justify-between">
            <p className="flex-1">I like how it accounts for sudden market changes, quite reliable.</p>
            <Avatar>
              <AvatarImage alt="User avatar" src="/placeholder.svg?height=40&width=40" />
            </Avatar>
          </div>
          <div className="flex items-center justify-between">
            <p className="flex-1">Could use more data points for emerging markets, but overall solid model.</p>
            <Avatar>
              <AvatarImage alt="User avatar" src="/placeholder.svg?height=40&width=40" />
            </Avatar>
          </div>
          <div className="flex items-center justify-between">
            <p className="flex-1">Impressed with the level of detail in the analysis reports.</p>
            <Avatar>
              <AvatarImage alt="User avatar" src="/placeholder.svg?height=40&width=40" />
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  )
}

function CurvedlineChart(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
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
  )
}