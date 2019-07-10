
function indexInit(){
    loadViews($(".main"),"search.html");
    $("#indexEditList").off("click","li").on("click","li",function(){
        var str =$(this).text();
        if(str=="返回主页"){
            loadViews($(".main"),"search.html");
        }else if(str=="编辑条件"){
            loadViews($(".main"),"advanced.html");
            $("#advancedModal").modal("show");
        }
    })

}
$(function(){
    indexInit()
})