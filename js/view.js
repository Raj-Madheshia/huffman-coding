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

  document.getElementById("codes").innerHTML = codes;

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

}//End of mainCall()
