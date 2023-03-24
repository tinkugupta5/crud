import React, { useState } from "react";
import PhoneInput from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import axios from "axios";
import PropTypes from "prop-types";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";

const CountrySelect = ({ value, onChange, labels, ...rest }) => (
  <select
    {...rest}
    value={value}
    onChange={(event) => onChange(event.target.value || undefined)}
  >
    <option value="">{labels["ZZ"]}</option>
    {getCountries().map((country) => (
      <option key={country} value={country}>
        {labels[country]} +{getCountryCallingCode(country)}
      </option>
    ))}
  </select>
);

CountrySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
};

const Example = () => {
  const [country, setCountry] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneNumber1, setPhoneNumber1] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Country:", country);
    console.log("Country Code:", `+${getCountryCallingCode(country)}`);
    console.log("Phone Number:", phoneNumber);
    console.log("First Name:", phoneNumber1);

    try {
      const response = await axios.post("https://example.com/api/submit", {
        country: country,
        countryCode: `+${getCountryCallingCode(country)}`,
        phoneNumber: phoneNumber,
        phoneNumber1: phoneNumber1,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Country:</label>
        <CountrySelect labels={en} value={country} onChange={setCountry} />
      </div>
      <div>
        <label>Phone Number:</label>
        <PhoneInput
          value={phoneNumber}
          onChange={setPhoneNumber}
          defaultCountry={country}
        />
      </div>

      <div>
        <label>Phone Number:</label>
        <PhoneInput
          value={phoneNumber1}
          onChange={setPhoneNumber1}
          defaultCountry={country}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Example;
