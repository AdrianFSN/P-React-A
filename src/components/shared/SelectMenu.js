import clsx from "clsx";
import "./SelectMenu.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListOfTags, getUi } from "../../store/selectors";
import { loadTags, uiResetError } from "../../store/actions";

const SelectMenu = ({ className, label, optionsArray, ...props }) => {
  const dispatch = useDispatch();
  const availableTags = useSelector(getListOfTags);
  const { error } = useSelector(getUi);

  const resetError = () => dispatch(uiResetError());

  useEffect(() => {
    if (!availableTags.length) {
      dispatch(loadTags());
    }
  }, [dispatch, availableTags]);

  if (!availableTags.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <select
        className={clsx("select-menu", className)}
        {...props}
      >
        {availableTags.map((item, index) => (
          <option
            key={index}
            value={item}
          >
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
