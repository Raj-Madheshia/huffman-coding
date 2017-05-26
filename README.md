# Huffman coding

**Running the Code**
Visit [huffman Coding in Javascript](https://kb-studios.github.io/huffman-coding/main.html "Huffman code") to see the full implementation. (Viewed better on mobile screens)

## Overview
Huffman coding is a lossless data compression algorithm. The idea is to assign variable-legth codes to input characters, lengths of the assigned codes are based on the frequencies of corresponding characters. The most frequent character gets the smallest code and the least frequent character gets the largest code.

This project is an implementation of the huffman code in vanilla Javascript

### Huffman Code Description
Huffman code can be implemented using the tree data structure. 
#### Steps to build Huffman Tree #####
Input is array of unique characters along with their frequency of occurrences and output is Huffman Tree.

1. Create a leaf node for each unique character and build a min heap of all leaf nodes (Min Heap is used as a priority queue. The value of frequency field is used to compare two nodes in min heap. Initially, the least frequent character is at root)

2. Extract two nodes with the minimum frequency from the min heap.

3. Create a new internal node with frequency equal to the sum of the two nodes frequencies. Make the first extracted node as its left child and the other extracted node as its right child. Add this node to the min heap.

4. Repeat steps 2 and 3 until the heap contains only one node. The remaining node is the root node and the tree is complete.

#### How to approach the tree model in javascript
A multi-dimensional array is used to store the tree.
The details of each node in the tree is stored as a **javascript prototype**. Read more about javascript prototpyes [here](https://www.w3schools.com/js/js_object_prototypes.asp "Javascript prototypes"). 
The prototpye contains
* A name for the node
* Its probability
* Its value
* Its parent node

Each row of the multi-dimensional array represents a layer in the tree. The first row contains all the child nodes and the last row conatins the root.

More information on how the code is implemented can be found [here](https://github.com/kb-studios/huffman-coding/blob/master/js/view.js "Js Code for huffman coding")

