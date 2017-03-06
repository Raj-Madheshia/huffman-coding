/*****************************************************
          HUFFMAN CODE IN JAVASCRIPT

- A javascript of huffman coding
- Makes use of dynamic multi-dimensional array
  to store the tree structure

- Current Version (alpha 1.0.5)

*****************************************************/

//Create a prototype for the huffman object
function huffClass(probability, name, value, parent) {
  this.probability = probability;
  this.name = name;
  this.value = value;
  this.parent = parent;
};

//Global variables
var huffArr;
var huffString;
var huffArrStore;

function wordIdentifier(){
  //Get input String
  var huffString = document.getElementById("huffString").value;

  /* returns the size/length of an object */
  Object.size = function(obj) {
  	var size = 0;
  	for(key in obj) {
  		if(obj.hasOwnProperty(key)) size++;
  	}
  	return size;
  }

  //initial vars
  huffLetters = new Object;

  //loop, figure it out
  for(x = 0, length = huffString.length; x < length; x++) {
  	var l = huffString.charAt(x)
  	huffLetters[l] = (isNaN(huffLetters[l]) ? 1 : huffLetters[l] + 1);
  }

  //output count!
  for(key in letters) {
  	console.log(key + ' :: ' + letters[key]);
  }
  console.log(Object.size(letters));
}

function displayTree(){

  //Display the output to html
  //var output = "Calculation : <br>";

  // for (huffarrItr of huffArrStore) {
  //   for (huffEle of huffarrItr) {
  //     output += huffEle.probability + "&nbsp;&nbsp;&nbsp;";
  //   }
  //   output += "<br>"
  // }

  //document.getElementById("output").innerHTML = output;

  var outputDiv = document.getElementById("output");

  var heading = document.createElement("h3");
  heading.className = "heading";
  heading.innerHTML = "Calculations";
  outputDiv.appendChild(heading);

  var colSpan = document.createElement("span");
  colSpan.className = "column";
  outputDiv.appendChild(colSpan);

  for(huffEle of huffArrStore[0]){
    var cell = document.createElement("span");
    cell.className = "cell-head";
    cell.innerHTML = huffEle.name ;
    colSpan.appendChild(cell);
  }

  for (huffarrItr of huffArrStore) {
    var colSpan = document.createElement("span");
    colSpan.className = "column";
    outputDiv.appendChild(colSpan);

    for(huffEle of huffarrItr){
      var cell = document.createElement("span");
      cell.className = "cell"
      cell.innerHTML = huffEle.probability ;
      colSpan.appendChild(cell);
    }
  }

}

function calcCode(){

  //[parse the tree]
  var codeDiv = document.getElementById("codeDiv");

  var heading = document.createElement("h3");
  heading.className = "heading";
  heading.innerHTML = "Codes";
  codeDiv.appendChild(heading);

  var codepara = document.createElement("p");

  var codes = "";

  for(var huffEle of huffArrStore[0]){
      var curCodeName = huffEle.name;
      codes += curCodeName + " : ";
      for(var i = huffArrStore.length-1; i>=0; i--){
        for(var j=0; j<huffArrStore[i].length; j++){
          if((huffArrStore[i][j].name).includes(curCodeName)){
            if(huffArrStore[i][j].value != -1){
              codes += huffArrStore[i][j].value;
              break;  //Logical Break (Not required)
            }
          }
        }
      }
      codes += "<br>";
  }

  codepara.innerHTML = codes;
  codeDiv.appendChild(codepara);

}

function testProbability(){
  var sum = 0;
  for(huffEle of huffArr){
    sum+= huffEle;
  }
  console.log(sum);
  return sum;
}

function huffLogic(){

  //Initialise the arrays
  huffArrStore = [];
  huffArr = [];

  huffString = document.getElementById("huffString").value;

  var outputDiv = document.getElementById("output");
  while (outputDiv.hasChildNodes()) {
    outputDiv.removeChild(outputDiv.lastChild);
  }

  var codeDiv = document.getElementById("codeDiv");
  while (codeDiv.hasChildNodes()) {
    codeDiv.removeChild(codeDiv.lastChild);
  }

  //Split string to array
  huffArr = huffString.split(",").map(Number);
  var j = huffArrStore.length;

  if(testProbability() != 100){
    var err_message = "Probabilites don't add up to 100";
    //document.getElementById('output').innerHTML = ;
    document.getElementById('codeDiv').innerHTML = err_message;
    return;
  }

  //Store first array to the Array-Store
  huffArrStore[0] = [];
  for(var i=0; i < huffArr.length; i++){
    var huffobj = new huffClass(
      huffArr[i],
      'x' + i,
      -1,
      -1
    );
    huffArrStore[0][i] = huffobj;
  }

  huffArr.sort();
  huffArr.reverse();

  //Sort Array in descending order
  huffArrStore[0].sort(function(a, b) {
  return b.probability - a.probability;
  });

  //Assign values of 0 and 1 to last two elements
  huffArrStore[j][huffArrStore[j].length-2].value=0;
  huffArrStore[j][huffArrStore[j].length-1].value=1;

  /* Test */
  //console.log(huffArrStore);

  /*******  Huffman Code generation Logic  ********************/
  while (huffArr.length!=1) {
    var l = huffArr.length;

    huffArr[l-2] = huffArr[l-1] + huffArr[l-2];
    huffArr.pop();

    j = huffArrStore.length;
    huffArrStore[j] = [];

    var calcProb = (
      huffArrStore[j-1][huffArrStore[j-1].length-2].probability
      + huffArrStore[j-1][huffArrStore[j-1].length-1].probability
    );

    Math.round(calcProb * 100) / 100;

    console.log("calcProb : " + calcProb);

    var calcName = (
      huffArrStore[j-1][huffArrStore[j-1].length-2].name
      + huffArrStore[j-1][huffArrStore[j-1].length-1].name
    );

    console.log("Name : " + calcName);

    //console.log(j);
    for(var i=0; i < huffArr.length; i++){
       var huffobj = new huffClass(
        huffArrStore[j-1][i].probability,
        huffArrStore[j-1][i].name,
        -1
      );
      huffArrStore[j][i] = huffobj;
    }//End of for

    huffArrStore[j][huffArrStore[j].length-1].probability = calcProb;
    huffArrStore[j][huffArrStore[j].length-1].name = calcName;

    //Sort the Array
    huffArrStore[j].sort(function(a, b) {
    return b.probability - a.probability;
    });

    huffArr.sort();
    huffArr.reverse();

    if(huffArrStore[j].length!=1){
      huffArrStore[j][huffArrStore[j].length-2].value=0;
      huffArrStore[j][huffArrStore[j].length-1].value=1;
    }

  }//End of while
  /******************************************************************/

  console.log(huffArrStore);

  displayTree();
  calcCode();
}

function mainCall() {

  huffLogic();

}//End of mainCall()
