export var printError = (error, errorNode) => {
  return error instanceof Error
    ? (errorNode.innerText = error.message || "Unknown error")
    : (errorNode.innerText = "Unknown error");
};
