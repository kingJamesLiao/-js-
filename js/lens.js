(function () {
    /*使用jqzoom*/
    $(function () {
        //放大镜实现js
        $(".jqzoom").jqueryzoom({
            xzoom: 400, //放大图的宽度(默认是 200)
            yzoom: 400, //放大图的高度(默认是 200)
            offset: 10, //离原图的距离(默认是 10)
            position: "right", //放大图的定位(默认是 "right")
            preload: 1
        });
        //底部图片hover切换实现js
        $('.b_container img').hover(function () {
            $('.jqzoom img').attr('src', $(this).attr('src'));
            $('.jqzoom img').attr('jqimg', $(this).attr('src'));
        }, function () {
            $.noop();
        });
    });
    //用户输入为空时自动为0
    $(".sizeRight").find('input[class*=text_box]').change(function () {
        if ($(this).val() == "" || undefined || null) {
            $(this).val(0)
        }
    })

    $(".min").click(function () {
        var t = $(this).parent().find('input[class*=text_box]'); //parent 查找父级元素
        if (t.val() == "" || undefined || null) {
            t.val(0);
        }
        t.val(parseInt(t.val()) - 1)
        if (parseInt(t.val()) < 0) {
            t.val(0);
        }
    })
    $(".add").click(function () {
        var t = $(this).parent().find('input[class*=text_box]');
        if (t.val() == "" || undefined || null) {
            t.val(0);
        }
        t.val(parseInt(t.val()) + 1)
    })
    $(".head-input span").click(function () {
        $(this).addClass("cur").siblings().removeClass("cur")
    })
    //倒计时

    function NextTime(next, cb) {
        var t;
        (function ft() {
            var dif = (next.getTime() - (new Date()).getTime()) / 1000;
            if (dif > 0) {
                t = setTimeout(ft, 1000);
                if (cb)
                    cb(Math.floor(dif % 86400 / 3600), Math.floor(dif % 3600 / 60), Math.floor(dif % 60));
            } else {
                clearTimeout(t);
            }
        })();
        return function () {
            clearTimeout(t);
        };
    }

    function lpad(num, n) {
        var len = num.toString().length;
        while (len < n) {
            num = "0" + num;
            len++;
        }
        return num;
    }

    var now = new Date();
    var next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    console.log(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
    console.log(next ,'sunflower')
    new NextTime(next, function (hour, minute, second) {
        document.getElementById("down").innerHTML = lpad(hour, 2) + ':' + lpad(minute, 2) + ':' + lpad(
            second, 2);
    });
    new NextTime(next, function (hour, minute, second) {
        document.getElementById("down2").innerHTML = lpad(hour, 2) + ':' + lpad(minute, 2) + ':' + lpad(
            second, 2);
    });
    /*放大镜左右切换*/
    var bContainer = document.getElementsByClassName("b_container")[0];
    var bcLeft = document.querySelectorAll(".b_container .left")[0]; //左
    var bcRight = document.querySelectorAll(".b_container .right")[0]; //右
    var imgsLenght = document.querySelectorAll(".b_container img").length;
    bcLeft.addEventListener('click', function () {
        var imgs = document.querySelectorAll(".b_container img");
        imgs[0].style.opacity = 0;
        bContainer.appendChild(imgs[0]);
        imgs[0].style.opacity = 1;
    })
    bcRight.addEventListener('click', function () {
        var imgs = document.querySelectorAll(".b_container img");
        imgs[imgsLenght - 1].style.opacity = 0;
        bContainer.insertBefore(imgs[4], bContainer.children[0]);
        imgs[imgsLenght - 1].style.opacity = 1;
    })
    //选中颜色
    $(".color div").click(function (e) {
        if (e.toElement.tagName != 'P') {
            $(this).addClass("colorCur").siblings().removeClass("colorCur")
        }
    })
    var height = $(".container_right").outerHeight()
    $(".mainTop").css({
        "height": height + 20 + 'px'
    })
})()