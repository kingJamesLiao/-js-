(function(){
    $(".head-input span").click(function(){
        $(this).addClass("cur").siblings().removeClass("cur")
    })
    function G(name) {
        return document.getElementsByClassName(name)
    }
    
function K() {
    for (var n = 0; n < G("store-bottom").length; n++) {
        G("store-bottom")[n].style.backgroundColor = "#fff4e8";
    }
}
function J(tagName) {
    return document.getElementsByTagName(tagName)
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
//初始化为选中状态
for (var i = 0; i < J("input").length; i++) {
    J("input")[i].checked = true;
    K()
    pitch()
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
    for (var i = 0; i < checkLength; i++) {
        if (G("two")[i].checked === true) {

            G("two")[i].style.backgroundColor = "#fff4e8";
            xiaoji += parseFloat(G("money")[i].innerHTML);
        }
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
            if (oneSib[i].checked != false || oneSib[0] === undefined) {
                Q(true);
            }

        }
        
        if (this.checked == false) {
            Q(false);
            for (var k = 0; k < moneyLength; k++) {
                two[k].checked = false;
                storeBottom[k].style.backgroundColor = "white";
            }
           
        } else {
            if(oneSib[0] === undefined){
                Q(true)
            }
            for (var k = 0; k < moneyLength; k++) {
                two[k].checked = true;
                storeBottom[k].style.backgroundColor = "#fff4e8";
            }
          
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