
require.config({
    baseUrl: 'js/vendor/'
});

require([
    'mo/lang',
    'dollar',
    'mo/domready'
], function(_, $){

var cav1 = $('#frame'),
    cav2 = $('#overlay'),
    ctx1 = cav1[0].getContext("2d"),
    ctx2 = cav2[0].getContext("2d"),
    video = $('#cam'),
    opt_r = 100, 
    opt_g = 178, 
    opt_b = 90, 
    opt_rg = -45, 
    opt_gb = 80, 
    opt_rb = 40, 
    opt_t = 40,
    w, h;

navigator.webkitGetUserMedia({
    video: true
}, function(stream) {
    video.attr('src', window.URL.createObjectURL(stream));
    video.on('loadedmetadata', function(){
        update();
        setInterval(detect, 33);
    });
    video[0].play();
});

$('#detect').on('click', function(){
    detect();
});

$('#optR').val(opt_r).on('change', function(){
    opt_r = this.value;
});

$('#optG').val(opt_g).on('change', function(){
    opt_g = this.value;
});

$('#optB').val(opt_b).on('change', function(){
    opt_b = this.value;
});

$('#optRG').val(opt_rg).on('change', function(){
    opt_rg = this.value;
});

$('#optGB').val(opt_gb).on('change', function(){
    opt_gb = this.value;
});

$('#optRB').val(opt_rb).on('change', function(){
    opt_rb = this.value;
});

$('#optT').val(opt_t).on('change', function(){
    opt_t = this.value;
});

function update(){
    w = video[0].clientWidth;
    h = video[0].clientHeight;
    var size = {
        width: w,
        height: h
    };
    cav1.attr(size);
    cav2.attr(size);
}

function detect(){
    ctx1.drawImage(video[0], 0, 0, w, h);
    var imagedata = ctx1.getImageData(0, 0, w, h);
    var data = imagedata.data;
    var l = data.length;
    var col = imagedata.width;
    var i, n, x, y;
    //var pixels = [];
    //var gray;
    var step = 4;
    var areas = [];
    var last, j, k;
    //var t = +new Date();
    for (var i = 0; i < l; i+= step) {
        //gray = (data[i]*299 + data[i + 1]*587 + data[i + 2]*114 + 500) / 1000;
        //data[i] = gray;
        //data[i + 1] = gray;
        //data[i + 2] = gray;
        if (check(data[i], data[i + 1], data[i + 2])) {
            data[i] = 255;
            data[i + 1] = 102;
            data[i + 2] = 0;
            data[i + 3] = 255;
            n = i / step;
            y = Math.floor(n / col);
            x = n - y * col;
            if (!last) {
                last = [x, x, y, y];
            } else if (y === last[3]
                    && x - last[1] < 5) {
                last[1] = x;
            } else {
                j = 0;
                k = areas.length;
                for (; j < k; j++) {
                    if (last[0] < areas[j][1] 
                            && last[1] > areas[j][0]
                            && last[3] - areas[j][3] < 5) {
                        if (last[0] < areas[j][0]) {
                            areas[j][0] = last[0];
                        }
                        if (last[1] > areas[j][1]) {
                            areas[j][1] = last[1];
                        }
                        areas[j][3] = last[3];
                        last = areas[j];
                        break;
                    }
                }
                if (!areas[0] || last !== areas[j]) {
                    areas.push(last);
                }
                last = [x, x, y, y];
            }
        }
        //n = i / step;
        //y = Math.floor(n / col);
        //x = n - y * col;
        //if (!pixels[y]) {
            //pixels[y] = [];
        //}
        //pixels[y][x] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    }
    //console.info(+new Date() - t);
    ctx2.putImageData(imagedata, 0, 0);
    //ctx2.clearRect(0, 0, w, h);
    ctx2.lineWidth = 5;
    ctx2.strokeStyle = "#0066ff";
    areas.forEach(function(area){
        if (area[1] - area[0] < 5 || area[3] - area[2] < 5) {
            return;
        }
        ctx2.strokeRect(area[0], area[2], 
            area[1] - area[0], area[3] - area[2]);
    });
    //console.info(imagedata.width, imagedata.height, w, h, pixels.length, pixels[0].length, pixels[pixels.length - 1].length);
    //window.pixels = pixels;
    //console.info(areas)
}

function check(r, g, b){
    return (Math.abs(r - opt_r) < opt_t
            && Math.abs(g - opt_g) < opt_t
            && Math.abs(b - opt_b) < opt_t)
        || (r - g < 0 && Math.abs(r - g - opt_rg) < opt_t
            && g - b > 0 && Math.abs(g - b - opt_gb) < opt_t 
            && r - b > 0 && Math.abs(r - b - opt_rb) < opt_t);
}

});
