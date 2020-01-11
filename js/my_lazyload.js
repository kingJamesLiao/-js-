/**
 * Created by zzq on 2016/12/20.
 */
//设置li的height
var height = document.body.clientWidth;
var aLi =document.getElementsByClassName("pic")
console.log(aLi)
// for (var i = 0,len = aLi.length-1; i < len;i++){
//     aLi[i].style.height=height+'px';
// }
function setImg(index){
    var oDiv=document.getElementById("div1")
    var oUl=oDiv.children[0];
    var aLi=oUl.children;
    if (aLi[index].dataset) {
        var src=aLi[index].dataset.src;
    } else{
        var src=aLi[index].getAttribute('data-src');
    }
    var oImg=document.createElement('img');
    oImg.src=src;
    if (aLi[index].children.length==0) {
        aLi[index].appendChild(oImg);
    }
}
//获得对象距离页面顶端的距离
function getH(obj) {
    var h = 0;
    while (obj) {
        h += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return h;
}
window.onscroll = function () {
    var oDiv = document.getElementById('div1');
    var oUl = oDiv.children[0];
    var aLi = oUl.children;
    
    for (var i = 0, l = aLi.length; i < l; i++) {
        var oLi = aLi[i];
        //检查oLi是否在可视区域
        var t = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop);
        var h = getH(oLi);
        if (h < t) {
            setTimeout("setImg(" + i + ")", 500);
        }
    }
};
//当页面加载完成以后要主动运行一下window.onscroll，从而获得当前可视范围内的图片
window.onload = function () {
    window.onscroll();
};