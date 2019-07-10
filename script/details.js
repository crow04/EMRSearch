function detailsSearch() {}

function detailsInit() {
  // $("#detailsSearch").off("click").on("click",function(){
  //     var data=detailsSearch();
  //     loadResults(data)
  // })
  $(".result")
    .off("click", ".checkFn")
    .on("click", ".checkFn", function () {
      if ($(this).hasClass("fa-square-o")) {
        $(this).removeClass("fa-square-o");
        $(this).addClass("fa-check-square-o");
      } else {
        $(this).removeClass("fa-check-square-o");
        $(this).addClass("fa-square-o");
      }
      isCheackAll();
    });
  $(".result")
    .off("click", ".collectFn")
    .on("click", ".collectFn", function () {
      if ($(this).hasClass("fa-star-o")) {
        $(this).removeClass("fa-star-o");
        $(this).addClass("fa-star");
      } else {
        $(this).removeClass("fa-star");
        $(this).addClass("fa-star-o");
      }
    });
  $("#detailsCheckAll")
    .off("click")
    .on("click", function () {
      if ($(this).hasClass("checked")) {
        $(".result .checkFn").each(function (i) {
          if ($(this).hasClass("fa-check-square-o")) {
            $(this).removeClass("fa-check-square-o");
            $(this).addClass("fa-square-o");
          }
        });
        $(this).removeClass("checked");
        $(this).text("全选");
      } else {
        $(".result .checkFn").each(function (i) {
          if ($(this).hasClass("fa-square-o")) {
            $(this).removeClass("fa-square-o");
            $(this).addClass("fa-check-square-o");
          }
        });
        $(this).addClass("checked");
        $(this).text("取消全部选项");
      }
    });
  $("#permissionBtn").off("click").on("click", function () {
    var clen = $(".result").find(".checkFn.active.fa-check-square-o").length;
    var arr = [];
    if (clen > 0) {


      var result = $(".result");
      result.each(function (index, item) {
        // console.log($(item))
        if ($(item).find("i.fa.checkFn").hasClass("fa-check-square-o")) {
          let str = $(item).find(".result-pid").text();
          arr.push(str)
        }
      })

      $("#permissionModal").find(".permission-input-pid").val(arr.join(","))
      var font = `共计:${clen}条`;
      $("#permissionModal").find(".pIdLength").html(font);
      $("#permissionModal").modal("show");


    } else {
      // var str=`<span class="alertItem" style="color:#f00;font-size;margin-left:20px;">请选中要申请的选项!</span> `;

      $(".alertItem").show()
      setTimeout(function () {
        $(".alertItem").hide()
      }, 2000)
    }
  })
  $("#permissionModal").off("click", ".addmore").on("click", ".addmore", function () {
    $(".permissionPatientList").find("li").removeClass("active")
    var arr = $(".permission-input-pid").val().split(",");
    if ($(this).hasClass("fa-plus")) {
      $(this).removeClass("fa-plus");
      $(this).addClass("fa-minus");

      $(".permissionPatientList").find("li").each(function () {
        if ($(this).text() in arr) {
          $(this).addClass("active");
        }
      })
      $(".permissionPatientList").show();
    } else {
      $(this).removeClass("fa-minus");
      $(this).addClass("fa-plus");
      $(".permissionPatientList").hide();
    }

  })
  $(".permissionPatientList ul li").off("click").on("click", function (e) {
    var arr = $(".permission-input-pid").val().split(",");
    var str = $(this).text()
    $(this).addClass("active")
    arr.push(str);
    console.log(arr)
    $(this).val(arr.join(","))
  })
  //// laydate 时间插件 初始化;
  laydate.render({
    elem: '#dateTimeRange', //指定元素  
    format: 'yyyy/MM/dd',
    trigger: "click"
  });
}
///0020170906,0020113131,00201728998,0020132543,0042378210,0042378210,0042378210,0042378210
/// 是否全部选中
function isCheackAll() {
  var len = $(".result").find(".checkFn").length;
  var clen = $(".result").find("i.fa.checkFn.active.fa-check-square-o").length;
  if (clen == len) {
    $("#detailsCheckAll").addClass("checked");
    $("#detailsCheckAll").text("取消全部选项");
  } else if (clen == 0) {
    $("#detailsCheckAll").removeClass("checked");
    $("#detailsCheckAll").text("全选");
  } else {
    $("#detailsCheckAll").addClass("checked");
    $("#detailsCheckAll").text("取消选中项");
  }
}

function loadResults(data) {
  var arr = [];
  for (var i = 0; i < data.length; i++) {
    var html = `

        `;
  }
}
$(function () {
  detailsInit();
});

var details = {
  data: [{}]
};