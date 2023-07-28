import React from "react";

const Message = ({ data }: { data: any }) => {
  const { country, active, deaths, recovered } = data;
  return (
    <div className="p-4 text-left gap-y-10 max-w-sm w-full h-full">
      <p>Country : {country}</p>
      <p>Active Cases : {active}</p>
      <p>Total Recovered : {recovered}</p>
      <p>Total Deaths : {deaths}</p>
    </div>
  );
};

export default Message;
