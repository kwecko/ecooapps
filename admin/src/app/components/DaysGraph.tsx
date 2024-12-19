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
        backgroundColor: 'rgba(0, 140, 119, 0.1)', // Preenchimento verde claro
        borderColor: '#008C77', // Linha verde escura
        pointBackgroundColor: '#008C77', // Cor dos pontos
        pointRadius: 6, // Tamanho dos pontos
        borderWidth: 3, // Espessura da linha
        tension: 0.4, // Curvatura suave
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Remove legenda
      tooltip: {
        backgroundColor: '#EEF1F4', // Cor de fundo da tooltip
        titleFont: { size: 14 }, // Aumenta a fonte do título
        bodyFont: { size: 14 }, // Aumenta a fonte do corpo
        callbacks: {
          title: () => null, // Remove o título da tooltip
          label: (context: any) => `${context.parsed.y}`, // Mostra o valor diretamente
        },
        usePointStyle: true,
        pointStyle: '',
        titleColor: '#00735E', // Cor da fonte do título da tooltip
        bodyColor: '#00735E', // Cor da fonte do corpo da tooltip
      },
    },
    scales: {
      x: {
        display: false, // Remove o eixo X
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(229, 231, 235, 1)' }, // Grade suave
        ticks: {
          color: '#6B7280',
          font: { size: 12 },
          stepSize: 1, // Define o intervalo dos ticks para 1
          callback: (value: number) => `${value}`, // Exibe os valores como números inteiros
        },
        title: {
          display: true,
          color: '#6B7280',
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
}
