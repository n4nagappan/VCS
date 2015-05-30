//turn to inline mode
$.fn.editable.defaults.mode = 'inline';
$.fn.editable.defaults.showbuttons = false;
$.fn.editable.defaults.type = 'text';
var items;

$(document).ready(function() {
    
    $("#orderForm").submit(function(){
        var values = {};
        $.each($('#orderForm').serializeArray(), function(i, field) {
            values[field.name] = field.value;
        });
               
        console.log(values);
        event.preventDefault();
        $("#orderInput").hide();
        $("#orderConfirmed").show();
        
        $("#format1").empty();
        $("#format1").append("<span>" + values["name"] + "</span><br>");
        $("#format1").append("<span>" + values["date"] + "</span><br>");
        $("#format1").append("<span>" + "ph:  " + values["phone"] + "</span><br>");
        $("#format1").append("<span>" + values["menu"] + "  " + values["combo"] + "</span><br>");
        $("#format1").append("<span> Rs." + values["pricePerMeal"] + " per meal</span><br>");
        $("#format1").append("<span> " + values["pricePerMeal"] + " plates</span><br>");
        $("#format1").append("<span> Rs." + values["advance"] + " advance</span><br>");
        $("#format1").append("<span> Rs." + values["balance"] + " balance</span><br>");
        
        $("#format1").append("<br><br><h4> Menu Items <h4>");
        for( var i = 0 ; i< items.length ; ++i){
            $("#format1").append("<span>" + items[i] + "</span><br>");
        }
        
        $("#format2").empty();
        $("#format2").append("<span>" + values["name"] + "</span><br>");
        $("#format2").append("<span>" + values["date"] + "</span><br>");
        $("#format2").append("<span>" + "ph:  " + values["phone"] + "</span><br>");
        $("#format2").append("<span>" + values["menu"] + "  " + values["combo"] + "</span><br>");
        
        $("#format2").append("<br><br><h4> Menu Items <h4>");
        for( var i = 0 ; i< items.length ; ++i){
            $("#format2").append("<span>" + items[i] + "</span><br>");
        }
    });
    
    // table stuff
    $('.edit').editable();
    var $TABLE = $('#table');
    var $BTN = $('#export-btn');
    var $EXPORT = $('#export');

    $('.table-add').click(function () {
      var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
      $TABLE.find('table').append($clone);
    });

    $('.table-remove').click(function () {
      $(this).parents('tr').detach();
    });

    $('.table-up').click(function () {
      var $row = $(this).parents('tr');
      if ($row.index() === 1) return; // Don't go above the header
      $row.prev().before($row.get(0));
    });

    $('.table-down').click(function () {
      var $row = $(this).parents('tr');
      $row.next().after($row.get(0));
    });

    // A few jQuery helpers for exporting only
    jQuery.fn.pop = [].pop;
    jQuery.fn.shift = [].shift;

    $BTN.click(function () {
      var $rows = $TABLE.find('tr:not(:hidden)');
      var headers = [];
      var data = [];

      // Get the headers (add special header logic here)
      $($rows.shift()).find('th:not(:empty)').each(function () {
        headers.push($(this).text().toLowerCase());
      });

      // Turn all existing rows into a loopable array
      $rows.each(function () {
        var $td = $(this).find('td');
        var h = {};

        // Use the headers from earlier to name our hash keys
        headers.forEach(function (header, i) {
          h[header] = $td.eq(i).text();   
        });

        data.push(h);
      });

      // Output the result
      $EXPORT.text(JSON.stringify(data));
    });
    
    
        
    // Auto calculated values
    function updateTotal(){
        var quantity = parseInt($("#inputQuantity").val());
        var pricePerMeal = parseInt($("#inputPricePerMeal").val());
        var delivery = parseInt($("#inputDelivery").val());
        console.log(typeof delivery);
        var total = (quantity*pricePerMeal) + delivery;
        $("#inputTotal").val(total);
        var advance = parseInt($("#inputAdvance").val());
        var balance = total - advance;
        $("#inputBalance").val(balance);
    }
    
    function updateMenu(){
        console.log("called");
        var menuType = $("#menu").val();
        var combo = $("#combo").val();
        //console.log(JSON.stringify(menu[menuType][combo]));
        items = menu[menuType][combo];
        $TABLE.find('tbody').find('tr').remove('.shown');
        
        // add 2 items per column
        console.log(items);
        for(var i = 0 ; i < items.length; i += 2){
            var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line').addClass('shown');
            // add 1 item in first column
            $clone.find('#col1').text(items[i]);
            
            // add 2nd item in second column if there is one
            if(items[i+1])
                $clone.find('#col2').text(items[i+1]);
            
            $TABLE.find('tbody').append($clone);
        }
    }
    function updateComboBox(){
        var menuType = $("#menu").val();
        $("#combo").empty();
        for( i in menu[menuType]){
            $("#combo").append("<option value=" + i + ">" + i + "</option>");
        }
    }
    
    $(document).on("keyup, change", "#inputQuantity, #inputPricePerMeal, #inputDelivery, #inputAdvance" , updateTotal);
    $(document).on("keyup, change", "#menu" , updateComboBox);
    $(document).on("keyup, change", "#menu, #combo" , updateMenu);
    
    //print
    $('#printButton').click(function () {
        window.print();
    });
    
    $('#backButton').click(function () {
        $("#orderInput").show();
        $("#orderConfirmed").hide();
    });
    
});
