import clsx from "clsx";
import "./SelectMenu.css";
import { useEffect, useState } from "react";
import { getTags } from "../../pages/adverts/service";

const SelectMenu = ({ className, label, optionsArray, ...props }) => {
  const [availableTags, setAvailableTags] = useState([]);
  const [error, setError] = useState(null);

  const resetError = () => setError(null);

  useEffect(() => {
    if (optionsArray) {
      setAvailableTags(optionsArray);
    } else {
      const getTagsFromApi = async () => {
        try {
          const response = await getTags();
          setAvailableTags(response);
        } catch (error) {
          setError(error.message);
        }
      };
      getTagsFromApi();
    }
  }, [optionsArray]);

  return (
    <div>
      <select className={clsx("select-menu", className)} {...props}>
        {availableTags.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div>
        {error && (
          <div
            className="Nodepop-error"
            onClick={resetError}
          >{`${error}. Click this banner to get back`}</div>
        )}
      </div>
    </div>
  );
};

export default SelectMenu;
