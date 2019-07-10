var consCount = 0,
  conArr = [],
  logArr = []; ////  条件计数
function changeTabs() {
  $(".tabs-title  a.tab-name").click(function() {
    var idx = $(this).index();
    $(".tabs-contaier .tab-content")
      .eq(idx)
      .show()
      .addClass("active")
      .siblings()
      .hide()
      .addClass("active");
    $(".tabs-title  a.tab-name")
      .eq(idx)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
  $(".tabs-title  a.tab-name")
    .eq(0)
    .trigger("click");
}
function selectInit() {
  $("#PAInfoSelect").selectpicker();
  $(".patientInfo .condition-select").selectpicker();
  $("#logiclSignSelect").selectpicker();
}
function illnessSelectInit() {
  $(".illness .switch .switch-item")
    .off("click")
    .on("click", function() {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
    });
  $("#advancedModal .illness .illnessTypeList ")
    .off("click", "li")
    .on("click", "li", function() {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
      $("#advancedModal .illness")
        .find(".select-element.active")
        .removeClass("active");
      $("#advancedModal .illness")
        .find(".conditiones")
        .empty();
    });
  $("#advancedModal .illness .tab-content-body-right")
    .off("click", ".select-element")
    .on("click", ".select-element", function() {
      $(".illness .conditiones").show();
      $("#advancedModal .illness .tab-content-body").addClass("sm");
      $(this).addClass("active");
      var str = $(this).text();
      if (!isInConditiones($(".illness"), str)) {
        var htmlstr =
          ' <span class="select-element active">' +
          str +
          '<i class="fa fa-close select-element-close"></i></span>';
        $(".illness .conditiones").append(htmlstr);
      } else {
        alert(str + "已经选择过了");
      }
    });
  $("#advancedModal .modal-body .illness")
    .off("click", "i.select-element-close")
    .on("click", "i.select-element-close", function() {
      var str = $(this)
        .parent(".select-element")
        .text();
      $(this)
        .parent(".select-element")
        .remove();

      isCloseConditiones($(".illness"), str);
    });
}
function symptomSelectInit() {
  $(".symptom .switch .switch-item")
    .off("click")
    .on("click", function() {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
    });
  $("#advancedModal .symptom .tab-content-body-right")
    .off("click", ".select-element")
    .on("click", ".select-element", function() {
      $(".symptom .conditiones").show();
      $("#advancedModal .symptom .tab-content-body").addClass("sm");
      $(this).addClass("active");
      var str = $(this).text();
      if (!isInConditiones($(".symptom"), str)) {
        var htmlstr =
          ' <span class="select-element active">' +
          str +
          '<i class="fa fa-close select-element-close"></i></span>';
        $(".symptom .conditiones").append(htmlstr);
      } else {
        alert(str + "已经选择过了");
      }
      /// JQ 选择器可以获取display:none 的元素
      // var s= $(".illness .conditiones").find(".select-element.active");
      // console.log("display-none:",s)
    });
  $("#advancedModal .modal-body .symptom")
    .off("click", "i.select-element-close")
    .on("click", "i.select-element-close", function() {
      var str = $(this)
        .parent(".select-element")
        .text();
      $(this)
        .parent(".select-element")
        .remove();

      isCloseConditiones($(".symptom"), str);
    });
}
function clearConditiones() {
  $("#advancedModal")
    .find(".select-element.active")
    .removeClass("active");
  $("#advancedModal")
    .find(".conditiones")
    .empty();
  $("#advancedModal")
    .find("input.paInfoInput")
    .val("");
  $("#advancedModal").find(".tab-name").eq(0).trigger("click")   
}
function isInConditiones(tar, str) {
  var els = tar.find(".conditiones").find(".select-element.active"),
    arr = [],
    flag;

  for (var i = 0; i < els.length; i++) {
    var html = $(els[i]).text();
    arr.push(html);
  }
  if (arr.indexOf(str) > -1) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
}
function isCloseConditiones(tar, str) {
  var els = tar.find(".conditiones").find(".select-element.active");
  if (els.length == 0) {
    $(".conditiones").hide();
    tar.find(".tab-content-body").removeClass("sm");
    tar
      .find(".tab-content-body-right")
      .find(".select-element.active")
      .removeClass("active");
  }
  var rEles = tar
      .find(".tab-content-body-right")
      .find(".select-element.active"),
    rArr;
  for (var i = 0; i < rEles.length; i++) {
    var tml = $(rEles[i]).text();
    if (str == tml) {
      $(rEles[i]).removeClass("active");
    }
  }
}
function getConditiones() {
  var flag = $("#advancedModal .tabs-title a.tab-name.active").index();
  switch (flag) {
    case 0:
      var ndesc = $(
        "#advancedModal .patientInfo #PAInfoSelect option:selected"
      ).text();
      var nval = $(
        "#advancedModal .patientInfo #PAInfoSelect option:selected"
      ).val();
      var cname = $(
        "#advancedModal .patientInfo .condition-select option:selected"
      ).text();
      var cval = $(
        "#advancedModal .patientInfo .condition-select option:selected"
      ).val();
      var value = $("#advancedModal .patientInfo .paInfoInput").val();
      if ($.trim(value) != "") {
        var obj = {
          key: {
            code: nval,
            desc: ndesc
          },
          sign: {
            code: cval,
            desc: cname
          },
          value: [value]
        };
        pushObjToConArr(obj);
      }
      $("#advancedModal").modal("hide");
      clearConditiones();
      break;
    case 1:
      var keyDesc = $(
        "#advancedModal  .illness .illnessTypeList li.active"
      ).text();
      var tstr = $("#advancedModal .illness .conditiones").find(
          ".select-element.active"
        ),
        arr = [];
      var sign = $("#advancedModal .illness .switch")
          .find(".switch-item.active")
          .text(),
        signCode = $("#advancedModal .illness .switch")
          .find(".switch-item.active")
          .data("key");
      for (var i = 0; i < tstr.length; i++) {
        var str = $(tstr[i]).text();
        var code = $(tstr[i]).data("code");
        var obj = {
          code: code,
          name: str
        };
        arr.push(str);
      }
      if (arr.length > 0) {
        var obj = {
          key: {
            code: "",
            desc: keyDesc
          },
          sign: {
            code: signCode,
            desc: sign
          },
          value: arr
        };
        pushObjToConArr(obj);
      }
      
      $("#advancedModal").modal("hide");
      clearConditiones();

      break;
    case 2:
      var keyDesc = $("#advancedModal .tabs-title a.tab-name.active").text();
      var tstr = $("#advancedModal .symptom .conditiones").find(
          ".select-element.active"
        ),
        arr = [];
      var sign = $("#advancedModal .symptom .switch")
          .find(".switch-item.active")
          .text(),
        signCode = $("#advancedModal .symptom .switch")
          .find(".switch-item.active")
          .data("key");
      for (var i = 0; i < tstr.length; i++) {
        var str = $(tstr[i]).text();
        arr.push(str);
      }
      if (arr.length > 0) {
        var obj = {
          key: {
            code: "",
            desc: keyDesc
          },
          sign: {
            code: signCode,
            desc: sign
          },
          value: arr
        };
        pushObjToConArr(obj);
      }
      $("#advancedModal").modal("hide");
      clearConditiones();
      break;
    default:
      break;
  }
}
//// 判断是否在数组中
function pushObjToConArr(obj) {
  if (conArr.length > 0) {
    var flag, index;
    for (var i = 0; i < conArr.length; i++) {
      if (obj.key.desc == conArr[i].key.desc) {
        flag = true;
        index = i;
        continue;
      }
    }
    if (flag) {
      conArr.splice(index, 1, obj);
      //console.log("相等:conArr----------",conArr)
    } else {
      conArr.push(obj);
    }
  } else {
    conArr.push(obj);
  }
  //console.log("conArr----------",conArr)
  drawEl(conArr);
}
function jsPlumbInit() {
  var jsp = jsPlumb.getInstance({
    //锚点位置；对任何没有声明描点的Endpoint设置锚点，用于source及target节点
    Anchor: ["Right", "Left"],
    //Anchors: ["Right", "Left"], //连线的source和target Anchor
    ConnectionsDetachable: false, //连线是否可用鼠标分离
    ConnectionOverlays: [
      //连线的叠加组件，如箭头、标签
      [
        "Arrow",
        {
          //箭头参数设置
          location: 1,
          visible: false,
          width: 11,
          length: 11,
          id: "ARROW",
          events: {
            click: function() {}
          }
        }
      ],
      [
        "Label",
        {
          //标签参数设置
          location: 0.1,
          id: "label",
          //cssClass: "aLabel", //hover时label的样式名
          events: {
            tap: function() {}
          },
          visible: false
        }
      ]
    ],
    Connector: "Flowchart", //连线的类型，流程图(Flowchart)、贝塞尔曲线等
    //父级元素id；假如页面元素所在上层不同，最外层父级一定要设置
    Container: "themeDeatails",
    //如果请求不存在的Anchor、Endpoint或Connector，是否抛异常
    DoNotThrowErrors: false,
    //通过jsPlumb.draggable拖拽元素时的默认参数设置
    DragOptions: { cursor: "pointer", zIndex: 2000 },
    DropOptions: {}, //target Endpoint放置时的默认参数设置
    Endpoint: null, //端点（锚点）的样式声明
    //用jsPlumb.connect创建连接时，source端点和target端点的样式设置
    Endpoints: [null, null],
    EndpointOverlays: [], //端点的叠加物
    //端点的默认样式
    EndpointStyle: {
      fill: "transparent",
      stroke: "transparent"
      //radius: 4,
      //strokeWidth:1
    },
    EndpointStyles: [null, null], //连线的source和target端点的样式
    //端点hover时的样式
    //EndpointHoverStyle: {fill: '#bbb', stroke: '#bbb', radius: 4,strokeWidth: 0},
    //连线的source和target端点hover时的样式
    // EndpointHoverStyles: [null, null],
    //连线hover时的样式
    HoverPaintStyle: { stroke: "#333", strokeWidth: 2 },
    LabelStyle: { color: "black" }, //标签的默认样式，用css写法。
    LogEnabled: false, //是否开启jsPlumb内部日志
    Overlays: [], //连线和端点的叠加物
    MaxConnections: 10, //端点支持的最大连接数
    //连线样式
    PaintStyle: { stroke: "#ddd", strokeWidth: 1, joinstyle: "round" },
    ReattachConnections: true, //是否重新连接使用鼠标分离的线?
    RenderMode: "svg", //默认渲染模式
    Scope: "jsPlumb_DefaultScope", //范围，具有相同scope的点才可连接
    reattach: true
  });

  return jsp;
}
function advanceContentInit() {}
function drawEl(arr) {
  var jsp = jsPlumbInit();

  var html =
    ' <span class="select-element lastest advance-logs"  id="logsid">并且 <i class="fa fa-edit logical-edit"></i></span>';
  $(".advanced-content")
    .empty()
    .append(html);

  consCount = 0;
  var sarr = [];
  for (var i = 0; i < arr.length; i++) {
    ///  二次循环
    // for(var j=0;j<arr[i].value.length;j++){
    //   var str='<span data-code="'+arr[i].value[j].code+'">'+arr[i].value[j].name+'</span>'
    //   sarr.push(str);
    // }
    var tstr = arr[i].value.join(",");
    var str = arr[i].key.desc + arr[i].sign.desc + tstr;
    if (str.length > 14) {
      var len = arr[i].key.desc.length + arr[i].sign.desc.length;
      lstr = tstr.substring(0, 14 - len) + "...";
    } else {
      lstr = tstr;
    }

    var levelH = $(".advanced-content").height() / 2;
    var lTop = 120 + (consCount + 1) * 60 + "px",
      ctop = consCount * 60 + "px",
      lleft = (consCount + 1) * 238 + "px";
    var loghtml, conhtml;
    if (i > 0) {
      loghtml =
        ' <span class="select-element lastest advance-logs"  style="top:' +
        lTop +
        "!important;left:" +
        lleft +
        '!important" id="logsid' +
        i +
        '">并且 <i class="fa fa-edit logical-edit"></i></span>';
      conhtml =
        ' <span class="advance-cons" title="' +
        str +
        '"  style="top:' +
        ctop +
        "!important;left:" +
        lleft +
        '!important" id="consid' +
        i +
        '">' +
        "</span>";
      $(".advanced-content")
        .append(loghtml)
        .append(conhtml);
      // var str = arr[i].key.desc + arr[i].sign.desc + tstr;
      var elhtml =
        '<span class="key" data-code="' +
        arr[i].key.code +
        '">' +
        arr[i].key.desc +
        '</span><span class="sign" data-code="' +
        arr[i].sign.code +
        '">' +
        arr[i].sign.desc +
        '</span><span class="value" data-code="">' +
        lstr +
        '</span><i class="fa fa-trash con-delete" aria-hidden="true"></i>';
      $(".advanced-content")
        .find("#consid" + i)
        .html(elhtml);
      jsp.connect({
        source: "logsid" + i,
        target: "logsid" + (i - 1)
      });
      jsp.connect({
        source: "consid" + i,
        target: "logsid" + (i - 1)
      });
      consCount++;
    } else if (i == 0) {
      loghtml =
        ' <span class="select-element lastest advance-logs"  style="top:' +
        lTop +
        "!important;left:" +
        lleft +
        '!important"  id="logsid' +
        i +
        '">并且 <i class="fa fa-edit logical-edit"></i></span>';
      conhtml =
        ' <span class=" advance-cons" title="' +
        str +
        '"  style="top:' +
        ctop +
        "!important;left:" +
        lleft +
        '!important" id="consid' +
        i +
        '">' +
        "</span>";

      $(".advanced-content")
        .append(loghtml)
        .append(conhtml);
      var elhtml =
        '<span class="key" data-code="' +
        arr[i].key.code +
        '">' +
        arr[i].key.desc +
        '</span><span class="sign" data-code="' +
        arr[i].sign.code +
        '">' +
        arr[i].sign.desc +
        '</span><span class="value" data-code="">' +
        lstr +
        '</span><i class="fa fa-trash con-delete" aria-hidden="true"></i>';
      $(".advanced-content")
        .find("#consid" + i)
        .html(elhtml);
      jsp.connect({
        source: "logsid" + i,
        target: "logsid"
      });
      jsp.connect({
        source: "consid" + i,
        target: "logsid"
      });
      consCount++;
    }
  }
}

function advancedInit() {
  $("#comfirmBtn")
    .off("click")
    .on("click", function(e) {
      getConditiones();
      $(".clearBtn").removeClass("inactive");
      e.stopPropagation();
    });
  $(".clearBtn")
    .off("click")
    .on("click", function() {
      clearConditiones();
      conArr = [];
      $(".advanced-content").empty();
      $(this).addClass("inactive");
    });
  $(".commitBtn")
    .off("click")
    .on("click", function() {
      console.log("结果：", conArr);
    });
}
//// 删除数组中的元素
function popObjToConArr(str) {
  if (conArr.length > 0) {
    var flag, index;
    for (var i = 0; i < conArr.length; i++) {
      if (str == conArr[i].key.desc) {
        flag = true;
        index = i;
        continue;
      }
    }
    console.log("popObjToConArr:", flag, index, conArr);
    if (flag) {
      conArr.splice(index, 1);
      console.log("conArr.splice(index,1);", conArr);
    }
  }
  //console.log("conArr----------",conArr)
  drawEl(conArr);
}
function condEdit() {
  $(".advanced-content")
    .off("click", "i.fa.fa-edit.logical-edit")
    .on("click", "i.fa.fa-edit.logical-edit", function() {
      $("#advancedModal").modal("show");
    });
  $("#logiclModal .confirm")
    .off("click")
    .on("click", function() {
      var str =
        $("#logiclSignSelect option:selected").text() +
        '<i class="fa fa-edit logical-edit"></i>';
      $(".advanced-content")
        .find("i.fa.fa-edit.logical-edit.active")
        .parent()
        .html(str);
      $("#logiclModal").modal("hide");
    });
  $(".advanced-content")
    .off("click", "i.fa.fa-trash.con-delete")
    .on("click", "i.fa.fa-trash.con-delete", function() {
      var str = $(this)
        .parent(".advance-cons")
        .find(".key")
        .text();
      console.log("popObjToConArr:", str);
      popObjToConArr(str);
    });
}
// function commitSearchMessage(){
//   var cons=$(".advanced-content").find(".advance-cons");
//   cons.each(function(i){
//     $(i).find
//   })
// }

$(function() {
  changeTabs();
  selectInit();
  illnessSelectInit();
  symptomSelectInit();
  advancedInit();
  condEdit();
});
