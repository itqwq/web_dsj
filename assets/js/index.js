(function(){
  //给退出按钮设置一个点击事件
  //拿到layer的值
  getUserinfo ()
  let layer = layui.layer
  $('#tuic').on('click',function(){
    // console.log('ok');
    //提示用户是否退出
    layer.confirm('确认退出吗?', {icon: 3, title:'提示'}, function(index){
      //do something
      //1.清空本地存储的 token
      localStorage.removeItem('token')
      localStorage.removeItem('oooo')
     //2.重新跳转登录页面
      location.href ='./login.html'


     // layui自带关闭confirm 询问框
      layer.close(index);
    });
  })
})()

//封装函数
function getUserinfo (){
  //发送axaj请求
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token')
    // },
    success: function(res){
      console.log(res);
      if(res.status !== 0){
        return layui.layer.msg('获取用户信息失败')
      }
    //给函数一个实参
    //不能然用户访问主页
      renderAvatar(res.data)
    },
    //无论成功还是失败，最终都会调用 complete
    // complete: function(res) {
    //   // console.log(res);
    //   //在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应的数据
    //   if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
    //     //1.清空存储数据
    //     localStorage.removeItem('token')
    //     //强制跳转登录页面
    //     location.href='./login.html'
    //   }
    //  }
  })
}

function renderAvatar(user) {
  // 选择用户头像
  let name = user.nickname || user.username;
  // 欢迎客户
  $('#welcom').html('欢迎&nbsp;&nbsp;' + name);
  // 设置图片头像
  if (user.user_pic) {
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text_wen').hide();
  // 设置文字头像
  } else {
    $('.layui-nav-img').hide();
    var first = name[0].toUpperCase();
    $('.text_wen').html(first).show();
  }
}





