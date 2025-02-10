interface StatsProps {
  stats: string;
}

export default function OpenPaymentsGraph({
  stats,
} : StatsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-xs font-inter">Pagamentos em aberto</div>
      <div className="text-4xl font-semibold text-slate-blue">R$ 0,00</div>
    </div>
  );
}