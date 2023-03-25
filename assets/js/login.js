(function(){
    // 绑定点击事件点击注册登陆按钮消失
    $('#box-zc').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 绑定点击事件点击登录注册按钮消失
    $('#box-dl').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //从layui.js中取出form对象
    var form = layui.form;
    //从layui.js中取出form对象
    var yaler = layui.layer;
    //通过 form.verify()函数自定义校验规则
    form.verify({
    //自定义了一个叫做qwq的校验规则
    qwq:[  /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    pwqwq:function(value){
    //通过形参拿到的是确定密码框的内容
    //还需要拿到密码框中的内容
    //然后进行一次判断
    //如果判断失败，则return一个提示消息
    let qwqval = $('.reg-box [name="password"]').val()
    if(qwqval !== value)
    // alert("两次密码不一样")
    return '两次输入密码不一样'
        }
    })

    //注册表单的交互
    $('#form_reg').on('submit', function(e) {
        //阻止默认行为
        e.preventDefault();
       //发起ajax请求
       $.post('/api/reguser',
        {username:$('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()},
        function(res){
            // console.log(res);
            if(res.status !== 0 ){
                //利用layui框架的layer提示功能制作
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            $('#box-dl').click();
        }
       )
    })

    //登录表单的交互
    $('#form_leb').on('submit',function(e){
    e.preventDefault()
    //发起ajax请求
    $.ajax({
    url:'/api/login',
    method:'post',
    //快速获取表单数据
    data:$('#form_leb').serialize()
    }).then(res=>{
        // console.log(res);
        if(res.status !== 0){
            return layer.msg('登录失败');
        }
        layer.msg('登录成功');
        //拿一个数据存储token值 因为这个值拥有后台访问权限 将得到的token字符串 保存到 localStorage 中
        localStorage.setItem('token',res.token)
        // console.log(res.token);
        //跳转至后台
        location.href = 'index.html'
    })
    })
})()