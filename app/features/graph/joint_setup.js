/**
 * Created by shay on 10/17/16.
 */

// main is the graph that the user will see, starts out as an empty graph
var MAIN_GRAPH = new joint.dia.Graph();

// the default graph that all project begins with, for demo purpose we will
// set it to  an actual fully functional graph.
var DEFAULT_GRAPH = new joint.dia.Graph();

/* =============== CREATING THE DEFAULT GRAPH =============== */
var linklist = [];
var source = new joint.shapes.devs.Coupled({
    position: {x: 50, y: 50},
    size: {width: 140, height: 70},
    inPorts: ['In'],
    outPorts: ['Out'],
    attrs: {
        '.label': {
            text: 'Source', 'data-toggle': 'popover', title: 'Modify Me!',
            'data-content': '<form action="action_page.php"> \
                  Type:<br> \
                  <select name="type"> \
                    <option value="Service">Service</option> \
                    <option value="Graph">Graph</option> \
                  </select><br> \
                  Service:<br> \
                  <select name="service"> \
                    <option value="WeatherByZip">WeatherByZip</option> \
                    <option value="WeatherByCity">WeatherByCity</option> \
                    <option value="calc_add">CalculatorAdd</option> \
                    <option value="calc_sub">CalculatorSubtract</option> \
                    <option value="calc_mul">CalculatorMultiply</option> \
                    <option value="calc_div">CalculatorDivide</option> \
                  </select><br> \
                  Endpoint:<br> \
                  <select name="serviceEndpoint"> \
                    <option value="foo">Foo</option> \
                    <option value="bar">Bar</option> \
                  </select><br> \
                  <input type="submit" value="Save"><button>Edit...</button><button>Delete</button></form>',
            'data-html': 'true', 'data-container': 'body'
        },
        rect: {fill: '#d9534f'},

        '.inPorts circle': {
            fill: '#16A085',
            magnet: 'passive',
            type: 'input',
            r: '10'
        },
        '.outPorts circle': {fill: '#E74C3C', type: 'output', r: '10'}
    }
});

var target = source.clone().translate(750, 400).attr('text/text', 'Target');

var link = new joint.dia.Link({
    source: {
        id: source.id,
        port: "Out"
    },
    target: {
        id: target.id,
        port: "In"
    },
    router: {name: 'metro'},
    connector: {name: 'rounded'},
    attrs: {
        '.connection': {
            stroke: '#333333',
            'stroke-width': 3
        },
        '.marker-target': {
            fill: '#333333',
            d: 'M 10 0 L 0 5 L 10 10 z'
        }
    }
});
linklist.push(link);

var obstacle = source.clone().translate(300, 100).attr({
    text: {
        text: 'Obstacle',
        fill: '#eee'
    }
});

var obstacles = [
    obstacle,
    obstacle.clone().translate(200, 100),
    obstacle.clone().translate(-200, 150)
];

DEFAULT_GRAPH.addCells(obstacles).addCells([source, target, link]);

link.toBack();

DEFAULT_GRAPH.on('change:position', function(cell) {
    // has an obstacle been moved? Then reroute the link.
    for (var i = 0, tot = linklist.length; i < tot; i++) paper.findViewByModel(linklist[i]).update();
});
$('.router-switch').on('click', function(evt) {

    var router = $(evt.target).data('router');
    var connector = $(evt.target).data('connector');

    if (router) {
        link.set('router', {name: router});
    } else {
        link.unset('router');
    }

    link.set('connector', {name: connector});
});
$('#add_butt').click(function() {

    var newNode = new joint.shapes.devs.Coupled({
        position: {x: 500, y: 300},
        size: {width: 140, height: 70},
        inPorts: ['In'],
        outPorts: ['Out'],
        attrs: {
            '.label': {text: $("#add_select").val()},
            rect: {fill: '#d9534f'},

            '.inPorts circle': {
                fill: '#16A085',
                magnet: 'passive',
                type: 'input',
                r: '10'
            },
            '.outPorts circle': {fill: '#E74C3C', type: 'output', r: '10'}
        }
    });
    DEFAULT_GRAPH.addCell(newNode);
});
