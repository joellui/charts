"use client";
import LineChart from "@/components/linechart";
import PieChart from "@/components/piechart";
import BarChart from "@/components/barchart";
import CandleStickChart from "@/components/candleStick";


export default function Home() {
  return (
    <div className="border-2 bg-slate-50 border-black w-9/12 rounded-xl h-auto p-5 m-5 flex flex-col gap-10" >

      <LineChart />
      <PieChart />
      <BarChart />
      <CandleStickChart />

    </div>
  );
}
