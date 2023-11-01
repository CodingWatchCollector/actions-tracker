import { setResults, getResults } from "./storage.js";

var newFormDialog = document.getElementById("new-form-dialog");

var openDialog = () => {
  newFormDialog.showModal();
};
var closeDialog = () => {
  newFormDialog.close();
};
newFormDialog.addEventListener(
  "click",
  (e) => {
    if (!newForm.contains(e.target)) {
      closeDialog();
    }
  },
  false
);
