import { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const LACITY_APP_TOKEN = import.meta.env.VITE_LACITY_APP_TOKEN;

export default function AddressAutoComplete({setAddress}) {
  const [house_number, setHouse_number] = useState("");
  const [datasetLA, setDatasetLA] = useState([]);

  useEffect(() => {
    if (house_number === "") return;
    if (datasetLA.length > 0) return;

    let url = `https://data.lacity.org/resource/4ca8-mxuh.json?hse_nbr=${house_number}`;
    fetch(url, {
      headers: {
        "X-App-Token": LACITY_APP_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const arr = json.map((record) => {
          const combinedAddress = `${record.hse_nbr}${
            record.hse_frac_nbr || ""
          } ${record.hse_dir_cd || ""} ${record.str_nm} ${
            record.str_sfx_cd || ""
          } ${record.zip_cd}`;
          console.log(combinedAddress);
          return {
            ...record,
            id: record.hse_id,
            combinedAddress: combinedAddress,
          };
        });
        setDatasetLA(arr);
      });
  }, [house_number, datasetLA]);

  console.log(datasetLA);

  const handleOnSearch = (string) => {
    if (string === house_number) return;
    setHouse_number(string);
  };

  const handleOnSelect = (item) => {
    // the item selected
    setAddress({address:{
      combinedAddress: item.combinedAddress,
      zipcode: item.zip_cd,
      coord: {lat: item.lat, long: item.lon}
    }})
    console.log(item);
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {item.combinedAddress}
        </span>
      </>
    );
  };

  return (
    <>
      <ReactSearchAutocomplete
        items={datasetLA}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        onClear={() => {
          setDatasetLA([]);
        }}
        inputDebounce={400}
        formatResult={formatResult}
        placeholder="Input your house number"
        resultStringKeyName="combinedAddress"
        showIcon={false}
        autoFocus
        showItemsOnFocus={true}
        fuseOptions={{
          keys: ["combinedAddress"],
        }}
        className="shadow border rounded w-full  text-gray-700 focus:outline-none focus:shadow-outline"
        styling={{
          height: "44px",
          border: "1px solid #dfe1e5",
          borderRadius: "0.25rem",
          hoverBackgroundColor: "#eee",
          fontSize: "16px",
        }}
      />
    </>
  );
}
