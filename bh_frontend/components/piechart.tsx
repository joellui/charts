import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

interface PieChartData {
  labels: string[];
  data: number[];
}

const PieChart = () => {
  // @param chartData: PieChartData | null
  // @param setChartData: React.Dispatch<React.SetStateAction<PieChartData | null>>
  // @param loading: boolean
  // @param setLoading: React.Dispatch<React.SetStateAction<boolean>>
  // @param error: string | null
  // @param setError: React.Dispatch<React.SetStateAction<string | null>>
  // @param useEffect: React.EffectCallback
  // @param useState: <T>(initialState: T | (() => T)) => [T, React.Dispatch<React.SetStateAction<T>>]
  // @description: Define the state variables for chart data, loading state, and error message

  const [chartData, setChartData] = useState<PieChartData | null>(null); // Use defined type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Error state to track failures

  useEffect(() => {
    if (!chartData && loading) {  // Prevent multiple fetches
      axios.get('http://localhost:8000/api/pie-chart-data')
        .then(response => {
          setChartData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching pie chart data', error);
          setError('Error fetching pie chart data');
          setLoading(false);
        });
    }
  }, [chartData, loading]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>; // Display error message if fetching fails

  const data = {
    labels: chartData?.labels || [], // Provide default empty array if chartData is null
    datasets: [{
      label: 'Pie Chart',
      data: chartData?.data || [],  // Provide default empty array if chartData is null
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
    }]
  };

  return (
    <div>
      <h2 className="font-bold text-xl">Pie Chart</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
