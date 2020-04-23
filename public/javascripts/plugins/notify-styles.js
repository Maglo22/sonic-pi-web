/* custom notify styling */

$(document).ready(function() {
  $.notify.addStyle('transparent', {
    html: '<span data-notify-text/>',
    classes: {
      base: {
        'white-space': 'nowrap',
        'background-color': 'rgba(0,0,0,0)',
        'padding': '5px',
        'text-transform': 'lowercase',
        'font-family': 'Major Mono Display, monospace',
        'font-size': '16px',
        'font-weight': '600'
      },
      success: {
        color: '#0FA0CE'
      },
      warning: {
        color: '#d89031'
      },
      error: {
        'color': '#f03f33',
      }
    }
  });
});