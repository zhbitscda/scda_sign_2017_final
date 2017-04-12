
var $_GET = (function(){
    var url = window.document.location.href.toString();
    var u = url.split("?");
    if(typeof(u[1]) == "string"){
        u = u[1].split("&");
        var get = {};
        for(var i in u){
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
})();

function GetRequest() { 
var url = location.search; //获取url中"?"符后的字串 
var theRequest = new Object(); 
if (url.indexOf("?") != -1) { 
var str = url.substr(1); 
strs = str.split("&"); 
for(var i = 0; i < strs.length; i ++) { 
theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
} 
} 
return theRequest; 
} 

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return "";
}

function EnterPress(e){ //传入 event 
    var e = e || window.event; 
    if(e.keyCode == 13){ 
    document.getElementById("txtAdd").focus(); 
    } 
} 

function output_signlist(data){  //清空元素先
	$('#signlist_main').empty();
	console.log(data);
	data=eval(data);
	if(!(data[0].error==1)){
	for(var i=0;i<data.length;i++){//依次输出返回数据到表格中
		var appenstr='<tr><td>'+data[i].name+'</td><td>'+data[i].tel+'</td><td>'+data[i].address+'</td><td>'+data[i].department+'</td><td><button class="btn btn-xs btn-alt m-r-5" data-appid="'+data[i].appid+'" onclick="Cancel_action(this)" style="padding-top: -10px;">取消签退</button></td></tr>';
		$('#signlist_main').append(appenstr);
	}
	}
	else{
		window.location.href='login.php';
	}
}


function output_signlist_noop(data){  //清空元素先
	$('#signlist_main').empty();
	console.log(data);
	data=eval(data);
	if(!(data[0].error==1)){
	for(var i=0;i<data.length;i++){//依次输出返回数据到表格中
		var appenstr='<tr><td>'+data[i].name+'</td><td>'+data[i].tel+'</td><td>'+data[i].address+'</td><td>'+data[i].department+'</td><td><button class="btn btn-xs btn-alt m-r-5" data-appid="'+data[i].appid+'" onclick="Sign_action(this)" style="padding-top: -10px;">签退</button></td></tr>';
		$('#signlist_main').append(appenstr);
	}
	}
	else{
		window.location.href='login.php';
	}
}

function Get_sign_list(aid,type){
	if(type=='NULL'||type==''){
	    $.ajax({
	   	type:"get",
	   	url:"view_exit.php",
	   	data:{aid:aid},
	   	async:true,
        success:function(data){
        	output_signlist(data);
        }
	   });
	}
	else
	{
		//alert(aid);
	    $.ajax({
	   	type:"get",
	   	url:"view_exit.php",
	   	data:{aid:aid,type:type},
	   	async:true,
        success:function(data){
        	if(type==1){
        		output_signlist_noop(data);
        	}else{
        	   output_signlist(data);
        	}

        }
	   });
	}
}

 function Cancel_action(obj){
	layer.confirm('<span style="color:#000000">确认要取消签退吗？</span>',function(index){
		appid=$(obj).data('appid');
	//	alert(appid);
		var aid=GetQueryString('aid');
		$.get('view_exit.php',{aid:aid,action:"cancel",appid:appid});
		$(obj).parents("tr").remove();
		layer.msg('<span style="color:#000000">已取消!</span>',{icon: 1,time:1000});
	});
}
 
 function Sign_action(obj){
	layer.confirm('<span style="color:#000000">确认要签退吗？</span>',function(index){
		appid=$(obj).data('appid');
		//alert(appid);
		var aid=GetQueryString('aid');
		$.get('sign.php',{aid:aid,action:"confirm",appid:appid});
		$(obj).parents("tr").remove();
		layer.msg('<span style="color:#000000">已签退!</span>',{icon: 1,time:1000});
	});
}

function view_unsign(){
	var aid=GetQueryString('aid');
	//alert(aid);
	Get_sign_list(aid,1);
}

function view_sign(){
	var aid=GetQueryString('aid');
	Get_sign_list(aid,2);
}

$("#signlist_main").ready(function(){
	var aid=GetQueryString('aid');
	Get_sign_list(aid,'');//主界面初始化完毕之后开始拉数据并生成需要的东西
});


function sign_search(){
	var str=$('#search_box').value();
	var aid=GetQueryString('aid');
	Get_sign_list(aid,str);
}

