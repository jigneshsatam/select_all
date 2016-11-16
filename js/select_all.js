//Make sure jQuery has been loaded before select_all.js
if (typeof jQuery === "undefined") {
  throw new Error("select_all requires jQuery");
}

(function ( $ ) {
  $.fn.select_all = function(options) {
    var selectables;
    var settings = $.extend({
      class: "no_class",
      infinite_select: false
    }, options );

    var select_all = $(this);
    var find_in = select_all;

    select_all.addClass("select_all "+settings.class);

    while( !find_in.is("body") ){
      selectables = find_in.find(":checkbox.selectable");
      if (selectables.length > 0){
        selectables.addClass(settings.class);
        find_in = $("body");
      }
      else{
        find_in = find_in.parent();
      }
    }

    $(".select_all."+settings.class).change(function(){
      $(".selectable."+settings.class).prop('checked', $(this).prop("checked"));
    });
    $(".selectable."+settings.class).change(function(){
      if ($(".selectable."+settings.class+":checked").length == $(".selectable."+settings.class).length)
        $(".select_all."+settings.class).prop('checked', "checked");
      else
        $(".select_all."+settings.class).prop('checked', false);
    });
    if(settings.infinite_select){
      debugger
      $(select_all).data("total_child_count", selectables.length);
      $(document).ajaxComplete(function( event, xhr, settings ){
        $("[data='total_child_count']").each(function(){
          $(this).data("total_child_count")
        });
        console.log("dude");
      })
    }
  }
  return $(this);
}( jQuery ));
