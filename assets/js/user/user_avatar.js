(function(){
   var layer = layui.layer
   // 1.1 获取裁剪区域的 DOM 元素
   var $image = $('#image')
   // 1.2 配置选项
   const options = {
     // 纵横比
     aspectRatio: 1,
     // 指定预览区域
     preview: '.img-preview'
   }
  
   // 1.3 创建裁剪区域
   $image.cropper(options)



   //点击上传按钮触发file点击事件
   $('#file_img').on('click',function(){
    $('#file').click();
   })

  //首先给上传按钮绑定一个change事件
   $('#file').on('change',function(e){
  //获取用户文件
   console.log(e);
   var filelist = e.target.files
  //  console.log(filelist);
  if(filelist.length ===0 ){
    return layer.msg('请选择照片') ;
  }
   //拿到用户选择的文件
   var file = e.target.files[0]
   //2. 根据选择的文件，创建一个对应的 URL 地址：
   var newImgURL = URL.createObjectURL(file)
   //3. 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创新的裁剪区域`：
   $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
   })
 
   //给确定按钮添加点击事件
   $('#img_vgod').on('click',function(){
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    
      //发送ajax请求
      $.ajax({
      url:'/my/update/avatar',
      method:'POST',
      data:{avatar:dataURL}
      }).then(res=>{
       if(res.status !==0){
        return layer.msg(res.message)
       }
       layer.msg(res.message)
       //因为我们调用这个函数是在iframe主页中 所以要用到parent属性调用
       window.parent.getUserinfo ()
      })
   })
   
})()