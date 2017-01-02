// properties by which searches can be done
var sizes = [ 'small', 'medium', 'large' ];
var colors = [ 'red', 'orange', 'yellow', 'green', 'mermaid treasure', 'blue', 'purple' ];

////// global array of items in inventory //////
var items = [];

$( document ).ready( function(){
  var addObject = function( colorIn, nameIn, sizeIn ){
    console.log( 'in addObject' );
    // assemble object from new fields
    var newItem = {
      color: colorIn,
      name: nameIn,
      size: sizeIn
    }; // end testObject
    console.log( 'adding:', newItem );
    ////// TODO: add ajax call to addItem route to add this item to the table
    $.ajax({
      type: 'POST',
      url:'/addItem',
      data: newItem,
      success:function(data){
        console.log("Post got", data);
      }
    });
    // add to items array
    items.push( newItem );
  }; // end addObject

  var findObject = function( colorCheck, sizeCheck ){
    console.log( 'in findObject. Looking for:', colorCheck, sizeCheck );
    // array of matches
    var matches = [];
    $('#searchDiv').html(' ');
    for ( var i = 0; i < items.length; i++ ) {
      if( items[i].color == colorCheck || items[i].size == sizeCheck ){
        // match, add to array
        matches.push( items[i] );
        $('#searchDiv').append("<p class='searchRes'>" + items[i].item + "</p>");
      } // end if
    } // end for
    console.log( 'matches:', matches );
    if (matches.length === 0) {
      $('#searchDiv').append('None found...');
    }

  }; // end findObject

  var getObjects = function(){
    console.log( 'in getObjects');
    // populate the items array
    ////// TODO: replace the stuff in this function with getting items from the database ////////
    $.ajax({
      type: 'GET',
      url: '/getInventory',
      success:function(data){
        console.log('Got', data);
        items = [];
        for (var i = 0; i < data.length; i++) {
          items.push(data[i]);
        }
        console.log('Heres whsats in', items);
        $('#output').html('');
        for (var x = 0; x < items.length; x++) {
          $('#output').append("<p class='result'>" + items[x].size + ' ' + items[x].color + ' ' +  items[x].item + "</p>");
        }
      }
    });

    ////// hint: make a get call to the getInventory and use it's response data to fill the items array ////////
  }; // end getObjects

  // get objects when doc is ready
  getObjects();
  // the below are tests to show what is returned when running findObject
  // addObject( 'blue', 'blueberry', 'small' );
  findObject( 'blue', 'small' );
  findObject( 'blue', 'large' );
  $('#postButton').on('click', function(){
    addObject($('#color').val(),$('#item').val(), $('#size').val());
    getObjects();
    $('#color').val('');
    $('#item').val('');
    $('#size').val('');

  });
  $('#searchButton').on('click', function(){
    findObject($('#color').val(), $('#size').val());

  });
}); // end doc ready
