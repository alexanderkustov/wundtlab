function JSON2CSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var str = '';
    var line = '';

    if ($("#labels").is(':checked')) {
        var head = array[0];
        if ($("#quote").is(':checked')) {
            for (var index in array[0]) {
                var value = index + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[0]) {
                line += index + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }

    for (var i = 0; i < array.length; i++) {
        var line = '';

        if ($("#quote").is(':checked')) {
            for (var index in array[i]) {
                var value = array[i][index] + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[i]) {
                line += array[i][index] + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
    
}
        
$("#convert").click(function() {
    var json = $.parseJSON($("#json").val());
    var csv = JSON2CSV(json);
    $("#csv").val(csv);
});
    
$("#download").click(function() {
    var json = $.parseJSON($("#json").val());
    var csv = JSON2CSV(json);
    window.open("data:text/csv;charset=utf-8," + escape(csv))
});

//     <p id="heading">JSON to CSV Converter</p>
//     <p class="small"><a href="http://jsfiddle.net/sturtevant/AZFvQ/" target="_blank">CSV to JSON Converter</a>
//     <hr />
//     <p>Paste Your JSON Here:</p>
//     <textarea id="json" class="text">[{"Id":1,"UserName":"Sam Smith"},
// {"Id":2,"UserName":"Fred Frankly"},
// {"Id":1,"UserName":"Zachary Zupers"}]</textarea>
//     <br />
//     <input id="quote" type="checkbox" checked="true" /> Wrap values in double quotes
//     <br />
//     <input id="labels" type="checkbox" checked="true" /> Include labels in first row
//     <br />
//     <button id="convert">Convert to CSV</button>
//     &nbsp;&nbsp;
//     <button id="download">Download CSV</button>
//     <textarea id="csv" class="text"></textarea>