// var req = new XMLHttpRequest();
// req.responseType = 'json';
// req.open('GET', 'http://localhost:8099', true);
// req.onload = function() {
//    var jsonResponse = req.response;
//    console.log("jsonResponse: ", jsonResponse)
// };
// req.send(null);

let xhr = null;
window.onload = () => {
    xhr = new XMLHttpRequest();
    addEventListeners()
};

function addEventListeners() {
    const div = document.getElementById("div");
    const btnWithNewFields = document.getElementById("btnWithNewFields");

    const allBtn = document.getElementsByTagName('button');
    for (i = 0; i < 3; i++) { // перебор всех button
        document.getElementById(allBtn[i].id).addEventListener('click', readData)        
    }

    btnWithNewFields.addEventListener('click', addNewFields)
}

function readData() {
    xhr.responseType = 'json';
    switch(this.id) {
        case "allData":
            xhr.open('GET', 'http://localhost:8099/allData', true);
			break;
		case "tradingSessions":
            xhr.open('GET', 'http://localhost:8099/tradingSessions', true);
            break;
        case "securitySettings":
            xhr.open('GET', 'http://localhost:8099/securitySettings', true);
            break;
    }
    xhr.onreadystatechange = readyState;
    xhr.send(null);
}

function addNewFields() {
    xhr.responseType = 'json';
    xhr.open('GET', 'http://localhost:8099/btnWithNewFields', true);
    xhr.onreadystatechange = readyStateNewFields;
    xhr.send(null);
}

function readyState() {
    xhr.onload = function() {
        //var arr = [];
        if (xhr.readyState === 4 && xhr.status === 200) {
            var jsonResponse = xhr.response;
            console.log("jsonResponse: ", jsonResponse)
            div.innerHTML = JSON.stringify(jsonResponse);
        }        
        //console.log(arr)
    };
}

function readyStateNewFields() {
    xhr.onload = function() {
        let count;
        let arrKeys = [];
        let arrValues = [];
        if (xhr.readyState === 4 && xhr.status === 200) {
            let jsonResponse = xhr.response;
            for (let key in jsonResponse) { // перебираем полученный объект     
                  arrKeys.push(key);
                  arrValues.push(jsonResponse[key]);
            }
            
            let html = '';
            for( let i = 0; i < 10; i++) { // выводим первые 10
                count = i;
                html += '<p>'+ arrKeys[i] + ': ' + JSON.stringify(arrValues[i]) + '</p>';
            }
            div.innerHTML = html;

            function addNewFields() { // выводим на экран каждые 5 секунд
                let next = count + 5;
                for( var i = count; i < next; i++) { // выводим следующие 5
                    // console.log('aaaaaa')
                    count = i;
                    html += '<p>'+ arrKeys[i] + ': ' + JSON.stringify(arrValues[i]) + '</p>';
                }
                div.innerHTML = html;
            }              
            let timerId = setInterval(addNewFields, 5000);

            setTimeout(function() {
                clearInterval(timerId);
                alert('All data loaded');
            }, (arrKeys.length * 1000) - 10000);
        }
    };
}