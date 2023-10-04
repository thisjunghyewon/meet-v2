const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const handleInputChanged = (event) => {
    const value = event.target.value;

    if (isNaN(value)) {
      setErrorAlert("value is not a number");
    } else if (value > 50) {
      setErrorAlert("maximum number is 50");
    } else if (value <= 0) {
      setErrorAlert("minimum number is 1");
    } else {
      setErrorAlert("");
      setCurrentNOE(value);
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
