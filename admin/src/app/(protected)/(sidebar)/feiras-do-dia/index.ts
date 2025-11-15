"use client";

import { useState } from "react";

export type ModalKeys = "isOpenCreateMarketModal";

export default function useMarketsPage() {
  const [modals, setModals] = useState<Record<ModalKeys, boolean>>({
    isOpenCreateMarketModal: false,
  });

  const toggleModal = (key: ModalKeys) => {
    setModals((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return {
    toggleModal,
    isOpenCreateMarketModal: modals.isOpenCreateMarketModal,
  };
}

