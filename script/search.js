

$(function(){
    $("#normalSearch").off("click").on("click",function(){
        loadViews($(".main"),"details.html")
    })
    $("#advancedSearch").off("click").on("click",function(){
        loadViews($(".main"),"advanced.html")
    })
})