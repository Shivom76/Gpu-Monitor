// import {io} from "socket.io-client"
// const url="http://localhost:9090"
// const socket=io(`${url}`)

// import GpuStream from "./components/GpuStream"

// import {useState,useEffect} from "react"

// import './App.css'

// function App() {

//   return(
//     <>
//       <h1 className="text-red-700">GPU Health</h1>
//           <GpuStream />
//     </>
//   )
// }

// export default App




import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import GpuStream from "./components/GpuStream";
import TemperatureChart from "./components/TemperatureChart";

const socket = io("http://localhost:9090");

// --- Helper Component Defined Here ---
function AlertItem({ message, type }) {
  const colors = type === 'danger' ? 'text-rose-400 border-rose-500/20' : 'text-amber-400 border-amber-500/20';
  return (
    <div className={`text-[11px] p-3 rounded bg-slate-950/50 border ${colors} font-bold`}>
      [{new Date().toLocaleTimeString()}] {message}
    </div>
  );
}

export default function App() {
  const [gpuData, setGpuData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    socket.on("gpu-data", (data) => {
      setGpuData(data);

      const avgTemp = data.reduce((acc, gpu) => acc + (gpu.temp || 0), 0) / data.length;

      setHistoryData(prev => {
        const newPoint = { 
          time: new Date().toLocaleTimeString([], { second: '2-digit' }), 
          temp: avgTemp 
        };
        const updated = [...prev, newPoint];
        return updated.slice(-20); 
      });
    });
    return () => socket.off("gpu-data");
  }, []);

  return (
    <>

    {/* Heading of the page for nav bar */}
    {/* GPU Cluster Monitor */}

    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-mono p-6">
      <main className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <TemperatureChart data={historyData} />
          <GpuStream gpuData={gpuData} />
        </div>
        
        <aside className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-2xl">
            <h2 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-widest">Live Alerts</h2>
            <div className="space-y-3">
              {/* Now this works because AlertItem is defined above! */}
              <div className="space-y-3">
                {gpuData.filter(gpu => gpu.temp > 80).map(gpu => (
                  <AlertItem key={gpu.id} message={`${gpu.id}: Overheating Alert!`} type="danger" />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
    </>
  );
}