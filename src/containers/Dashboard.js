import React from 'react';
import $ from 'jquery'; 


export class Dashboard extends React.Component {
  componentDidMount() {
    var lFollowX = 0,
      lFollowY = 0,
      x = 0,
      y = 0,
      friction = 1 / 30,translate;

    var moveBackground= function() {
      x += (lFollowX - x) * friction;
      y += (lFollowY - y) * friction;
      translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';
      $('.bg').css({
        '-webit-transform': translate,
        '-moz-transform': translate,
        'transform': translate
      });
      window.requestAnimationFrame(moveBackground);
    }
    $(window).on('mousemove click', function (e) {
      var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
      var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
      lFollowX = (20 * lMouseX) / 100;
      lFollowY = (10 * lMouseY) / 100;
    });
    moveBackground();
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>Welcome!</h1>
        <p>
          to see the list of customers click the Customers button
        </p>
      </div>
    );
  }
}
