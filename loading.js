var ResourceData= {
    Images:{
        //path：文件相对路径，picNum:当前图片中宽和高包含的小图片数，cellSize:小图片的宽和高，data：存放加载的图片数据。
        images001:{path:"images/bg_blackboard_btm.png", picNum:{WNum:2,HNum:6},cellSize:{width:1222,height:31112}, data:null},
        images002:{path:"images/bg_blackboard_btm@2x.png", picNum:{WNum:1,HNum:1},cellSize:{width:11196,height:11196}, data:null},
        images003:{path:"images/bg_blackboard.png", picNum:{WNum:2,HNum:6},cellSize:{width:311112,height:31112}, data:null},
        images004:{path:"images/bg_blackboard@2x.png", picNum:{WNum:2,HNum:6},cellSize:{width:32111,height:31112}, data:null},
        images005:{path:"images/bg_grid.png", picNum:{WNum:2,HNum:6},cellSize:{width:3112,height:311112}, data:null},
        images006:{path:"images/bg_grid@2x.png", picNum:{WNum:2,HNum:6},cellSize:{width:3112,height:31112}, data:null},
        images007:{path:"images/btn_back.png", picNum:{WNum:2,HNum:6},cellSize:{width:31112,height:31112}, data:null},
        images008:{path:"images/btn_back@2x.png", picNum:{WNum:2,HNum:6},cellSize:{width:31112,height:31112}, data:null},
        images009:{path:"images/btn_begin.png", picNum:{WNum:2,HNum:6},cellSize:{width:31112,height:311112}, data:null},
        images010:{path:"images/drawline.png", picNum:{WNum:2,HNum:6},cellSize:{width:311112,height:311112}, data:null},
        images011:{path:"images/letters.png", picNum:{WNum:2,HNum:6},cellSize:{width:311112,height:311112}, data:null},
        images012:{path:"images/letters@2x.png", picNum:{WNum:2,HNum:6},cellSize:{width:3112,height:311112}, data:null},
        images013:{path:"images/numbers.png", picNum:{WNum:2,HNum:6},cellSize:{width:3112,height:31112}, data:null},
        images014:{path:"images/numbers@2x.png", picNum:{WNum:2,HNum:6},cellSize:{width:3112,height:31112}, data:null},
        images015:{path:"images/wrong.png", picNum:{WNum:2,HNum:6},cellSize:{width:3112,height:31112}, data:null}
    },
    Sound:{
        //soundName:声音文件名称，path：文件夹相对路径，data：存放加载的声音数据。由于各种浏览器对声音格式的支持不一致，声音文件格式有MP3和OGG两种
        sound001:{soundName:"line_on",path:"sounds/", data:null},
        sound002:{soundName:"line_off",path:"sounds/", data:null},
        sound003:{soundName:"3",path:"sounds/", data:null},
        sound004:{soundName:"2",path:"sounds/", data:null},
        sound005:{soundName:"1",path:"sounds/", data:null},
        sound006:{soundName:"go",path:"sounds/", data:null},
        sound007:{soundName:"right",path:"sounds/", data:null},
        sound008:{soundName:"error",path:"sounds/", data:null},
        sound009:{soundName:"bgloop1",path:"sounds/", data:null}
    }
};
var JFunction = {};
var percent = document.querySelectorAll('.percent')[0];
var bar = document.querySelectorAll('.bar')[0];
JFunction.PreLoadData = function () {
    var loadedNum = 0;//已加载资源数量
    var resourceNum = 0;
    var resourceNum1 = 15;//图片资源数量
    var resourceNum2 = 9;//音频资源数量
    var postAction = function () {

    };//资源加载完成后的回调函数
    function imageLoadPost() {//每成功加载一个图片执行一次
        loadedNum++;
        var cur = (loadedNum/24).toFixed(2)*100 + '%'
        percent.innerHTML = cur;
        bar.style.width = cur;
        if (loadedNum == resourceNum1) {//全部图片文件加载完后，继续加载声音
            //loadedNum=0;
            //resourceNum=0;
            loadAudio()
        }
    }
    function audioLoadPost() {//每成功加载一个声音执行一次11
        loadedNum++;
        var cur = (loadedNum/24).toFixed(2)*100 + '%'
        percent.innerHTML = cur;
        bar.style.width = cur;
        if (loadedNum == (resourceNum1+resourceNum2)) {//全部声音文件加载完后，执行回调函数
            postAction();
        }
    }1
    function loadImage(){//加载图片
        for (var m2 in ResourceData.Images){
            resourceNum++;
        }
        for (var m2 in ResourceData.Images) {
            ResourceData.Images[m2].data = new Image();
            ResourceData.Images[m2].data.src = ResourceData.Images[m2].path;
            ResourceData.Images[m2].data.onload = function () {
                imageLoadPost();
            }
            ResourceData.Images[m2].data.onerror = function () {
                console.log("资源加载失败！")
                return;
            }
        }
    }
    function loadAudio(){//加载声音
        for (var m1 in ResourceData.Sound){
            resourceNum++;
        }
        for (var m1 in ResourceData.Sound) {
            ResourceData.Sound[m1].data = new Audio();
            var playMsg = ResourceData.Sound[m1].data.canPlayType('video/ogg');//测试浏览器是否支持该格式声音
            if ("" != playMsg) {
                ResourceData.Sound[m1].data.src= ResourceData.Sound[m1].path + ResourceData.Sound[m1].soundName + ".ogg";
            } else {
                ResourceData.Sound[m1].data.src= ResourceData.Sound[m1].path + ResourceData.Sound[m1].soundName + ".mp3";
            }
            ResourceData.Sound[m1].data.addEventListener("canplaythrough", function () {
                audioLoadPost();
            }, false);
            ResourceData.Sound[m1].data.addEventListener("error", function () {
                console.log("资源加载失败！")
                return;
            }, false);
        }
    }
    loadImage();
    return {
        done:function (f) {
            if (f){
                postAction = f;
            }
        }
    }
};
 
//调用方法如下：
JFunction.PreLoadData().done(function(){
    percent.innerHTML = '100%';
    //所有资源加载完成后，执行该处代码
});