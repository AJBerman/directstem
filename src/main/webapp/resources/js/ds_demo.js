var graph = new joint.dia.Graph();
var linklist = []
var paper = new joint.dia.Paper({
    el: $('#paper'),
    width: 1000,
    height: 600,
    gridSize: 10,
    model: graph,
    defaultLink: function() {
                    link = new joint.dia.Link({
                            router: { name: 'metro' },
                            connector: { name: 'rounded' },
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
                    })
                    linklist.push(link)
                    console.log(linklist)
                    return link
                }
});

var source = new joint.shapes.devs.Coupled({
    position: { x: 50, y: 50 },
    size: { width: 140, height: 70 },
    inPorts : ['In'],
    outPorts: ['Out'],
    attrs: {
        '.label'            : { text: 'Source', 'data-toggle': 'popover', title: 'Modify Me!', 
                                'data-content': 
                                '<form action="action_page.php"> \
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
                                'data-html' : 'true', 'data-container' : 'body' },
        rect                : { fill: '#d9534f'},

        '.inPorts circle'   : { fill: '#16A085', magnet: 'passive', type: 'input',r:'10' },
        '.outPorts circle'  : { fill: '#E74C3C', type: 'output',r:'10' }
    }
});

var target = source.clone().translate(750, 400).attr('text/text', 'Target');

var link = new joint.dia.Link({
    source: { 
        id: source.id,
        port:"Out"
    },
    target: { 
        id: target.id,
        port:"In"
    },
    router: { name: 'metro' },
    connector: { name: 'rounded' },
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

graph.addCells(obstacles).addCells([source, target, link]);

link.toBack();

graph.on('change:position', function(cell) {
    // has an obstacle been moved? Then reroute the link.
    for (var i=0,  tot=linklist.length; i < tot; i++) paper.findViewByModel(linklist[i]).update();
});
$('.router-switch').on('click', function(evt) {

    var router = $(evt.target).data('router');
    var connector = $(evt.target).data('connector');

    if (router) {
        link.set('router', { name: router });
    } else {
        link.unset('router');
    }

    link.set('connector', { name: connector });
});
$('#add_butt').click(function() {

    var newNode = new joint.shapes.devs.Coupled({
        position: { x: 500, y: 300 },
        size: { width: 140, height: 70 },
        inPorts : ['In'],
        outPorts: ['Out'],
        attrs: {
        '.label'            : { text: $("#add_select").val()},
        rect                : { fill: '#d9534f' },

        '.inPorts circle'   : { fill: '#16A085', magnet: 'passive', type: 'input',r:'10' },
        '.outPorts circle'  : { fill: '#E74C3C', type: 'output',r:'10' }
        }
    });
    graph.addCell(newNode);
});


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
		    graph.addCell(newNode);
		}
	});
});
