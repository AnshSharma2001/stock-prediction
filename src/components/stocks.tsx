"use client"
import { useState, useRef } from 'react';
import { scaleLinear } from 'd3-scale';
import { subMonths, format } from 'date-fns';

interface StockProps {
  symbol: string;
  price: number;
  delta: number; // percent change
}

// paste them here

/*
{
  "Creator_Email": "workflow_tester@gmail.com",
  "Creator_ID": 1,
  "Creator_Name": "workflow_tester",
  "Creator_Profile_Picture": null,
  "Description": "This is a test for RandomForest.joblib",
  "Like_Count": 0,
  "Model_File_Path": "/home/ec2-user/stock_models/1_RandomForest.joblib",
  "Model_ID": 4,
  "Model_Name": "RandomForest.joblib",
  "Subscribe_Count": 0,
  "review_ids": []
}
*/

export const Stock = ({ symbol, price, delta }: StockProps) => {
  const [priceAtTime, setPriceAtTime] = useState({
    time: '00:00',
    value: price.toFixed(2),
    x: 0
  });

  const chartRef = useRef<HTMLDivElement>(null);

  // Dummy width to simulate the chart width. Adjust accordingly.
  const width = 300; // Example width, you need to replace this with actual width measurement.

  const xToDate = scaleLinear(
    [0, width],
    [subMonths(new Date(), 6), new Date()]
  );
  const xToValue = scaleLinear(
    [0, width],
    [price - price / 2, price + price / 2]
  );

  const handlePointerMove = (event: React.PointerEvent) => {
    if (chartRef.current) {
      const { clientX } = event;
      const { left } = chartRef.current.getBoundingClientRect();

      setPriceAtTime({
        time: format(xToDate(clientX - left), 'dd LLL yy'),
        value: xToValue(clientX - left).toFixed(2),
        x: clientX - left
      });
    }
  };

  return (
    <div className="rounded-xl border bg-zinc-950 p-4 text-green-400">
      <div className="float-right inline-block rounded-full bg-white/10 px-2 py-1 text-xs">
        {`${delta > 0 ? '+' : ''}${((delta / price) * 100).toFixed(2)}% ${delta > 0 ? '↑' : '↓'}`}
      </div>
      <div className="text-lg text-zinc-300">{symbol}</div>
      <div className="text-3xl font-bold">${price.toFixed(2)}</div>
      <div className="text mt-1 text-xs text-zinc-500">
        Closed: Feb 27, 4:59 PM EST
      </div>

      {/* The following div should contain your chart implementation */}
      <div
        className="relative -mx-4 h-40 mt-4 cursor-col-resize"
        ref={chartRef}
        onPointerMove={handlePointerMove}
        // ... Other event handlers
      >
        {/* Placeholder for the SVG chart or canvas chart */}
        {/* Example interaction display */}
        {priceAtTime.x > 0 && (
          <div
            className="pointer-events-none absolute z-10 flex w-fit select-none gap-2 rounded-md bg-zinc-800 p-2"
            style={{
              left: priceAtTime.x - 62, // Adjust width of the tooltip as necessary
              top: -40 // Adjust accordingly
            }}
          >
            <div className="text-xs tabular-nums">${priceAtTime.value}</div>
            <div className="text-xs tabular-nums text-zinc-400">
              {priceAtTime.time}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
