import { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const LACITY_APP_TOKEN = import.meta.env.VITE_LACITY_APP_TOKEN;

export default function AddressAutoComplete({ setAddress }) {
  const [house_number, setHouse_number] = useState("");
  const [datasetLA, setDatasetLA] = useState([]);

  useEffect(() => {
    if (house_number === "") return;
    if (datasetLA.length > 0) return;

    let url = `https://data.lacity.org/resource/4ca8-mxuh.json?hse_nbr=${house_number}`;

    function fetchDatasetLA(url) {
      fetch(url, {
        headers: {
          // "X-App-Token": LACITY_APP_TOKEN,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          const arr = json?.map((record) => {
            const combinedAddress = `${record.hse_nbr}${
              record.hse_frac_nbr || ""
            } ${record.hse_dir_cd || ""} ${record.str_nm} ${
              record.str_sfx_cd || ""
            } ${record.zip_cd}`;

            return {
              ...record,
              id: record.hse_id,
              combinedAddress: combinedAddress,
            };
          });

          setDatasetLA(arr);
        })
        .catch((error) => console.error("Network error", error));
    }

    fetchDatasetLA(url);
  }, [house_number]);

  const handleOnSearch = (string) => {
    if (string === house_number || string === "") return;

    setHouse_number(string);
  };

  const handleOnSelect = (item) => {
    console.log(Number(item.lat));
    setAddress({
      combinedAddress: item.combinedAddress,
      zipcode: item.zip_cd,
      coord: { lat: Number(item.lat), lng: Number(item.lon) },
    });
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
          setHouse_number("");
          setDatasetLA([]);
        }}
        inputDebounce={400}
        formatResult={formatResult}
        placeholder="Input your house number"
        resultStringKeyName="combinedAddress"
        showIcon={false}
        maxResults={15}
        fuseOptions={{
          keys: ["combinedAddress"],
          location: 0,
          shouldSort: true,
          distance: 0,
          minMatchCharLength: 2,
        }}
        className="shadow border rounded w-full  text-red-600 focus:outline-none focus:shadow-lg"
        styling={{
          height: "44px",
          border: "1px solid #FF0000",
          borderRadius: "0.25rem",
          hoverBackgroundColor: "#FF0000",
          fontSize: "16px",
        }}
      />
    </>
  );
}
