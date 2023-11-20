import React from "react";
import { InventoryItem } from "./InventoryItem";

const InventoryItemList = async () => {
  const response = await fetch("http://localhost:4000/collection", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTVhNTUwNDcwZDVjZmYyMzU5NTYyNmYiLCJpYXQiOjE3MDA0MTg4MjAsImV4cCI6MTcwMTAyMzYyMH0.ZUsQCkFjrS0MuEL7-1QCYhXV8kWsYP9tKleDl3OZPn0",
    },
    cache: "no-cache",
  });
  const data = await response.json();
  const playlists = [
    ...data.collectioans.wished,
    ...data.collectioans.me,
  ];

  return (
    <div className="h-2/3 pt-3 overflow-auto">
      {playlists.map((item) => (
        <InventoryItem
          key={item._id}
          // isPlaying
          image={
            item.image
              ? "http://localhost:4000" + item.image
              : "/hill.jpg"
          }
          title={item.title}
          type={item.type}
          id={item._id}
          credit="travis scott"
        />
      ))}
      {/* <InventoryItem
        isPlaying
        image={"/hill.jpg"}
        title="UTOPIA"
        type="Album"
        credit="travis scott"
      /> 
       <InventoryItem
        image={"/girl.jpg"}
        title="Metro Boomin"
        type="Artist"
      />
      */}
    </div>
  );
};
export default InventoryItemList;
