/**
 * Created by shay on 10/17/16.
 */

// main is the graph that the user will see, starts out as an empty graph
var MAIN_GRAPH = new joint.dia.Graph();

// the default graph that all project begins with, for demo purpose we will
// set it to  an actual fully functional graph.
var DEFAULT_GRAPH = new joint.dia.Graph();


/* =============== CREATING THE DEFAULT GRAPH =============== */

// allows for drag and drop
$(document).ready(function() {

    $(".item").draggable({
        helper: 'clone',
        zIndex: 10000 // was having issues with paper being over draggable item
    });
    $(document).ready(function(){
        $('[data-toggle="popover"]').popover();
    });
    $("#paper").droppable({

        // creates a node on the mouse up,based on what image id was dropped
        // in the paper from the sidescroll list above
        drop: function (event, ui) {

            var offset = $(this).offset();
            var relX = ui.position.left - offset.left;
            var relY = ui.position.top - offset.top;

            var id = ui.draggable.prop('id');

            console.log($("#paper").css("z-index"));
            console.log($("#"+id).css("z-index"));

            var dropText = '';

            // id will determine what type of node is created
            // color is used for testing
            if (id == 'img1') dropText = 'WeatherByZip';
            else if (id == 'img2') dropText = 'WeatherByCity';
            else if (id == 'img3') dropText = 'CalculatorAdd';
            else if (id == 'img4') dropText = 'CalculatorSubtract';
            else if (id == 'img5') dropText = 'CalculatorMultiply';
            else dropText = 'CalculatorDivide';

            var newNode = new joint.shapes.devs.Coupled({
                position: { x: relX, y: relY },
                size: { width: 140, height: 70 },
                inPorts : ['In'],
                outPorts: ['Out'],
                attrs: {
                    '.label'            : { text: dropText},
                    rect                : { fill: '#d9534f' },

                    '.inPorts circle'   : { fill: '#16A085', magnet: 'passive', type: 'input',r:'10' },
                    '.outPorts circle'  : { fill: '#E74C3C', type: 'output',r:'10' }
                }
            });
            DEFAULT_GRAPH.addCell(newNode);
        }
    });
});
