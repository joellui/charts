import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement);

interface BarChartData {
  labels: string[];
  data: number[];
}

const BarChart = () => {
  // @param chartData: BarChartData | null
  // @param setChartData: React.Dispatch<React.SetStateAction<BarChartData | null>>
  // @param loading: boolean
  // @param setLoading: React.Dispatch<React.SetStateAction<boolean>>
  // @param error: string | null
  // @param setError: React.Dispatch<React.SetStateAction<string | null>>
  // @param useEffect: React.EffectCallback
  // @param useState: <T>(initialState: T | (() => T)) => [T, React.Dispatch<React.SetStateAction<T>>]
  // @description: Define the state variables for chart data, loading state, and error message


  const [chartData, setChartData] = useState<BarChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Error state to track failures

  useEffect(() => {
    if (!chartData && loading) {  // Prevent multiple fetches
      axios.get('http://localhost:8000/api/bar-chart-data')
        .then(response => {
          setChartData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching bar chart data', error);
          setError('Error fetching bar chart data');
          setLoading(false);
        });
    }
  }, [chartData, loading]);

  if (loading) return <div>Loading...</div>; // Display loading message while fetching data

  if (error) return <div>{error}</div>; // Display error message if fetching fails

  const data = {
    labels: chartData?.labels || [], // Provide default empty array if chartData is null
    datasets: [{
      label: 'Bar Chart',
      data: chartData?.data || [],  // Provide default empty array if chartData is null
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    }]
  };

  return (
    <div>
      <h2 className="font-bold text-xl">Bar Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
