import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StatsProps {
  stats: Record<string, number>;
}

export default function MonthsGraph({
  stats,
}: StatsProps) {

  const numberOfMonths = stats ? Object.keys(stats).length : 0;
  const barThickness = numberOfMonths === 6 ? 35 : 50;

  const data = {
    labels: stats ? Object.keys(stats).map(month => new Date(0, parseInt(month) - 1).toLocaleString('en-US', { month: 'short' })) : [],
    datasets: [
      {
        label: 'Faturamento',
        backgroundColor: '#9BA5B7',
        data: stats ? Object.values(stats) : [],
        borderRadius: 5,
        barThickness: barThickness,
        hoverBackgroundColor: '#00735E',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw; // Valor da barra
            return `R$${value.toLocaleString('pt-BR')}`; // Formatação para R$1.893
          },
        },
        backgroundColor: '#ffffff',
        titleColor: '#6b7280',
        bodyColor: '#007556',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280' },
      },
      y: {
        grid: { color: '#EEF1F4' },
        ticks: {
          color: '#9BA5B7',
          callback: function (value: any) {
            return `R$${(value / 1000).toFixed(0)}k`;
          },
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}