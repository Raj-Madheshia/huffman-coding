function huffClass(probability, name, value) {
  this.probability = probability;
  this.name = name;
  this.value = value;
};

function displayContent() {
  var huffString = document.getElementById("huffString").value;

  var huffArr = [];
  var huffArrStore = [];

  huffArr = huffString.split(",").map(Number);
  var j = huffArrStore.length;
  console.log(j);
  huffArrStore[0] = [];
  for(var i=0; i < huffArr.length; i++){
    var huffobj = new huffClass(
      huffArr[i],
      'x' + i,
      -1
    );
    huffArrStore[0][i] = huffobj;
  }

  huffArrStore[j][huffArrStore[j].length-2].value=0;
  huffArrStore[j][huffArrStore[j].length-1].value=1;

  while (huffArr.length!=1) {
    huffArr[huffArr.length-2] = huffArr[huffArr.length-1] + huffArr[huffArr.length-2];
    huffArr.pop();
    j = huffArrStore.length;
    huffArrStore[j] = [];
    console.log(j);
    for(var i=0; i < huffArr.length; i++){
      var huffobj = new huffClass(
        huffArr[i],
        'x' + i,
        -1
      );
      huffArrStore[j][i] = huffobj;
    }

    huffArrStore[j][huffArrStore[j].length-2].value=0;
    huffArrStore[j][huffArrStore[j].length-1].value=1;
  }

  console.log(huffArrStore);

  // var output = "";
  //
  // for (huffarrItr of huffArrStore) {
  //   for (huffEle of huffarrItr) {
  //     output += huffEle + " ";
  //   }
  //   output += "<br>"
  // }
  //
  // document.getElementById("output").innerHTML = output;
}
