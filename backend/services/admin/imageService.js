class imageService {
    constructor(){}

    generateImageName(ImgName){
        return new Promise(function(resolve,reject){
            let imgNameArr = ImgName.split('.');
            let imgExt = imgNameArr.splice(-1).toString();
            const currenDate = new Date();
            const imgNewName = currenDate.getTime()+"_"+ Math.round(Math.random(1111 , 11)* 1111)+"."+ imgExt;
            resolve(imgNewName);
        });
    }

    uploadImage(image){
        return new Promise(function(resolve,reject){
            let uploadPath = __dirname + '/../../public/images/' + image.name;
            image.mv(uploadPath, function(error){
                if(error){
                    reject(error);
                } else{
                    resolve(true);
                }
            });
        });
    }
}
module.exports = new imageService();