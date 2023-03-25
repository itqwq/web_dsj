(function(){
  //在layui中接收表单
  var form = layui.form
  let layer = layui.layer
  form.verify({
    nikename : function(value){
  if(value.length >=6){
   return '昵称长度必须在 1 ~ 6 个字符之间！'
  }
    }
  })
//调用函数
inuserinfo()
//封装函数 获取用户信息
function inuserinfo(){
  $.ajax({
  url:'/my/userinfo',
  method:'GET',
  }).then(res=>{
    if(res.status !== 0 ){
     return res.message === '获取用户信息失败！'
    }
    console.log(res);
  //调用form.val()快速为表单赋值
    form.val('formUserInfo', res.data);
  })
}
// 给重置按钮添加点击事件 
$('#btnReset').on('click',function(e){
// 阻止表单默认重置
 e.preventDefault();
 //调用函数 从新获取表单
 inuserinfo()

})
})()

