import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RevenueByMethodDaily {
  date: string;
  sum: number;
  count: number;
}

interface RevenueByMethod {
  sum: number;
  count: number;
  daily: RevenueByMethodDaily[];
}

interface Stats {
  stats: RevenueByMethod;
}

export default function RevenueByPaymentMethod({ stats }: Stats) {
  const data = {
    labels: stats.daily.map((day) =>
      new Date(day.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      })
    ), // Convertendo as datas para o formato "DD/MM"
    datasets: [
      {
        label: "",
        backgroundColor: "#9BA5B7",
        data: stats.daily.map((day) => day.sum),
        borderRadius: 5,
        barThickness: 50,
        hoverBackgroundColor: "#00735E",
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
            const value = context.raw;
            return `R$${value.toLocaleString("pt-BR")}`;
          },
        },
        backgroundColor: "#ffffff",
        titleColor: "#6b7280",
        bodyColor: "#007556",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280" },
      },
      y: {
        grid: { color: "#EEF1F4" },
        ticks: {
          color: "#9BA5B7",
          callback: function (value: any) {
            return value === 0 ? `R$0` : `R$${value.toFixed(0)}`;
          },
        },
        min: 0,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
