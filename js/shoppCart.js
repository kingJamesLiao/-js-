(function () {
    function G(name) {
        return document.getElementsByClassName(name)
    }

    function J(tagName) {
        return document.getElementsByTagName(tagName)
    }

    function N(id) {
        return document.getElementById(id)
    }

    function K() {
        for (var n = 0; n < G("store-bottom").length; n++) {
            G("store-bottom")[n].style.backgroundColor = "#fff4e8";
        }
    }

    function H() {
        for (var n = 0; n < G("store-bottom").length; n++) {
            G("store-bottom")[n].style.backgroundColor = "white";
        }
    }
    //触发全选
    function Q(state) {
        for (var i = 0; i < G("all").length; i++) {
            G("all")[i].checked = state;
        }
    }
    //求和
    function M() {
        var total = 0;
        for (var j = 0; j < G("money").length; j++) {

            total += parseFloat(G("money")[j].innerHTML);

        }
        N('total').innerHTML = toDecimal2(total);
    }
    //验证店铺选中状态
    function store() {
        var storeLength = G("one").length;
        var sum = 0;
        for (var i = 0; i < storeLength; i++) {
            if (G('one')[i].checked === true) {
                sum += 1;
                if (sum === storeLength) {
                    Q(true);
                }
            }
        }
    }
    // store()
    //验证商品选中状态
    function pitch() {
        var checkLength = G("two").length;
        var xiaoji = 0;
        var count = 0;
        for (var i = 0; i < checkLength; i++) {
            if (G("two")[i].checked === true) {

                G("two")[i].style.backgroundColor = "#fff4e8";
                xiaoji += parseFloat(G("money")[i].innerHTML);
                count += parseInt(G("num")[i].innerHTML);

            }
        }
        N('total').innerHTML = toDecimal2(xiaoji)
        $('.footer-left ul li span').html(count)
    }
    //强制保留两位小数
    function toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }
    for (var i = 0; i < J("input").length; i++) {
        J("input")[i].checked = true;
        K()
        pitch()
    }
    for (var i = 0; i < G("list").length; i++) {
        G("jia")[i].index = i;
        G("jian")[i].index = i;
        G("list")[i].onclick = function (event) {
            var tar = event.target;
            var ind = tar.index;
            // console.log(tar)
            var num = G("num")[ind].innerHTML;
            // console.log(num)
            var yuanjia = G("yuanjia")[ind].innerHTML;
            var storeBot;
            if (tar.getAttribute("class") == "jia") {
                num++;
                storeBot = $(this).parent("div").parent("div").parent(".store-bottom")[0];
                storeBot.style.background = '#fff4e8';

            } else if (tar.getAttribute("class") == "jian") {
                if (num > 1) {
                    num--;
                } else {
                    num = 1;
                }
            }
            G("num")[ind].innerHTML = num;
            var money = parseFloat(yuanjia) * num;
            G("money")[ind].innerHTML = toDecimal2(parseFloat(money));
            // G("one")[ind].checked = true;
            G("two")[ind].checked = true;
            pitch()

        }
    }
    for (var i = 0; i < G("all").length; i++) {
        G("all")[i].onclick = function () {
            var input = J("input");
            if (this.checked) {
                for (var j = 0; j < input.length; j++) {
                    input[j].checked = true;
                }
                K();
                // M();
                pitch()
            } else {
                for (var m = 0; m < input.length; m++) {
                    input[m].checked = false;
                }
                H();
                N('total').innerHTML = toDecimal2(0);
                $('.footer-left ul li span').html(0)
            }
        }
    }

    var arr = [];
    for (var i = 0; i < G("one").length; i++) {
        G("one")[i].onclick = function () {

            var ind = this.index;
            var money = $(this).parent(".store-top").parent(".store").find(".money");
            var two = $(this).parent(".store-top").parent(".store").find(".two");
            var storeBottom = $(this).parent(".store-top").parent(".store").find(".store-bottom");
            var oneSib = $(this).parent(".store-top").parent(".store").siblings(".store").find(
                ".one"); //店铺名兄弟元素
            var moneyLength = $(this).parent(".store-top").parent(".store").find(".money").length;
            for (var i = 0; i < oneSib.length; i++) {
                if (oneSib[i].checked != false) {
                    Q(true);
                }
            }
            var xiaoji = 0;
            for (var k = 0; k < moneyLength; k++) {
                xiaoji += parseFloat($(this).parent(".store-top").parent(".store").find(".money")[k].innerHTML);
            }
            if (this.checked == false) {
                Q(false);
                for (var k = 0; k < moneyLength; k++) {
                    two[k].checked = false;
                    storeBottom[k].style.backgroundColor = "white";
                }
                arr.pop(xiaoji)
                var n = 0;
                for (var m in arr) {
                    n += arr[m];
                }
                N('total').innerHTML = toDecimal2(n)
            } else {
                if(oneSib[0] === undefined){
                    Q(true)
                }
                arr.push(xiaoji)
                for (var k = 0; k < moneyLength; k++) {
                    two[k].checked = true;
                    storeBottom[k].style.backgroundColor = "#fff4e8";
                }
                var n = 0;
                for (var m in arr) {
                    n += arr[m];
                }
                N('total').innerHTML = toDecimal2(n)
            }
            pitch();
        }
    }
    //二级按钮
    for (var i = 0; i < G("two").length; i++) {

        G("two")[i].index = i;
        G("two")[i].onclick = function () {
            pitch();
            var ind = this.index;
            //获取店铺
            var parentOne = $(this).parent(".s-b-left").parent(".store-bottom").parent(".store").find(".one")[
                0];
            var checkSib = $(this).parent(".s-b-left").parent(".store-bottom").siblings(".store-bottom");
            //同一店铺不同商品件数
            var checkSibLength = checkSib.length;
            if (this.checked == true && checkSib.length < 1) { //同一店铺一种商品
                $(this).parent(".s-b-left").parent(".store-bottom")[0].style.backgroundColor = "#fff4e8";
                parentOne.checked = true;
                store()
            } else if (this.checked == true && checkSib.length > 0) { //同一店铺一种商品以上
                $(this).parent(".s-b-left").parent(".store-bottom")[0].style.backgroundColor = "#fff4e8";
                var twoSum = 0;
                for (var i = 0; i < checkSib.length; i++) {
                    if (checkSib.find(".two")[i].checked === true) {
                        twoSum += 1;
                        //如果商品为全部选中状态
                        if (twoSum === checkSib.length) {
                            parentOne.checked = true;
                            store()
                        }
                    }
                }
            } else {
                $(this).parent(".s-b-left").parent(".store-bottom")[0].style.backgroundColor = "white";
                parentOne.checked = false;
                Q(false);

            }
        }
    }
    //事件委托删除商品
    var delImg = document.querySelectorAll(".store .s-b-right .box4 img")
    for(let i = 0 ; i < delImg.length; i++){
        delImg[i].addEventListener('click' , function(){
            // G("store-bottom")[i].remove()
            let itself = $(this).parent(".box4").parent(".s-b-right").parent(".store-bottom")[0];
            let isParent = $(this).parent(".box4").parent(".s-b-right").parent(".store-bottom").parent(".store")[0];

            let sibLength = $(this).parent(".box4").parent(".s-b-right").parent(".store-bottom").siblings(".store-bottom").length;
            itself.remove();
            if(sibLength < 1){
                isParent.remove();
                if(G("two").length < 1){
                    G("footer3")[0].remove()
                    G("notCommo")[0].style.display = 'block';
                }
                else{
                    G("notCommo")[0].style.display = 'nont';
                }
            }
        })
    }
})()