"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions for typing

// Dynamically import the ReactApexChart component to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CandlestickDataPoint {
  x: string; // Date in string format
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartData {
  data: CandlestickDataPoint[];
}

const CandlestickChart = () => {
  // @param chartData: CandlestickChartData | null
  // @param setChartData: React.Dispatch<React.SetStateAction<CandlestickChartData | null>>
  // @param loading: boolean
  // @param setLoading: React.Dispatch<React.SetStateAction<boolean>>
  // @param error: string | null
  // @param setError: React.Dispatch<React.SetStateAction<string | null>>
  // @param useEffect: React.EffectCallback
  // @param useState: <T>(initialState: T | (() => T)) => [T, React.Dispatch<React.SetStateAction<T>>]
  // @description: Define the state variables for chart data, loading state, and error message

  const [chartData, setChartData] = useState<CandlestickChartData | null>(null); // Use defined type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chartData && loading) {
      axios.get('http://localhost:8000/api/candlestick-data')
        .then(response => {
          setChartData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setError('Error fetching candlestick data');
          setLoading(false);
        });
    }
  }, [chartData, loading]);

  if (loading) return <div>Loading...</div>; // Display loading message while fetching data

  if (error) return <div>{error}</div>; // Display error message if fetching fails

  // Define the options with the correct typing for ApexCharts
  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'Candlestick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'category', // Treat the x-axis as categories (e.g., date strings)
      labels: {
        formatter: function (val: string) {
          return val; // Keep the date format as-is (e.g., "2023-01-01")
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  // Ensure that chartData is not null or undefined and format it correctly
  const series = chartData ? [{
    data: chartData.data.map((d) => ({
      x: d.x, // Use the date string directly without converting to a Date object
      y: [d.open, d.high, d.low, d.close], // Candlestick requires [open, high, low, close] format
    })),
  }] : [];

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

export default CandlestickChart;
