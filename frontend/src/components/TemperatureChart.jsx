import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
  } from "recharts";
  
  export default function TemperatureChart({ data }) {
    return (
      <div className="h-[300px] w-full bg-slate-900/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Thermal Trend // Cluster Average
          </h3>
          <div className="flex items-center gap-2">
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="text-[10px] text-rose-500 font-bold uppercase">Live</span>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            
            <XAxis 
              dataKey="time" 
              hide={false} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#475569', fontSize: 10 }}
              minTickGap={30}
            />
            
            <YAxis 
              hide={false} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#475569', fontSize: 10 }}
              domain={[0, 100]} // Since temp is likely 0-100C
            />
  
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '11px',
                color: '#fff'
              }}
              itemStyle={{ color: '#f43f5e' }}
              cursor={{ stroke: '#1e293b', strokeWidth: 2 }}
            />
            
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="#f43f5e" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorTemp)" 
              isAnimationActive={true}
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }