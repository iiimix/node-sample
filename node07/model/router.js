
//fsģ��

var fs=require('fs');
//pathģ��
var path=require('path');  /*nodejs�Դ���ģ��*/
//urlģ��
var url=require('url');

//��ȡ�ļ����͵ķ���  ˽��
function getMime(extname,callback){  /*��ȡ��׺���ķ���*/

    fs.readFile('./mime.json',function(err,data){

        if(err){
            console.log('mime.json�ļ�������');
            return false;
        }
        //console.log(data.toString());

        var Mimes=JSON.parse(data.toString());

        var result= Mimes[extname] || 'text/html';

        callback(result)

    })


}

exports.statics=function(req,res,staticpath){


    var pathname=url.parse(req.url).pathname;   /*��ȡurl��ֵ*/


    if(pathname=='/'){
        pathname='/index.html'; /*Ĭ�ϼ��ص���ҳ*/
    }
    //��ȡ�ļ��ĺ�׺��
    var extname=path.extname(pathname);

    if(pathname!='/favicon.ico'){  /*��������favicon.ico*/
        //console.log(pathname);
        //�ļ�������ȡ static�����index.html

        fs.readFile(staticpath+'/'+pathname,function(err,data){

            if(err){  /*ô������ļ�*/

                console.log('404');

                fs.readFile(staticpath+'/404.html',function(error,data404){
                    if(error){
                        console.log(error);
                    }
                    res.writeHead(404,{"Content-Type":"text/html;charset='utf-8'"});
                    res.write(data404);
                    res.end(); /*������Ӧ*/
                })

            }else{ /*��������ļ�*/

               getMime(extname,function(mime){
                    res.writeHead(200,{"Content-Type":""+mime+";charset='utf-8'"});
                    res.write(data);
                    res.end(); /*������Ӧ*/
                });

            }
        })

    }

}