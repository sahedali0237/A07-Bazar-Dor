"use client";

const CurrentDate = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return <>{date}</>;
};

export default CurrentDate;
