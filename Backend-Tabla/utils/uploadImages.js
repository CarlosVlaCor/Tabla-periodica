const fs = require('fs');
const path = require('path');

exports.fileUpload = async function(file,namePath,nameElement){
    try {
     
        let matches = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let response = {};
        
        if(matches.length !==3) return new Error('String invalido');
        
        response.type = matches[1];
        response.data = Buffer.from(matches[2],'base64');
        let imageBuffer = response.data;
        
      
       
        if(!fs.existsSync(`${path.dirname(require.main.filename)}/public${namePath}`)){
        
            fs.mkdirSync(`${path.dirname(require.main.filename)}/public${namePath}`,true);
        }
       
        let extension = response.type.split('/');
        let fileName = `${nameElement}.${extension[1] }` ;
        let fileRoute = `${namePath}/${fileName}` ;
        
        
        
        fs.writeFileSync(
            `${path.dirname(require.main.filename)}/public${fileRoute}`,
            imageBuffer,
            "utf8"
        );
    
        return fileRoute;
    } catch (error) {
        return new Error("Error servidor");
    }
}