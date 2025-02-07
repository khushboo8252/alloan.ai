import React from "react";

interface DurationSelectorProps {
  onDurationChange: (duration: string) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({ onDurationChange }) => {
  return (
    <div className="duration-selector">
      <label>Select Duration:</label>
      <select onChange={(e) => onDurationChange(e.target.value)} defaultValue="1M">
        <option value="1M">1 Month</option>
        <option value="3M">3 Months</option>
        <option value="6M">6 Months</option>
        <option value="1Y">1 Year</option>
      </select>
    </div>
  );
};

export default DurationSelector;
