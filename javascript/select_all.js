if (typeof jQuery === "undefined") {
  throw new Error("select_all requires jQuery");
}

(function ( $ ) {
  $.fn.select_all = function(options) {
    var selectables;
    var settings = $.extend({
      class: "no_class",
      infinite_scroll_select: false,
      show_count: false,
      attach_count_to: false,
      uniq_id: Math.random()
    }, options );

    var select_all = $(this);
    var find_in = select_all;

    // initializing parent select_all
    select_all.addClass("select_all").attr("data-select_all_class", settings.class).attr("data-select_all_uid", settings.uniq_id);
    select_all.data("show_count", settings.show_count);
    select_all.data("attach_count_to", settings.attach_count_to);

    selectables = find_selectables(find_in);
    if (selectables.length > 0){
      selectables.addClass(settings.class);
    }

    $(".select_all[data-select_all_class='"+settings.class+"']").change(function(){
      $(".selectable."+settings.class).prop('checked', $(this).prop("checked"));
    });

    // infinite scroll select
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
            if(elem.data("show_count")){
              set_count(elem, total_selectables.parent().find(":checked").length, total_selectables.length);
            }
          }
        });
      });
    }
    // Selection count
    if(settings.show_count !== false){
      set_count(select_all, selectables.parent().find(":checked").length, selectables.length);
    }
    initialise_select_all(select_all);
    initialise_selectables(selectables);
    function find_selectables(find_in) {
      var selectables = [], searched = [];
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
    function set_count(parent_select_all, selected_options_count, total_options_count){
      switch(parent_select_all.data("show_count")){
        case "checked":
          count_result = "(Selected "+selected_options_count+")";
          break;
        case "checked_with_total":
          count_result = "("+selected_options_count+"/"+total_options_count+")";
          break;
        case "unchecked":
          var unselected_count = total_options_count-selected_options_count
          count_result = "(Unselected "+ unselected_count +")";
          break;
        default:
          count_result = "(Selected "+selected_options_count+")";
      }
      var attach_count_to = $(parent_select_all.data("attach_count_to"));
      if (attach_count_to.length == 0)
        attach_count_to = parent_select_all.parent();
      if ($("span#select_all_count_id[data-select_all_uid='"+parent_select_all.data("select_all_uid")+"']").length > 0)
        $("span#select_all_count_id[data-select_all_uid='"+parent_select_all.data("select_all_uid")+"']").text(count_result);
      else
        $("<span id='select_all_count_id' data-select_all_uid="+parent_select_all.data("select_all_uid") +">"+count_result+"</span>").appendTo(attach_count_to);
    }
    function initialise_selectables(selectables){
      $(selectables).change(function(){
        var parent_select_all = $(".select_all[data-select_all_class='"+settings.class+"']");
        var selected_options_count = $(".selectable."+settings.class+":checked").length;
        var total_options_count = $(".selectable."+settings.class).length;
        if (selected_options_count == total_options_count)
          parent_select_all.prop('checked', "checked");
        else
          parent_select_all.prop('checked', false);
        if(parent_select_all.data("show_count").length > 0){
          set_count(parent_select_all, selected_options_count, total_options_count);
        }
      });
    }
    function initialise_select_all(select_all){
      select_all.change(function(){
        var selectables = $(".selectable."+settings.class);
        var isChecked = $(this).prop("checked");
        selectables.prop('checked', isChecked);
        if(select_all.data("show_count").length > 0){
          var selected_options_count = isChecked ? selectables.length : 0;
          set_count(select_all, selected_options_count, selectables.length);
        }
      });
    }
    return $(this);
  }
}( jQuery ));
