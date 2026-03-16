// import {io} from "socket.io-client"
// const url="http://localhost:9090"
// const socket=io(`${url}`)

// import {useState,useEffect} from "react"

// export default function GpuStream(){

//     let [gpuData,setGpuData]=useState([])
    
//     useEffect(()=>{
//         socket.on("gpu-data",(data)=>{
//         setGpuData(data)
//         })
//     },[])

//     return(
//         <div>
//             {gpuData.map((gpu)=>{
//                 return(
//                     <div>
//                         <p>Id:{gpu.id}</p>
//                         <p>Name:{gpu.name}</p>
//                         <p>Temp:{gpu.temp.toFixed(2)}</p>
//                         <p>Utilization:{gpu.utilization.toFixed(2)}</p>
//                         <p>Power:{gpu.power.toFixed(1)}</p>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }



import GpuCard from "./GpuCard";

// Accept gpuData as a prop from App.jsx
export default function GpuStream({ gpuData }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {gpuData.map((gpu) => (
        <GpuCard key={gpu.id} gpu={gpu} />
      ))}
    </div>
  );
}