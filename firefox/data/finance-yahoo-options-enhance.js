jQuery().ready(function($){

  var currentPrice = parseFloat($('span.time_rtq_ticker:first').text());

  var tables = {
    calls: {
      table: $('#optionsCallsTable table.quote-table'),
      columns: {
        x2: function(current, strike, ask) { return (strike + (ask * 2)).toFixed(2); },
        x3: function(current, strike, ask) { return (strike + (ask * 3)).toFixed(2); },
        base: function(current, strike, ask) { return "" + ((100 * (strike + ask - current)) / current).toFixed(1) + "%"}
      }
    },
    puts: {
      table: $('#optionsPutsTable table.quote-table '),
      columns: {
        x2: function(current, strike, ask) { return (strike - (ask * 2)).toFixed(2); },
        x3: function(current, strike, ask) { return (strike - (ask * 3)).toFixed(2); },
        base: function(current, strike, ask) { return "" + ((100 * (current - (strike - ask))) / current).toFixed(1) + "%"}
      }
    }
  };
  $.each(tables,function(type, map){

    // append headers
    // //////////////

    var headerRow = $('thead tr:first', map.table),                              
    afterElement = $('th:eq(1)',headerRow);

    $.each(map.columns,function(key, valFn){                                       
      afterElement.after('<th><div class="cell">' + key + '</div></th>');         
    });

    // append body cells
    // /////////////////

    $('tbody tr',map.table).each(function(){
      var afterElement = $('td:eq(1)',this),
      strike = parseFloat($('td:eq(0)',this).text()),
      ask = parseFloat($('td:eq(4)',this).text());

      console.log(afterElement, strike, ask);
      $.each(map.columns,function(key, valFn){
        afterElement.after('<td><div class="option_entry Fz-m">' + valFn(currentPrice, strike, ask) + '</div></td>');
      });
    });

  });
});
