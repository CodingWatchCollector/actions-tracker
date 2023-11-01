var resultsName = "results";
var itemsFromStorage = localStorage.getItem(resultsName);
export var getResults = () => {
  try {
    return JSON.parse(localStorage.getItem(resultsName));
  } catch (err) {
    alert("Something went wrong :(");
    throw err;
  }
};
export var setResults = (results) => {
  try {
    localStorage.setItem(resultsName, JSON.stringify(results));
  } catch (err) {
    alert("Something went wrong :(");
    throw err;
  }
};

if (!itemsFromStorage) {
  setResults([]);
}
