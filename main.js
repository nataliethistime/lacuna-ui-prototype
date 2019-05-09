'use strict';

$(document).ready(function() {

  /////////////
  // Globals //
  /////////////

  window.assetsUrl = 'http://raw.githubusercontent.com/plainblack/Lacuna-Assets/master';

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
  var planetSize = size * 11;
  var scrollDistance = size / 2;

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

  var top = ($body.height() - planetSize) / 2;
  var left = ($body.width() - planetSize) / 2;

  var move = function(options) {

    top += options.y || 0;
    left += options.x || 0;

    var tempTop = top + 'px';
    var tempLeft = left + 'px';

    $draggable.css({
      top: tempTop,
      left: tempLeft
    });

    // Move the planet background as well.
    $container.css(
      'background-position', [tempLeft, tempTop].join(' '));
  };

  // Center the planet view
  move({
    y: 0,
    x: 0
  });

  $draggable.draggable({
    drag: function(event, ui) {

      move({
        x: ui.position.left - left,
        y: ui.position.top - top
      });

      // Make sure jQuery doesn't override the position that move() sets the view to.
      ui.position.left = left;
      ui.position.top = top;
    }
  });

  $(window).mousewheel(function(event) {
    move({
      x: event.deltaX * event.deltaFactor,
      y: event.deltaY * event.deltaFactor
    })
  });
});
