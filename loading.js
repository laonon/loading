(function(window) {
    var Resource = {
        images: {
            //path：文件相对路径，size:图片的大小，data：存放加载的图片数据。
            images001: {
                path: "images/bg_blackboard_btm.png",
                size: '',
                data: null
            },
            images002: {
                path: "images/bg_blackboard_btm@2x.png",
                size: '',
                data: null
            },
            images003: {
                path: "images/bg_blackboard.png",
                size: '',
                data: null
            },
            images004: {
                path: "images/bg_blackboard@2x.png",
                size: '',
                data: null
            },
            images005: {
                path: "images/bg_grid.png",
                size: '',
                data: null
            },
            images006: {
                path: "images/bg_grid@2x.png",
                size: '',
                data: null
            },
            images007: {
                path: "images/btn_back.png",
                size: '',
                data: null
            },
            images008: {
                path: "images/btn_back@2x.png",
                size: '',
                data: null
            },
            images009: {
                path: "images/btn_begin.png",
                size: '',
                data: null
            },
            images010: {
                path: "images/drawline.png",
                size: '',
                data: null
            },
            images011: {
                path: "images/letters.png",
                size: '',
                data: null
            },
            images012: {
                path: "images/letters@2x.png",
                size: '',
                data: null
            },
            images013: {
                path: "images/numbers.png",
                size: '',
                data: null
            },
            images014: {
                path: "images/numbers@2x.png",
                size: '',
                data: null
            },
            images015: {
                path: "images/wrong.png",
                size: '',
                data: null
            }
        },
        sounds: {
            //soundName:声音文件名称，path：文件夹相对路径，data：存放加载的声音数据
            sound001: {
                soundName: "line_on",
                path: "sounds/",
                data: null
            },
            sound002: {
                soundName: "line_off",
                path: "sounds/",
                data: null
            },
            sound003: {
                soundName: "3",
                path: "sounds/",
                data: null
            },
            sound004: {
                soundName: "2",
                path: "sounds/",
                data: null
            },
            sound005: {
                soundName: "1",
                path: "sounds/",
                data: null
            },
            sound006: {
                soundName: "go",
                path: "sounds/",
                data: null
            },
            sound007: {
                soundName: "right",
                path: "sounds/",
                data: null
            },
            sound008: {
                soundName: "error",
                path: "sounds/",
                data: null
            },
            sound009: {
                soundName: "bgloop1",
                path: "sounds/",
                data: null
            }
        }
    };
    var Progress = {},
        ftp = 60,
        percent = document.querySelectorAll('.percent')[0];

    Progress.PreLoadData = function() {
        var loadedNum = 0, //已加载资源数量
            resourceNum1 = 15, //图片资源数量
            resourceNum2 = 9; //音频资源数量
        var handleSucc = function() { //资源加载完成后的回调函数

        };
        var handleFail = function() { //资源加载失败的回调函数

        };

        function imageLoadSucc() { //每成功加载一个图片执行一次
            loadedNum++;
            if (loadedNum === resourceNum1) { //全部图片文件加载完后，继续加载声音
                loadSound();
            }
        }

        function soundLoadSucc() { //每成功加载一个声音执行一次
            loadedNum++;
            if (loadedNum === (resourceNum1 + resourceNum2)) { //全部声音文件加载完后，执行回调函数
                handleSucc();
            }
        }

        function loadImage() { //加载图片
            for (var i in Resource['images']) {
                Resource['images'][i]['data'] = new Image();
                Resource['images'][i]['data'].src = Resource['images'][i]['path'];
                Resource['images'][i]['data'].onload = function() {
                    imageLoadSucc();
                }
                Resource['images'][i]['data'].onerror = function() {
                    handleFail();
                }
            }
        }

        function loadSound() { //加载声音
            for (var j in Resource['sounds']) {
                Resource['sounds'][j]['data'] = new Audio();
                var playType = Resource['sounds'][j]['data'].canPlayType('video/ogg'); //测试浏览器是否支持该格式声音
                if (playType) {
                    Resource['sounds'][j]['data'].src = Resource['sounds'][j]['path'] + Resource['sounds'][j]['soundName'] + ".ogg";
                } else {
                    Resource['sounds'][j]['data'].src = Resource['sounds'][j]['path'] + Resource['sounds'][j]['soundName'] + ".mp3";
                }
                Resource['sounds'][j]['data'].addEventListener('canplaythrough', function() { //ios下safria会呈挂起状态
                    soundLoadSucc();
                }, false);
                Resource['sounds'][j]['data'].addEventListener("error", function() {
                    handleFail();
                }, false);
            }
        }
        loadImage();
        return { //返回一个对象
            succ: function(f1) {
                if (f1) {
                    handleSucc = f1;
                }
            },
            fail: function(f2) {
                if (f2) {
                    handleFail = f2;
                }
            }

        }
    };

    window.Progress = Progress;
})(window);