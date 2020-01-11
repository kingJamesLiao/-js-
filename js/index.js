(function(){
    var buying = document.getElementById("buying")
    var jiantou = document.getElementsByClassName("jiantou")
    var commoHot = document.querySelector(".container .commoHot")
    var ul = document.querySelector(".commoHot ul")
    var lis = ul.querySelectorAll("li")
    var goBack = document.querySelector(".buying")
    var left;
    commoLeft.addEventListener('click' , function(){
        left = parseInt(ul.style.left)
        ul.style.left = (left - 540) + "px";
        // console.log(ul.style.left)
    })
    goBack.addEventListener('click' ,function(){
        ul.style.left = 0;
    })
    var random = 0;
    var timer = setInterval(function(){
        random = Math.round(Math.random()*8)
        lis[random].style.opacity = 0;
        ul.appendChild(lis[random]);
        lis[random].style.opacity = 1;
        // console.log(random)
    },2000)
})()