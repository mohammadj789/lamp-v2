import React from "react";
import InventoryItemList from "../components/header/InventoryItemList";

const page = () => {
  return (
    <main className="w-full text-white px-3 flex flex-col gap-3 pt-16">
      {" "}
      <InventoryItemList hide />
    </main>
  );
};

export default page;
