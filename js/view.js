function displayContent() {
  var huffString = document.getElementById("huffString").value;
  var huffArr = [];
  huffArr = huffString.split(",").map(Number);
  huffArrStore = [[]];
  huffArrStore[huffArrStore.length-1] = huffArr.slice();

  while (huffArr.length!=1) {
    huffArr[huffArr.length-2] = huffArr[huffArr.length-1] + huffArr[huffArr.length-2];
    huffArr.pop();
    huffArrStore[huffArrStore.length] = huffArr.slice();
  }

  var output = "";

  for (huffarrItr of huffArrStore) {
    for (huffEle of huffarrItr) {
      output += huffEle + " ";
    }
    output += "<br>"
  }

  document.getElementById("output").innerHTML = output;
}
