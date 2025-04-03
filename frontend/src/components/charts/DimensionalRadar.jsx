import React from 'react';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const DimensionalRadar = ({
  data,
  width,
  height,
  showLabels = true,
  showTooltips = true,
  simplified = false
}) => {
  // Convert v1 from -5/+5 to 0-10 for display purposes
  const v1Display = data.v1 + 5;
  
  // Calculate v9 average for simplified view (optional)
  const v9Avg = (data.v9_past + data.v9_present + data.v9_future) / 3;
  
  // Prepare chart data
  const chartData = {
    labels: simplified 
      ? ['Valência', 'Excitação', 'Dominância', 'Intensidade', 'Complexidade', 'Coerência', 'Flexibilidade', 'Dissonância', 'Persp. Temporal', 'Autocontrole']
      : ['Valência', 'Excitação', 'Dominância', 'Intensidade', 'Complexidade', 'Coerência', 'Flexibilidade', 'Dissonância', 'Persp. Passado', 'Persp. Presente', 'Persp. Futuro', 'Autocontrole'],
    datasets: [{
      label: 'Perfil Dimensional',
      data: simplified
        ? [v1Display, data.v2, data.v3, data.v4, data.v5, data.v6, data.v7, data.v8, v9Avg, data.v10]
        : [v1Display, data.v2, data.v3, data.v4, data.v5, data.v6, data.v7, data.v8, data.v9_past, data.v9_present, data.v9_future, data.v10],
      backgroundColor: 'rgba(76, 180, 198, 0.2)',
      borderColor: 'rgba(76, 180, 198, 0.7)',
      borderWidth: 2,
      pointBackgroundColor: [
        // Colors for different dimension groups
        'rgba(10, 29, 46, 0.8)', 'rgba(10, 29, 46, 0.8)', 'rgba(10, 29, 46, 0.8)', 'rgba(10, 29, 46, 0.8)', // Emotional
        'rgba(76, 180, 198, 0.8)', 'rgba(76, 180, 198, 0.8)', 'rgba(76, 180, 198, 0.8)', 'rgba(76, 180, 198, 0.8)', // Cognitive
        'rgba(126, 214, 232, 0.8)', 'rgba(126, 214, 232, 0.8)', 'rgba(126, 214, 232, 0.8)', 'rgba(126, 214, 232, 0.8)', // Autonomy
      ].slice(0, simplified ? 10 : 12),
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(76, 180, 198, 1)',
    }]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2,
          display: showLabels,
          backdropColor: 'rgba(255, 255, 255, 0.8)',
          color: 'rgba(0, 0, 0, 0.7)',
        },
        pointLabels: {
          color: 'rgba(0, 0, 0, 0.7)',
          font: {
            size: simplified ? 10 : 12
          },
          display: showLabels
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: showLabels && !simplified,
      },
      tooltip: {
        enabled: showTooltips,
        callbacks: {
          label: function(context) {
            const index = context.dataIndex;
            let value = context.raw;
            
            // Adjust v1 display value back to -5/+5 range for tooltip
            if (index === 0) {
              value = value - 5;
              return `Valência: ${value}`;
            }
            
            return `${context.chart.data.labels[index]}: ${value}`;
          }
        }
      }
    },
  };

  return (
    <div style={{ width: width || '100%', height: height || 300 }}>
      <Radar data={chartData} options={chartOptions} />
    </div>
  );
};

export default DimensionalRadar;