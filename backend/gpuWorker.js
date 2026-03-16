const { parentPort } = require('worker_threads');

let gpus = [];

function generateGpu() {
    for (let i = 1; i <= 100; i++) {
        const data = {
            id: i,
            name: `GPU-${i}`,
            temp: 45, // Starting temperature
            utilization: Math.random() * 100, // Start with random load
            power: 150,
            memoryUsed: Math.random() * 16 // Assuming 16GB cards
        };
        gpus.push(data);
    }
}

function updateGpu() {
    gpus.forEach((gpu) => {
        // 1. Update Utilization (Random Walk)
        gpu.utilization += (Math.random() - 0.5) * 10;
        gpu.utilization = Math.max(0, Math.min(gpu.utilization, 100));

        // 2. Memory Usage (Roughly follows utilization)
        gpu.memoryUsed = (gpu.utilization / 100) * 16 + (Math.random() * 2);
        gpu.memoryUsed = Math.max(1, Math.min(16, gpu.memoryUsed));

        // 3. Power (Base 100W + Load)
        gpu.power = 100 + (gpu.utilization * 2.5);

        // 4. Temperature (Ambient 35°C + Utilization impact)
        // We use a small weight (0.1) to make temp changes look "smoothed"
        const targetTemp = 35 + (gpu.utilization * 0.5);
        gpu.temp += (targetTemp - gpu.temp) * 0.1 + (Math.random() - 0.5);
        
        gpu.temp = Math.max(35, Math.min(95, gpu.temp));
    });
}

generateGpu();

// Send data every 1000ms
setInterval(() => {
    updateGpu();
    parentPort.postMessage(gpus);
}, 1000);