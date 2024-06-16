import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Slider.css";
import { useState } from "react";

const SliderNodePop = ({ className, label, ...props }) => {
  const [value, setValue] = useState(0);

  const handleSliderChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className={className}>
      <Slider value={value} onChange={handleSliderChange} {...props} />
      <p>{label}</p>
    </div>
  );
};

export default SliderNodePop;
