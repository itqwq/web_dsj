(function(){
    //拿到layui.form
    var form = layui.form
    var yaler = layui.yaler
    //制定校验规则
    form.verify({
        pwd :[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          
        newpwd: function(value) {
            if(value === $('[name=oldPwd ]').val()){
                return '新旧密码不能相同'
            }
         },

         repwd: function(value){
            if(value !== $('[name="newPwd"]').val()){
                return '两次密码不一致'
            }
         }
    })

    // 给表单设置提交事件 然后利用ajax发送请求
    $('.layui-form').on('submit',function(e) {
    //阻止默认重置
    e.preventDefault();
    //发送alax请求
    $.ajax({
    url:'/my/updatepwd',
    method:'POST',
    //serialize() 快速获取这个表单值的方法
    data: $(this).serialize()
    }).then(res=>{
        console.log(res);
        if(res.status !== 0){
            return layer.msg(res.message)
        }
        layer.msg(res.message)
        //重置表单$('.layui-form')只能拿到jquery对象 而form是DOM对象 我们要在后面加一个[0] 把jquery转成DOM对象
        // 然后再用form自带的reset() 重置方法 重置表单
        $('.layui-form')[0].reset()
    })
     })

})()