var getJSON = function(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function() {
		var status = xhr.status;   
		if (status == 200) {
			callback(null, xhr.response);
		} else {
			callback(status);
		}
	};
	xhr.send();
};

var result = [];

getJSON("/index.json",  function(err, data) {
	if (err != null) {
		console.error(err);
	} else {  
		data.forEach(x =>{result.push(x)});
	}
	getKeyup()
});

var term = "";
var results = new Set();

var getKeyup = function () {
	document.querySelector('#searchbar').addEventListener('keyup', logKey);
	function logKey(e) {
		results.clear()
		document.querySelector('#results').innerHTML = "";
		term = document.querySelector('#searchbar').value;
		runSearch(term);
		return term
	}
};

var runSearch = function (term) {
	titleSearch();
	contentSearch();
	tagSearch();
	rendering();
}

var titleSearch = function () {
	for(var i=0; i<result.length; i++) {
		if (encodeURIComponent(result[i].title).indexOf(encodeURIComponent(term)) > -1) {
			results.add(result[i])
		}
		else {
		}
	};	
}

var contentSearch = function () {
	for(var i=0; i<result.length; i++) {
		if (encodeURIComponent(result[i].contents).indexOf(encodeURIComponent(term)) > -1) {
			results.add(result[i])
		}
		else {
		}
	};	
}

var tagSearch = function () {
	for(var i=0; i<result.length; i++) {
		var tagen = result[i].tags
		if (result[i].tags != null && encodeURIComponent(tagen.toString()).indexOf(encodeURIComponent(term)) > -1) {
			results.add(result[i])
		}
		else {
		}
	};	
}

var rendering = function () {
	var resulta = Array.from(results);
	for(var i=0; i<resulta.length; i++) {
		var title = resulta[i].title;
		var content = resulta[i].contents;
		var permalink = resulta[i].permalink;
		var date = resulta[i].date;
		var tag1 = '<div class="tags">';
		var tags = resulta[i].tags.forEach(function(tag) {
			tag1 += '<a href=/tags/' + tag + '>' + tag + '</a>'
		});
		var newElement = document.createElement('article');
		newElement.setAttribute("id", "list");
		newElement.innerHTML = '<h2 class="title"><a href=' + permalink + '>' + title + '</a></h2>' + 
							   '<div class="date">' + date.split('-')[0] + '년 ' + date.split('-')[1] + '월 ' + date.split('-')[2].substring(0,2) + '일' + '</div>' +
							   '<div class="summary"><a href=' + permalink + '>' + content + '</a></div>' +
							   tag1 +'</div>';
		document.querySelector('#results').appendChild(newElement);
	}
}