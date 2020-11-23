export function createContent(contentObj) {
  let output = document.createElement(contentObj.element);
  for (let key in contentObj) {
    if (!["element", "children", "classList", "eventListeners"].includes(key)) {
      output[key] = contentObj[key];
    } else
      switch (key) {
        case "children":
          contentObj[key].forEach(element =>
            output.appendChild(createContent(element))
          );
          break;
        case "element":
          break;
        case "classList":
          contentObj[key].forEach(element => output.classList.add(element));
          break;
        case "eventListeners":
          contentObj.eventListeners.forEach(eventListener => {
            output.addEventListener(eventListener[0], eventListener[1]);
          });
          break;
        default:
          break;
      }
  }
  return output;
}

export function updateLocalStorage(newInfoArray) {
  newInfoArray.forEach(subArray => {
    localStorage.setItem(subArray[0], subArray[1]);
  });
}
