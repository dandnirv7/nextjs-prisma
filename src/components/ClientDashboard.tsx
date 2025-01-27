"use client";

import { ButtonLogout } from "./ButtonLogout";

export const ClientDashboard = () => {
  return (
    <div className="flex flex-row justify-between items-center px-20 py-5">
      <p>Konten Dasbor</p>
      <ButtonLogout />
    </div>
  );
};
