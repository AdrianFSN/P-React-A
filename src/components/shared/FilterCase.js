import "./FilterCase.css";

function FilterCase({ ...props }) {
  return (
    <section>
      <label>
        <input
          className="FilterCase-input"
          type="text"
          placeholder="Filter"
          {...props}
        ></input>
      </label>
    </section>
  );
}
export default FilterCase;
