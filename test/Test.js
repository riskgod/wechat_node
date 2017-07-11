/**
 * Created by gliao002 on 7/7/17.
 */
const fs = require('fs'),
    path = require('path');
let folderPath = path.join(__dirname,'../lib/');
let newFolderPath = path.join(__dirname,'../newLib/');
//console.log(folderPath);

function updateFile(oldFolderPath,oldFileName,newFolderPath,newFileName) {
    fs.readFile(oldFolderPath + oldFileName, {flag: 'r+', encoding: 'utf8'}, function (err, data) {
        if(err) {
            console.error(err);
            return;
        }
        //console.log(data);
        let newdata = replaceStr(data);
        fs.writeFile(newFolderPath + newFileName, newdata, {flag: 'a'}, function (err) {
            if(err) {
                console.error(err);
            } else {
                console.log('写入成功');
            }
        });
    });


}

function replaceStr(data) {
    return data.replace(/var/g,'let').replace(/function/g,'').replace(/make\(exports, \'/g,'exports.').replace(/\*/g,'');
}



//updateFile(folderPath,'api_custom_service.js',newFolderPath,'api_custom_service.js');
fs.readdir(folderPath, function(err, files){
    if(err)console.log(err);
    files.forEach((x)=>{
        updateFile(folderPath,x,newFolderPath,x);
    });
})