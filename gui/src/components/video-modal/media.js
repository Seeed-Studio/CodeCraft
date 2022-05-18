const getUserMedia = async (constrains) => {
    try {
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            //最新标准API
            return await navigator.mediaDevices.getUserMedia(constrains);
        } else if (navigator.webkitGetUserMedia){
            //webkit内核浏览器
            return await navigator.webkitGetUserMedia(constrains);
        } else if (navigator.mozGetUserMedia){
            //Firefox浏览器
            return await navagator.mozGetUserMedia(constrains);
        } else if (navigator.getUserMedia){
            //旧版API
            return await navigator.getUserMedia(constrains);
        }
    } catch (error) {
        console.log(error)
        return Promise.resolve(null);
    }
    
}

export {
    getUserMedia,
};