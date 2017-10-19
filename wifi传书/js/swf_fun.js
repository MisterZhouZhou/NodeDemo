/**
 * swf 上传
 */
var swfu;//swfupload 对象
var swfSelectCount = 0;// 当前选中的文件数量 
 
window.onload = function() {
	var settings = {
		flash_url : "js/swfupload.swf",
		upload_url: config.url,	
		/*post_params: {"PHPSESSID" : "<?php echo session_id(); ?>"},*/
		file_size_limit : config.fileLimitSize+" B",
        
        file_types : "*."+config.fileTypes.split("|").join(";*."),
		
		file_types_description : "All Files",
		file_upload_limit : 1000,  //配置上传个数
		file_queue_limit : 0,
		custom_settings : {
			progressTarget : "fsUploadProgress",
			cancelButtonId : "btnCancel"
		},
		debug: 0,

		button_cursor:SWFUpload.CURSOR.HAND,
		button_image_url: "i/wifi_btn.png",
		button_width: "240",
		button_height: "100",
		button_float: "right",
		button_placeholder_id: "spanButtonPlaceHolder",
		button_text: '<span class="theFont"></span>',

		assume_success_timeout:30,
		file_queued_handler : swfFileQueued,
		file_queue_error_handler : fileQueueError,
		file_dialog_complete_handler : fileDialogComplete,
		upload_start_handler : uploadStart,
		upload_progress_handler : uploadProgress,
		upload_error_handler : uploadError,
		upload_success_handler : uploadSuccess,
		upload_complete_handler : uploadComplete,
		queue_complete_handler : queueComplete	
	};
	swfu = new SWFUpload(settings);
 };
 
 
 
 //上传完成
function uploadComplete(file,server,response) 
{
	//继续下一个文件的上传
	this.startUpload();
}

//完成队列里的上传
function queueComplete(numFilesUploaded) 
{
	
}

function userStartUpload(file_id)
{
	swfu.startUpload(file_id);
}





function fileQueueError(file, errorCode, message) 
{
	
	var title =  document.title.match('WiFi 字体') ? "字体" : "图书";
	switch(errorCode){
		case -100:
			alert("上传"+title+"不能大于100本");
		case -110:
			alert("上传单本"+title+"不能大于500MB");
		break;
		case -120:
			alert("上传单本"+title+"不能为0KB");
		break;
	}
}
//入列完毕
function fileDialogComplete(numFilesSelected, numFilesQueued) 
{
	if (numFilesSelected > 0)
	{
		this.startUpload()
	}
}
//开始上传
function uploadStart(file) 
{
	return true;
}

//上传出错
function uploadError(file, errorCode, message)
{
	switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
			errorMessage = "上传错误";
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
			errorMessage = "上传失败";
			break;
		case SWFUpload.UPLOAD_ERROR.IO_ERROR:
			errorMessage = "请打开WiFi传书界面";
			break;
		case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
			errorMessage = "安全错误";
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
				errorMessage = "安全错误";
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
			errorMessage = "无法验证.  跳过上传";
			break;
		default:
			errorMessage = "未处理的错误";
			break;
		}
		
	//从上传队列中移除
	removeFileFromFilesUpload(filesUpload, file.id)	
		
	errorMessage = "上传失败";	

	$("#handle_button_"+file.id).replaceWith("<dd>"+errorMessage+"</dd>")
}


var tmp = 0;
var errorFile = 0;
var errorMsgs = [];

function  swfFileQueued(file){
	
	
	//本次上传选中的文件个数
	if(swfSelectCount==0)  swfSelectCount = this.getStats().files_queued
	//检测文件
	msg = checkFile(file)

	
	//文件可以通过
	if(!msg){
		//添加全局的队列
		filesUpload.push(file);
		//在页面进行展示
		fileQueued(file, 0)
	}else{
		//从上传队列移除，验证失败的文件
		this.cancelUpload(file.id, false)
		errorMsgs.push(msg)
	}
	
	
	
	//队列选择完毕,初始化所有的数据
	if(++tmp == swfSelectCount){
		
		if(errorMsgs.length>0){
			//只选择做一个进行上传
			if(swfSelectCount==1){
				alert(errorMsgs[0]);
			}else{
			alert("你选择了"+swfSelectCount+"个文件，只能上传"+(swfSelectCount - errorMsgs.length)+"个文件。\n请选择"+config.fileTypes.split("|").join("、")+"文件，文件名不能重复。")
			}			
		}
		
		tmp = 0;
		errorFile = 0;
		swfSelectCount = 0;
		errorMsgs = []
	}

	
}



var SWFFuns = {
	cancelUpload : function(fid){
			swfu.cancelUpload(fid, false);
	}

}