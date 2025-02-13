import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

interface StatsProps {
  stats: Record<string, number>;
}

export default function DaysGraph({
  stats
}: StatsProps) {

  const labels = Object.keys(stats);
  const values = Object.values(stats);

  const data = {
    labels: labels,
    datasets: [
      {
        data: labels,
        fill: true,
        backgroundColor: 'rgba(0, 140, 119, 0.1)',
        borderColor: '#008C77',
        pointBackgroundColor: '#008C77',
        pointRadius: 6,
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#EEF1F4',
        titleFont: { size: 14 },
        bodyFont: { size: 14 },
        callbacks: {
          title: () => '',
          label: (context: any) => `${context.parsed.y}`,
        },
        usePointStyle: true,
        titleColor: '#00735E',
        bodyColor: '#00735E',
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6B7280' },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(229, 231, 235, 1)' },
        ticks: {
          color: '#6B7280',
          font: { size: 12 },
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
}
