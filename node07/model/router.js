
//fs�0�0�1�7�1�7

var fs=require('fs');
//path�0�0�1�7�1�7
var path=require('path');  /*nodejs�1�7�0�6�1�7�1�7�1�7�0�0�1�7�1�7*/
//url�0�0�1�7�1�7
var url=require('url');

//�1�7�1�7�0�0�1�7�0�4�1�7�1�7�1�7�1�7�0�3�0�9�1�7�1�7�1�7  �0�3�1�7�1�7
function getMime(extname,callback){  /*�1�7�1�7�0�0�1�7�1�7�0�4�1�7�1�7�1�7�0�9�1�7�1�7�1�7*/

    fs.readFile('./mime.json',function(err,data){

        if(err){
            console.log('mime.json�1�7�0�4�1�7�1�7�1�7�1�7�1�7�1�7�1�7');
            return false;
        }
        //console.log(data.toString());

        var Mimes=JSON.parse(data.toString());

        var result= Mimes[extname] || 'text/html';

        callback(result)

    })


}

exports.statics=function(req,res,staticpath){


    var pathname=url.parse(req.url).pathname;   /*�1�7�1�7�0�0url�1�7�1�7�0�5*/


    if(pathname=='/'){
        pathname='/index.html'; /*�0�8�1�7�0�0�1�7�1�7�1�3�1�7�1�7�1�7�0�7*/
    }
    //�1�7�1�7�0�0�1�7�0�4�1�7�1�7�0�2�1�7�0�4�1�7�1�7
    var extname=path.extname(pathname);

    if(pathname!='/favicon.ico'){  /*�1�7�1�7�1�7�1�7�1�7�1�7�1�7�1�7favicon.ico*/
        //console.log(pathname);
        //�1�7�0�4�1�7�1�7�1�7�1�7�1�7�1�7�1�7�0�0 static�1�7�1�7�1�7�1�7�1�7index.html

        fs.readFile(staticpath+'/'+pathname,function(err,data){

            if(err){  /*�0�0�1�7�1�7�1�7�1�7�1�7�1�7�0�4�1�7*/

                console.log('404');

                fs.readFile(staticpath+'/404.html',function(error,data404){
                    if(error){
                        console.log(error);
                    }
                    res.writeHead(404,{"Content-Type":"text/html;charset='utf-8'"});
                    res.write(data404);
                    res.end(); /*�1�7�1�7�1�7�1�7�1�7�1�7�0�8*/
                })

            }else{ /*�1�7�1�7�1�7�1�7�1�7�1�7�1�7�1�7�0�4�1�7*/

               getMime(extname,function(mime){
                    res.writeHead(200,{"Content-Type":""+mime+";charset='utf-8'"});
                    res.write(data);
                    res.end(); /*�1�7�1�7�1�7�1�7�1�7�1�7�0�8*/
                });

            }
        })

    }

}