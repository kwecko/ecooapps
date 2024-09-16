import React from "react";

import fakedata from "./fakedata";

interface PendingDeliveriesTableProps {
  numberOfItems: number;
}

export function PendingDeliveriesTable({
  numberOfItems,
}: PendingDeliveriesTableProps) {
  const itemsToShow = fakedata.slice(0, numberOfItems);

  const rowStyle = {
    height: "42px",
  };

  return (
    <table className="text-theme-primary mb-[30px] font-inter">
      <tbody className="text-center"></tbody>
    </table>
  );
}
