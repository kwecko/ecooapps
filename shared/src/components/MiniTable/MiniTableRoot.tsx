import React, { ReactNode } from "react";
import styles from "./MiniTable.module.css";

interface MiniTableRootProps {
  children: ReactNode;
}

export default function MiniTableRoot({ children }: MiniTableRootProps) {
  return (
    <div className="w-full h-full overflow-y-auto rounded-xl">
      <table
        className={`${styles.table} p-2 pt-1 text-[#545F71] w-full self-center`}
      >
        {children}
      </table>
    </div>
  );
}
