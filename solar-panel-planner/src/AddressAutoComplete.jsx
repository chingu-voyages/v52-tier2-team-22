import { useState, useRef, useEffect } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

const AddressAutoComplete = ({
  residentFormData,
  setResidentFormData,
  handleInputChange,
}) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const [streetNum, setStreetNum] = useState("");
  const [streetName, setStreetName] = useState("");
  const [zipcode, setZipcode] = useState();
  const [datasetLA, setDatasetLA] = useState([]);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!streetNum) return;

    fetch(
      // `https://data.lacity.org/resource/4ca8-mxuh.json?pind=156A181-154`
      // `https://data.lacity.org/resource/4ca8-mxuh.json?hse_nbr=${streetNum}`
      `https://data.lacity.org/resource/4ca8-mxuh.json?hse_nbr=${streetNum}&zip_cd=${zipcode}`
    )
      .then((res) => res.json())
      .then((json) => {
        const arr = json.map((address) => {
          return {
            ...address,
            combinedStName: address.str_nm + " " + address.str_sfx_cd,
          };
        });
        setDatasetLA(arr);
      })
      .catch(() => alert("error"));
    }, [streetNum, zipcode]);
    
    console.log(datasetLA);

  useEffect(() => {
    const isIncluded = datasetLA.filter((address)=>streetName.includes(address.combinedStName))
    
    console.log(isIncluded)
  }, [streetName, datasetLA]);

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["address_components", "formatted_address"],
      componentRestrictions: { country: "us" },
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", fillInAddress);

    function fillInAddress() {
      const place = placeAutocomplete.getPlace();
      console.log(place);

      let street_address = "";
      let zipcode = "";

      for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
          case "street_number": {
            street_address = `${component.long_name} ${street_address}`;
            console.log(street_address); //532
            setStreetNum(component.long_name);
            break;
          }

          case "route": {
            street_address += component.short_name;
            let routeUpperCase = component.short_name.toUpperCase();
            setStreetName(routeUpperCase);
            break;
          }

          case "postal_code": {
            zipcode = `${component.long_name}${zipcode}`;
            setZipcode(component.long_name);
            break;
          }
        }
      }

      //保留
      setResidentFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          street_address: street_address,
          zipcode: zipcode,
        },
      }));
    }
    //保留
  }, [setResidentFormData, placeAutocomplete]);

  return (
    <>
      <article className="flex flex-col gap-2">
        <label
          htmlFor="street_address"
          className="block text-gray-700 text-sm font-bold"
        >
          Street Address
        </label>
        <input
          type="text"
          id="street_address"
          name="street_address"
          value={residentFormData.address.street_address}
          ref={inputRef}
          onChange={handleInputChange}
          placeholder="Street Address"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        />
        <label
          htmlFor="zipcode"
          className="block text-gray-700 text-sm font-bold"
        >
          Zipcode
        </label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          value={residentFormData.address.zipcode}
          onChange={handleInputChange}
          placeholder="Zipcode"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        />
      </article>
    </>
  );
};

export default AddressAutoComplete;
