var fs = require('fs');


function getMime() {
    //1
    fs.readFile('mime.json', function (err, data) {
        //console.log(data.toString());
        return data;//3
    })
    //2
    //return '123';
}


console.log(getMime());