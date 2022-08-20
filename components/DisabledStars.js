const DisabledStar = (props) => {
  const changeRating = (e) => {
    props.changeRating(e.target.value);
  };

  return (
    <label className="starDisabled">
      <input
        type="radio"
        name="rating"
        value={props.index}
        className="starDisabled_radio-input"
        onClick={changeRating}
      />

      <svg
        width="35"
        height="35"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={props.style}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </label>
  );
};

export default DisabledStar;
