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
        '.label'            : { text: 'Source'},
        rect                : { fill: '#d9534f' },

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
