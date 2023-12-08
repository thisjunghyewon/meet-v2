const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const handleInputChanged = (event) => {
    const value = event.target.value;

    if (isNaN(value) || value.trim() === "") {
      setErrorAlert("Please enter only numbers");
    } else {
      const numericValue = parseInt(value, 10);
      if (numericValue > 50) {
        setErrorAlert("Maximum number is 50");
      } else if (numericValue <= 0) {
        setErrorAlert("Minimum number is 1");
      } else {
        setErrorAlert("");
        setCurrentNOE(numericValue);
      }
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
        defaultValue="32"
        onChange={handleInputChanged}
        data-testid="numberOfEventsInput"
      />
    </div>
  );
};

export default NumberOfEvents;
