function init(divID)
{
	var $ = go.GraphObject.make;
	var myDiagram =
		$(go.Diagram, divID,
			{
				'undoManager.isEnabled': true,
				'animationManager.isEnabled': false,
		        // allow double-click in background to create a new node
		       	'clickCreatingTool.archetypeNodeData': { text: 'Node' },
		       	'allowHorizontalScroll': false,
		       	'allowVerticalScroll': false,
		       	'initialContentAlignment': go.Spot.Center,
		        'initialAutoScale': go.Diagram.Uniform
			});

	myDiagram.addModelChangedListener(function(e)
	{
		if(e.modelChange !== 'nodeDataArray') return;

		generateLinks(myDiagram);
		console.log(myDiagram.model.toJson());
	});

	myDiagram.nodeTemplate =
		$(go.Node, 'Auto',
			{ desiredSize: new go.Size(70, 70) },
			new go.Binding('desiredSize', 'size'),
			$(go.Shape,
				{ figure:'Circle', fill: 'lightblue' },
				new go.Binding('figure', 'fig'),
				new go.Binding('fill', 'color')),
			$(go.TextBlock,
				{ margin: 5, editable: true  },
				new go.Binding('text'))
		);

	myDiagram.linkTemplate =
	    $(go.Link,
	      	$(go.Shape));

	var nodeDataArray = [
		{ key: 0, text: 'HUB', color: 'white', size: new go.Size(100, 100) }
	];

	var linkDataArray = [];

	myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
}

function generateLinks(diagram)
{
	if(diagram.nodes.count < 2) return;

	var linkArray = [];
	var nodeList = diagram.model.nodeDataArray;
	
	for(var i = 0; i < nodeList.length; i++)
	{
		if(i != 0) linkArray.push({ from: nodeList[i].key, to: 0 });
	}

	diagram.model.linkDataArray = linkArray;
}