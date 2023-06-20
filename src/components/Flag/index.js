import React from "react";
import ReactCountryFlag from "react-country-flag";
import Select, { components } from "react-select";

// interface FlagProps {
//    value: string;
//    onChange: any;
// }

const Flag = ({ value = "55", onChange, ...rest }) => {
  const iconOptions = [
    {
      value: "BR",
      label: "Brasil",
      icon: (
        <ReactCountryFlag
          className="country-flag"
          countryCode="br"
          svg
          sizes="14"
        />
      ),
    },
    {
      value: "USA",
      label: "Estados Unidos",
      icon: (
        <ReactCountryFlag
          className="country-flag"
          countryCode="us"
          svg
          sizes="14"
        />
      ),
    },
  ];

  const OptionComponent = ({ data, ...props }) => {
    const { icon, label } = data;

    return (
      <components.Option {...props}>
        {React.cloneElement(icon, { className: "country-flag" })}
        <span className="ms-1">{label}</span>
      </components.Option>
    );
  };

  return (
    <Select
      id="RecipientCountry"
      name="RecipientCountry"
      options={iconOptions}
      className="react-select"
      classNamePrefix="select"
      placeholder="Selecione o código do país..."
      components={{
        Option: OptionComponent,
      }}
      value={iconOptions.find((item) => item.value === value) ?? null}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Flag;
