window.onload = function() {
  var matchingElements = [];
  var allElements = document.getElementsByTagName("*");

  for (var i = 0, n = allElements.length; i < n; i++) {
    if (allElements[i].getAttribute("data-stylsh") !== null) {
      matchingElements.push(allElements[i]);
    }
  }
  
  matchingElements.forEach(function (e) {
    var style = "",
        css   = e.getAttribute("data-stylsh").split(" ");
    
    if (e.getAttribute("style")) {
      style += e.getAttribute("style") +  ";;";
    }
    
    css.forEach(function (a) {
      var rule  = a.split(/-/),
          attr  = rule.slice(0, -1).join("-"),
          value = rule.pop();
      
      if (attr.substring(attr.length-1) == "-") {
          attr  = attr.substring(0, attr.length-1);
          value = -value;
      }
      
      if (/color/i.test(attr)) {
        style = style + attr + ":#" + value + ";";
      } else {
        style = style + attr + ":" + value;
        
        if (/^-?[0-9]\d*(\.\d+)?$/.test(value)) {
          style = style + "px;";
        } else {
          style = style + ";";
        }
      }
      
      e.setAttribute("style", style);
    });
    
    e.removeAttribute("data-stylsh");
  });
};