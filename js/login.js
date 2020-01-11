    var phone = document.getElementById("phone")
    var pass = document.getElementById("pass")
    var loginBtn = document.getElementById("loginBtn")
    var loginCheck = document.getElementById("loginCheck") 
    var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    loginBtn.addEventListener('click' , function(){
        if(phone.value === ''){
            alert("手机号不能为空")
            console.log(loginCheck.checked)
        }
        else if(!reg.test(phone.value)){
            alert('请输入正确的手机号码');
        }
        else if(pass.value === ''){
            alert("密码不能为空")
        }
        else if(!loginCheck.checked){
            alert("请勾选我已阅读")
        }
        else{
            location.href='list.html'
        }
    })
    /*发送验证码*/
    $("#verify span").click(function(){
       if($("#verify input").val() === ''){
           alert('请输入手机号')
       }
       else if(!reg.test($("#verify input").val())){
           alert('请输入正确的手机号')
       }
    })
    /*下一步 */
    $('#nextBtn').click(function(){
        if($("#verify input").val() === ''){
            alert('请输入手机号')
        }
        else if(!reg.test($("#verify input").val())){
            alert('请输入正确的手机号')
        }
        else if($(".email .code").val() === ''){
            alert('请输入验证码')
        }
        else{
            $('#register').css("display" , "none").siblings("#setPassword").css("display" , "block");
        }
       
    })
    /*返回 */
    $('#backBtn').click(function(){
        location.href='thirdIndex.html';
    })
    $('#backBtnIdx').click(function(){
        location.href='index.html';
    })
    //站内外
    $(".head-input span").click(function(){
        console.log($(this))
        $(this).addClass(".cur")
    })