var expect = require("chai").expect

this.jsdom = require('jsdom-global')()
global.$ = global.jQuery = require('jquery');

var select_all = require("../javascript/select_all.js");

describe("Select All", function() {
  before(function(){
    children_checkbox = "<input type='checkbox' class='selectable'>Item1</input>" + "<input type='checkbox' class='selectable'>Item2</input>" + "<input type='checkbox' class='selectable' checked>Item3</input>" + "<input type='checkbox' class='selectable' checked>Item4</input>";
    parent_checkbox = "<input type='checkbox' id='parent_checkbox' class='parent'>Select All</input>";
    div = $("<div>"+ parent_checkbox + children_checkbox +"</div>");
  });

  describe("Basic Usage", function() {
    beforeEach(function(){
      $(document.body).append(div);
      $(div).find(".parent").addClass("basic_usage_parent")
      $(".basic_usage_parent").select_all();
    });

    afterEach(function(){
      $(document.body).empty();
    });

    it("adds class 'select_all' on applied checkbox", function() {
      expect($(".basic_usage_parent").hasClass('select_all')).to.equal(true);
    });

    it("adds 'no_class' data 'select_all_class' on applied checkbox", function() {
      expect($(".basic_usage_parent").data('select_all_class')).to.equal('no_class');
    });

    it("already selected checkboxes", function() {
      expect($(".selectable:checked").length).to.equal(2);
    });

    it("After click parent checkbox all children checkboxes should get selected", function() {
      $('.basic_usage_parent').click(function(err){
        if (err) done(err);
        else{
          expect($(".selectable:checked").length).to.equal(4);
          done();
        }
      });
    });

    it("After click any child checkbox parent checkboxes should get unselected", function() {
      $('.basic_usage_parent').click(function(err){
        if (err) done(err);
        else{
          $('.selectable').first().click(function(err){
            if (err) done(err);
            else{
              expect($(".selectable:checked").length).to.equal(4);
              done();
            }
          });
        done();
        }
      });
      expect($(".basic_usage_parent").is(":checked")).to.equal(false);
    });
  });

  describe("Multiple Selections", function(){
    beforeEach(function(){
      first_checkbox = "first_checkbox";
      second_checkbox = "second_checkbox";
      multiple_selections_parent1_div = div.clone();
      multiple_selections_parent1_div.find(".parent").addClass("multiple_selections_parent1")
      $(document.body).append(multiple_selections_parent1_div);
      $(".multiple_selections_parent1").select_all();
      $(".multiple_selections_parent1").select_all({class: first_checkbox});

      multiple_selections_parent2_div = div.clone();
      multiple_selections_parent2_div.find(".parent").addClass("multiple_selections_parent2")
      $(document.body).append(multiple_selections_parent2_div);
      $(".multiple_selections_parent2").select_all();
      $(".multiple_selections_parent2").select_all({class: second_checkbox});
    });
    afterEach(function(){
      $(document.body).empty();
    });

    it("adds given parameter as class to data select_all_class on applied checkbox", function() {
      expect($(".multiple_selections_parent1").data('select_all_class')).to.equal(first_checkbox);
      expect($(".multiple_selections_parent2").data('select_all_class')).to.equal(second_checkbox);
    });

    describe("On selecting any of the parent checkboxes all its children should get selected and other parent and its children should remain unaffected", function(){
      before(function(){
        setTimeout(function(){
          $(".multiple_selections_parent1").click();
        }, 0);
      });
      it("All children should get selected", function(){
        expect($(".selectable."+first_checkbox+":checked").length).to.equal(4)
      });
      it("Other parent and its children should remain unaffected", function(){
        expect($(".selectable."+second_checkbox+":checked").length).to.equal(2)
        expect($(".multiple_selections_parent2").is(":checked")).to.equal(false)
      });
    });
  });

});
