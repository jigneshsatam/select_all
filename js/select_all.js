//Make sure jQuery has been loaded before select_all.js
if (typeof jQuery === "undefined") {
  throw new Error("select_all requires jQuery");
}

(function ( $ ) {
  $.fn.select_all = function(options) {
    var selectables;
    var settings = $.extend({
      class: "no_class",
      infinite_scroll_select: false
    }, options );

    var select_all = $(this);
    var find_in = select_all;

    select_all.addClass("select_all").attr("data-select_all_class", settings.class);
    selectables = find_selectables(find_in);
    if (selectables.length > 0){
      selectables.addClass(settings.class);
    }

    $(".select_all[data-select_all_class='"+settings.class+"']").change(function(){
      $(".selectable."+settings.class).prop('checked', $(this).prop("checked"));
    });
    initialise_selectables(selectables);
    if(settings.infinite_scroll_select){
      $(select_all).attr("data-total_child_count", selectables.length);
      $(document).ajaxComplete(function( event, xhr, settings ){
        $("[data-total_child_count]").each(function(){
          var elem = $(this);
          var total_selectables = find_selectables(elem);
          if (total_selectables.length > elem.data("total_child_count")){
            total_selectables.addClass(elem.data("select_all_class"));
            elem.attr("data-total_child_count", total_selectables.length);
            initialise_selectables(total_selectables);
            if(elem.prop("checked")){
              total_selectables.prop('checked', true)
            }
          }
        });
      });
    }

    function find_selectables(find_in) {
      var selectables, searched;
      while( !find_in.is("body") ){
        searched = find_in.find(":checkbox.selectable");
        if (searched.length > 0){
          selectables = searched;
          find_in = $("body");
        }
        else{
          find_in = find_in.parent();
        }
      }
      return selectables;
    }
    function initialise_selectables(selectables){
      $(selectables).change(function(){
        if ($(".selectable."+settings.class+":checked").length == $(".selectable."+settings.class).length)
          $(".select_all[data-select_all_class='"+settings.class+"']").prop('checked', "checked");
        else
          $(".select_all[data-select_all_class='"+settings.class+"']").prop('checked', false);
      });  
    }
    return $(this);
  }
}( jQuery ));
