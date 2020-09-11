import React from "react";
import PieChart from "./PieChart";
import NumberFormat from "react-number-format";

function CalculateRates(props) {
  return (
    <div>
      <div className="framing">
        <p>{props.t("HomeLoan.2")}</p>
        <NumberFormat
          displayType={"text"}
          thousandSeparator={true}
          thousandsGroupStyle="lakh"
          prefix={props.t("Currency.1")}
          value={props.emi}
        />
      </div>
      <hr />
      <div className="framing">
        <p>{props.t("InterestRate.2")}</p>
        <NumberFormat
          displayType={"text"}
          thousandSeparator={true}
          thousandsGroupStyle="lakh"
          prefix={props.t("Currency.1")}
          value={props.totalEMI}
        />
      </div>
      <hr />
      <div className="framing">
        <p>{props.t("HomeLoan.3")}</p>
        <NumberFormat
          displayType={"text"}
          thousandSeparator={true}
          thousandsGroupStyle="lakh"
          prefix={props.t("Currency.1")}
          value={props.payment}
        />
      </div>
      <hr />
      <PieChart
        principalAmount={props.homeLoanAmount}
        totalInterest={props.payments}
        t={props.t}
      />
    </div>
  );
}

export default CalculateRates;
