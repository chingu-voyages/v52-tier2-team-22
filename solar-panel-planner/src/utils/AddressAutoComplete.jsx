import { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";


// const LACITY_APP_TOKEN = import.meta.env.VITE_LACITY_APP_TOKEN;

export default function AddressAutoComplete({ setAddress }) {
  const [datasetLA, setDatasetLA] = useState([]);

  useEffect(() => {
    let url = `https://data.lacity.org/resource/4ca8-mxuh.json?$limit=50000`;

    function fetchDatasetLA(url) {
      fetch(url, {
        headers: {
          // "X-App-Token": LACITY_APP_TOKEN,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          const arr = json?.map((record) => {
            // console.log(record.hse_nbr)
            const combinedAddress = `${record.hse_nbr}${
              record.hse_frac_nbr || ""
            } ${record.hse_dir_cd || ""} ${record.str_nm} ${
              record.str_sfx_cd || ""
            }`;

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
  }, []);

  const handleOnSelect = (item) => {
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
        onSelect={handleOnSelect}
        onClear={() => {
          setAddress({
            combinedAddress: "",
            zipcode: "",
            coord: { lat: "", lng: "" },
          });
        }}
        inputDebounce={300}
        showNoResultsText={"Loading..."}
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
        styling={{
          borderRadius: "0.375rem",
        }}
      />
    </>
  );
}
