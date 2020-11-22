export function createContent(contentObj) {
  let output = document.createElement(contentObj.element);
  for (let key in contentObj) {
    if (
      ![
        "element",
        "children",
        "classList",
        "eventListeners",
        "data-toggle",
        "data-target"
      ].includes(key)
    ) {
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
        case "data-toggle":
          output.setAttribute("data-toggle", contentObj['data-toggle'])
          break;
        case "data-target":
          output.setAttribute("data-target", contentObj['data-target'])
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
