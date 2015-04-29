'use strict';

$(document).ready(function() {

  /////////////
  // Globals //
  /////////////

  window.assetsUrl = '//d16cbq0l6kkf21.cloudfront.net/assets';

  ///////////
  // Menus //
  ///////////

  // This chunk of code will center the top and bottom menus. Sadly, Semantic UI doesn't support
  // this, so we have to use an ugly hack, instead. :/

  var docWidth = $(document.body).width();
  var padding = parseInt($('#main').css('padding-left'), 10);
  var topWidth = $('#top-menu').width() - padding;
  var bottomWidth = $('#bottom-menu').width() - padding;

  var topLeftVal = (docWidth - topWidth) / 2;
  var bottomLeftVal = (docWidth - bottomWidth) / 2;

  $('#top-menu').css('left', topLeftVal);
  $('#bottom-menu').css('left', bottomLeftVal);

  // Activate the popups on all the menu buttons.
  $('#top-menu a').popup({
    variation: 'inverted'
  });

  //////////////
  // Sidebars //
  //////////////

  $('#left-sidebar-button').click(function() {
    $('.ui.sidebar.left').sidebar('toggle');
  });

  $('#right-sidebar-button').click(function() {
    $('.ui.sidebar.right').sidebar('toggle');
  });


  ///////////////
  // Buildings //
  ///////////////

  var buildingTmpl = _.template($('#template-building-tile').html());

  var $buildingsEl = $('#buildings-draggable');
  var range = _.range(-5, 6);
  var size = 100;

  _.each(range, function(x) {
    _.each(range, function(y) {

      // Find by x and y.
      var building = _.first(_.filter(window.buildingsData, function(obj) {
        return parseInt(obj.x, 10) === x && parseInt(obj.y, 10) === y;
      }));

      var obj = {
        size: size,
        x: x,
        y: y,
        empty: (building ? false : true)
      };

      _.merge(obj, building);
      $buildingsEl.append(buildingTmpl(obj));

    });
  });

  var $body = $(document.body);
  var $draggable = $('#buildings-draggable');
  var $container = $('#buildings-container');
  var planetSize = size * 11;

  // Center the planet view
  $draggable.css({
    top: ($body.height() - planetSize) / 2,
    left: ($body.width() - planetSize) / 2
  });

  $draggable.draggable({
    drag: function(event, ui) {
      // Move the background around according to the movement of the buildings.
      $container.css(
        'background-position', ui.offset.left + 'px ' + ui.offset.top + 'px');
    }
  });
});
