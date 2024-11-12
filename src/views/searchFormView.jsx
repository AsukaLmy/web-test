export function SearchFormView(props) {
  const {
    dishTypeOptions,
    text,
    type,
    onTextChange,
    onTypeChange,
    ondishSearch,
  } = props;

  // when someone typing
  function handleTextChange(event) {
    if (onTextChange) {
      onTextChange(event.target.value);
    }
  }

  // when dishtype is changed
  function handleTypeChange(event) {
    if (onTypeChange) {
      onTypeChange(event.target.value);
    }
  }

  // search button clicked
  function handleSearchClick() {
    if (ondishSearch) {
      ondishSearch();
    }
  }

  return (
    <div>
      <input
        value={text || ''}
        onChange={handleTextChange}
      />
      <select
        value={type || ''}
        onChange={handleTypeChange}
      >
        <option value="">
          Choose:
        </option>
        {dishTypeOptions.map(optionString => (
          <option key={optionString} value={optionString}>
            {optionString}
          </option>
        ))}
      </select>
      <button onClick={handleSearchClick}>
        Search!
      </button>
    </div>
  );
}
