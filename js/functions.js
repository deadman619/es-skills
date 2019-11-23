// Triggers header popup
function aboutPopup()
{
	var popupElement = document.getElementById("aboutPopup");
	popupElement.classList.toggle("show");
}

// Call to get json file data
function loadJsonData(callback)
{
	var request = new XMLHttpRequest();
	request.open('GET', 'extra/easing-functions-all.json', true);
	request.onreadystatechange = () => {
		if (request.readyState == 4 && request.status == "200") {
			callback(request.responseText);
		}
	}
	request.send(null);
}

// Waits for response and then calls the easing generation
function generateEasingSelections()
{
	loadJsonData((response) => {
		var parsedData = JSON.parse(response);

		if (parsedData.easingFunctions) {
			generateEasingHtml(parsedData.easingFunctions)
		}
	});
}

// Generates html for easing data
function generateEasingHtml(data)
{
	var html = '';

	for (var key in data) {
		html+= '<div class="easing-style-item" name=' + 
		escape(data[key].text) + ' description=' +
		escape(data[key].description) + ' formula=' + 
		escape(data[key].formula) + ' onclick="triggerSelection(this)">';
		html+= '<label class="easing-style-label" for="' + data[key].text + '">';
		html+= data[key].text;
		html+= '</label>';
		html+= '</div>';
	}
	
	document.getElementById('easing-content').innerHTML = html;
}

// Escape characters for html params
function escape(string) 
{
	return string
	.replace(/[\s]/g, '_')
    .replace(/[\"]/g, '\\"')
    .replace(/[\\]/g, '\\\\')
    .replace(/[\/]/g, '\\/')
    .replace(/[\b]/g, '\\b')
    .replace(/[\f]/g, '\\f')
    .replace(/[\n]/g, '\\n')
    .replace(/[\r]/g, '\\r')
    .replace(/[\t]/g, '\\t')
}

// Restore spaces from underscores
function restoreSpaces(string)
{
	return string
	.replace(/_/g, ' ');
}

// Triggers data of selected easing 
function triggerSelection(e)
{
	var name = restoreSpaces(e.attributes.name.value);
	var description = restoreSpaces(e.attributes.description.value);
	var formula = restoreSpaces(e.attributes.formula.value);
	var html = '';
	console.log(description);
	if (name && description && formula) {
		html+= '<div class="selected-content-data">';
		html+= '<h2 class="selected-content-name">' + name + '</h2>';
		html+= '<p class="selected-content-description">' + description.toString() + '</p>';
		html+= '<p class="selected-content-formula">' + formula + '</p>'
		html+= '</div>';
	}

 	document.getElementById('selected-content').innerHTML = html;
}

// Functions to call on page load
generateEasingSelections();