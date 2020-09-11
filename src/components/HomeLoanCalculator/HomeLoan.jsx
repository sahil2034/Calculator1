import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Marks from "./HomeLoanRange";
import InterestRange from "./InterestRateRange";
import NumberFormat from "react-number-format";
import CalculateRates from "./CaclulateRates";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function HomeLoan() {
  const customStyle = {
    color: "orange",
    width: "300px"
  };

  const [customTenure, setCustomTenure] = useState({
    min: 0,
    max: 12,
    step: 1
  });

  const { t } = useTranslation();

  function handleClickTranslate(lang) {
    i18next.changeLanguage(lang);
  }

  const [homeLoanAmount, setHomeLoanAmount] = React.useState(0);
  const [interestRate, setInterestRate] = React.useState(0);
  const [tenure, setTenure] = useState(0);
  const [emi1, setEMI1] = useState(interestRate * 0.01);
  const [emi, setEMI] = useState(emi1 * homeLoanAmount);
  const [totalEMI, setTotalEMI] = useState(emi * tenure);
  const [payment, setPayment] = useState(homeLoanAmount + totalEMI);

  function handleHomeLoan(event) {
    setHomeLoanAmount(event.target.value.replace(/,/g, ""));
  }

  function handleInterestRate(event) {
    setInterestRate(event.target.value);
  }
  function handleHomeLoanSlider(event, value) {
    setHomeLoanAmount(value);
  }

  function handleInterestRateSlider(event, value) {
    setInterestRate(value);
  }

  function handleTenureSlider(event, value) {
    setTenure(value);
  }

  function handletenure(event) {
    setTenure(+event.target.value);
  }

  function handleClick(event) {
    if (event.target.value === "Mo") {
      setCustomTenure((prevValue) => {
        return { ...prevValue, max: 12 };
      });
    } else if (event.target.value === "Yr") {
      setCustomTenure((prevValue) => {
        return { ...prevValue, max: 30 };
      });
    }
  }

  function calculate(event) {
    setEMI1(interestRate * 0.01);
    setEMI(emi1 * homeLoanAmount);
    //below is total interest payable; change the formula accordingly casue i am not sure of this one
    setTotalEMI(emi * tenure);
    setPayment(homeLoanAmount + totalEMI);
    console.log(payment);
    event.preventDefault();
  }

  return (
    <div className="App">
      <nav
        style={{ width: "100%", padding: "2rem 0", backgroundColor: "gray" }}
      >
        <button onClick={() => handleClickTranslate("en")}>English</button>
        <button onClick={() => handleClickTranslate("fr")}>French</button>
      </nav>
      <div className="frame">
        <form onSubmit={calculate}>
          {/* --------------------HOME LOAN ----------------------------- */}
          <h2 className="setColor">{t("HomeLoan.1")}</h2>
          <NumberFormat
            value={homeLoanAmount}
            onChange={handleHomeLoan}
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
          />
          <Slider
            style={customStyle}
            onChange={handleHomeLoanSlider}
            min={0}
            max={20000000}
            defaultValue={0}
            value={homeLoanAmount}
            aria-labelledby="discrete-slider-custom"
            marks={Marks.map((ele) => ele)}
          />
          <button type="button" className="btn btn-secondary btn-outline-light">
            $
          </button>
          {/* ---------------------INTEREST RATE----------------------------------- */}
          <h2>{t("InterestRate.1")}</h2>
          <input
            type="text"
            onChange={handleInterestRate}
            value={interestRate}
          />
          <Slider
            style={customStyle}
            onChange={handleInterestRateSlider}
            min={0}
            max={20}
            step={2.5}
            defaultValue={0}
            value={interestRate}
            aria-labelledby="discrete-slider-custom"
            marks={InterestRange.map((ele) => ele)}
          />
          <button type="button" className="btn btn-secondary btn-outline-light">
            %
          </button>
          {/*---------------------TENURE-------------------------------  */}
          <p className="text">{t("LoanTenure.1")}</p>
          <input
            className="bar"
            onChange={handletenure}
            type="number"
            placeholder="Enter Tenure"
            value={tenure}
          />
          <button onClick={handleClick} value="Yr">
            Yr
          </button>
          <button onClick={handleClick} value="Mo">
            Mo
          </button>
          <Slider
            style={customStyle}
            min={customTenure.min}
            max={customTenure.max}
            onChange={handleTenureSlider}
            value={tenure}
            marks={true}
            valueLabelDisplay="on"
          />
          <button className="submit">calculate</button>
        </form>
      </div>

      <hr />
      <CalculateRates
        emi={emi}
        totalEMI={totalEMI}
        payment={payment}
        homeLoanAmount={homeLoanAmount}
        payments={payment}
        t={t}
      />
    </div>
  );
}

export default HomeLoan;
