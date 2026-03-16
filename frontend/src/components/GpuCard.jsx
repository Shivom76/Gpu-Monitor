export default function GpuCard({ gpu }) {
    // Logic for neon status colors
    let statusColor = "emerald"; // Stable
    if (gpu.temp > 80) statusColor = "rose"; // Overheating
    else if (gpu.temp > 65) statusColor = "amber"; // Warning

    const glowStyles = {
        emerald: "border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] text-emerald-400",
        amber: "border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)] text-amber-400",
rose: "border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.1)] text-rose-400 animate-pulse",
    };

    return (
        <div className={`bg-slate-900/80 border ${glowStyles[statusColor]} p-4 rounded-xl transition-all duration-500`}>
        <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-black uppercase opacity-50 tracking-widest text-white">
            Node // {gpu.id}
            </span>
            <div className={`w-2 h-2 rounded-full bg-current shadow-[0_0_8px_currentColor]`} />
        </div>

        <div className="space-y-3">
            <div>
            <span className="text-[10px] text-slate-500 uppercase block">Temperature</span>
            <span className="text-xl font-bold tracking-tighter">{gpu.temp.toFixed(1)}°C</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
            <div>
                <span className="text-[9px] text-slate-500 uppercase block text-[8px]">Utilization</span>
                <span className="text-xs font-bold text-slate-300">{gpu.utilization.toFixed(0)}%</span>
            </div>
            <div>
                <span className="text-[9px] text-slate-500 uppercase block text-[8px]">Power</span>
                <span className="text-xs font-bold text-slate-300">{gpu.power.toFixed(0)}W</span>
            </div>
            </div>
        </div>
        
        {/* Mini Progress Bar */}
        <div className="mt-4 h-[2px] w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
            className="h-full bg-current transition-all duration-1000" 
            style={{ width: `${gpu.utilization}%` }}
            />
        </div>
        </div>
    );
}