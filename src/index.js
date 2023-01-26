//An example script to create a simple sum calculation workflow

import { LiteGraph, LGraph, LGraphCanvas } from "litegraph.js";
import "/litegraph.css";
import "./styles.css";

var graph = new LGraph();

var canvas = new LGraphCanvas("#mycanvas", graph);

//Create a custom node for calc sum

//node constructor
function addNode(){
    this.addInput("A", "number");
    this.addInput("B","number");
    this.addOutput("A+B","number");
    this.properties = {precision:1};
}

//Name
addNode.title = "sum"


//function called when a sum node is executed
addNode.prototype.onExecute = function()
{
    var A = this.getInputData(0);
    if( A == undefined)
        A=0;
    
    var B = this.getInputData(1);
    if( B == undefined)
        B=0;
    
    this.setOutputData( 0, A + B );      
    
}

//register the sum node on the system under the basic category
LiteGraph.registerNodeType("basic/sum", addNode);

/////////////////////////////////////////////////////////////

//Add a const number node --> lives inside basic const category
var node_const_one = LiteGraph.createNode("basic/const");
node_const_one.pos = [200, 200]; //postion on the graph
graph.add(node_const_one); //Add to graph 
node_const_one.setValue(3); //Set an initial value

//Add a const number node
var node_const_two = LiteGraph.createNode("basic/const");
node_const_two.pos = [200,400];
graph.add(node_const_two);
node_const_two.setValue(5);

//Add a sum node
var node_sum = LiteGraph.createNode("basic/sum");
node_sum.pos = [600,300];
graph.add(node_sum);

//Add a watch node
var node_watch = LiteGraph.createNode("basic/watch");
node_watch.pos =[800,320];
graph.add(node_watch);

//create the node links
node_const_one.connect(0, node_sum, 0);
node_const_two.connect(0, node_sum, 1);
node_sum.connect(0, node_watch, 0);

//render the graph
graph.start();

