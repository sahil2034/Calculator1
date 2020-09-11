import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ principalAmount, totalInterest, t }) {
  var state = {
    labels: [t("HomeLoan.5"), t("InterestRate.3")],
    datasets: [
      {
        data: [principalAmount, totalInterest],
        backgroundColor: ["green", "orange"]
      }
    ]
  };

  return (
    <div>
      <h3>{t("HomeLoan.4")}</h3>
      <Pie
        data={{
          labels: state.labels,
          datasets: state.datasets
        }}
        height="50%"
      />
    </div>
  );
}

export default PieChart;
