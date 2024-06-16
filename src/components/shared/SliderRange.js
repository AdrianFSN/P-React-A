import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Slider.css";
import { useState } from "react";

const SliderRange = ({
  className,
  label,
  defaultValue,
  min,
  max,
  onChange,
  ...props
}) => {
  const [range, setRange] = useState(defaultValue || [min, max]);

  const handleSliderChange = (newValue) => {
    setRange(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={className}>
      <Slider
        range
        value={range}
        min={min}
        max={max}
        onChange={handleSliderChange}
        {...props}
      />
      <p>{label}</p>
    </div>
  );
};

export default SliderRange;
