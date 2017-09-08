# checkbox_select_all
***Simple to check and uncheck checkboxes***

***Less file size and simple implementation***
***
 [![Build Status](https://travis-ci.org/JigneshSatam/checkbox_select_all.svg?branch=master)](https://travis-ci.org/JigneshSatam/checkbox_select_all) [![Code Climate](https://codeclimate.com/github/JigneshSatam/checkbox_select_all/badges/gpa.svg)](https://codeclimate.com/github/JigneshSatam/checkbox_select_all) [![Issue Count](https://codeclimate.com/github/JigneshSatam/checkbox_select_all/badges/issue_count.svg)](https://codeclimate.com/github/JigneshSatam/checkbox_select_all)

**checkbox_select_all** is *jQuery* dependent *javascript* for implementing '**select-all**' functionality in more simple and effective way in your application.
## Functionalities
* [***Basic Usage***](http://jigneshsatam.github.io/checkbox_select_all/#basic_usage) - Selecting/Unselecting multiple checkboxes.
* [***Multiple Seletions***](http://jigneshsatam.github.io/checkbox_select_all/#multiple_selections) - Implementing more than one select-all functionalities in a page.
* [***Ajax Added Checkboxes***](http://jigneshsatam.github.io/checkbox_select_all/#ajax_added_checkboxes) - Implementing select-all functionality to new checkboxes added by an Ajax call.
* [***Show Selection/Count***](http://jigneshsatam.github.io/checkbox_select_all/#show_selected_count) - Display selected checkboxes count or checkboxes remaining to select count or selected checkboxes count out of total checkboxes.

## Usage
Call the function **select_all()** on main checkbox and add class **'selectable'** to sub-checkboxes.

HTML example:
```html
<input type="checkbox" id="selectAll">All Items</input>

<input type="checkbox" class="selectable">Item 1</input>
<input type="checkbox" class="selectable">Item 2</input>
<input type="checkbox" class="selectable">Item 3</input>

<script type="text/javascript">
    $("#selectAll").select_all();
</script>
```
***For more usage checkout*** [**Demo**](http://jigneshsatam.github.io/checkbox_select_all/)

## Contributing

1. Fork it ( https://github.com/[my-github-username]/checkbox_select_all/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
