/*****************************************************
          HUFFMAN CODE IN JAVASCRIPT

- A javascript of huffman coding
- Makes use of dynamic multi-dimensional array
  to store the tree structure

- Current Version (alpha 1.0.5)

*****************************************************/

//Create a prototype for the huffman object
function huffClass(probability, name, value) {
  this.probability = probability;
  this.name = name;
  this.value = value;
};

//Global variables
var huffArr;
var huffArrStore;

function displayTree(){

  //Display the output to html
  var output = "";

  for (huffarrItr of huffArrStore) {
    for (huffEle of huffarrItr) {
      output += huffEle.probability + " ";
    }
    output += "<br>"
  }

  document.getElementById("output").innerHTML = output;

}

function calcCode(){

  //todo [parse the tree]
}

function mainCall() {

  //Get input String
  var huffString = document.getElementById("huffString").value;

  //Initialise the arrays
  huffArr = [];
  huffArrStore = [];

  //Split string to array
  huffArr = huffString.split(",").map(Number);
  var j = huffArrStore.length;

  //Store first array to the Array-Store
  huffArrStore[0] = [];
  for(var i=0; i < huffArr.length; i++){
    var huffobj = new huffClass(
      huffArr[i],
      'x' + i,
      -1
    );
    huffArrStore[0][i] = huffobj;
  }

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

    var calcName = (
      huffArrStore[j-1][l-2].name + huffArrStore[j-1][l-1].name
    );

    //console.log(j);
    for(var i=0; i < huffArr.length; i++){
       var huffobj = new huffClass(
        huffArr[i],
        'x' + i,
        -1
      );
      huffArrStore[j][i] = huffobj;
    }//End of for

    huffArrStore[j][huffArrStore[j].length-1].probability = calcProb;
    huffArrStore[j][huffArrStore[j].length-1].name = calcName;

    if(huffArrStore[j].length!=1){
      huffArrStore[j][huffArrStore[j].length-2].value=0;
      huffArrStore[j][huffArrStore[j].length-1].value=1;
    }

  }//End of while
  /******************************************************************/

  console.log(huffArrStore);

  displayTree();

}//End of mainCall()
