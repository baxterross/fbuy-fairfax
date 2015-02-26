(function(window, $) {
  var CopyHandler = function() {
    this.defaultData = 'CopyHandler';
    this.data = '';
    this.clippy = {};

    this.init = function(config) {
      this.data = config.data || this.defaultData;
      this.createClippyObject(config);
//      this.setCopyData(this.data);
    }.bind(this);

    this.createClippyObject = function(config) {
      var height = config.height || 14;
      var width = config.width || 110;
      var top = config.top || 0;
      var left = config.left || 0;
      var objectAttributes = [
        ['id', 'clippy'],
        ['classid', 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'],
        ['width', width],
        ['height', height],
        ['style', 'opacity: 0; transform: scale('+(config.scale || 1)+'); position: absolute; height: '+height+'px; width: '+width+'px; top: '+top+'px; left: '+left+'px;']
      ];
      var object = window.document.createElement('object');
      for (var i = 0; i < objectAttributes.length; i++) {
        var key = objectAttributes[i][0];
        var value = objectAttributes[i][1];
        object.setAttribute(key, value);
      }
      
      var params = [
        ['movie', '/js/clippy.swf'],
        ['allowScriptAccess', 'always'],
        ['quality', 'high'],
        ['scale', 'noscale'],
        ['FlashVars', 'text='+this.data],
        ['bgcolor', 'transparent'],
        ['wmode', 'transparent']
      ];
      for (var i = 0; i < params.length; i++) {
        var param = window.document.createElement('param');
        param.name = params[i][0];
        param.value = params[i][1];
        object.appendChild(param);
      }

      var embedAttributes = [
        ['src', '/js/clippy.swf'],
        ['width', width],
        ['height', height],
        ['name', 'clippy'],
        ['quality', 'high'],
        ['allowScriptAccess', 'always'],
        ['type', 'application/x-shockwave-flash'],
        ['pluginspage', 'http://www.macromedia.com/go/getflashplayer'],
        ['FlashVars', 'text='+this.data],
        ['bgcolor', 'transparent'],
        ['wmode', 'transparent']
      ];
      var embed = window.document.createElement('embed');
      for (var i = 0; i < embedAttributes.length; i++) {
        var key = embedAttributes[i][0];
        var value = embedAttributes[i][1];
        embed.setAttribute(key, value);
      }
      object.appendChild(embed);

      var footer = window.document.getElementsByTagName('footer')[0];
      var body = window.document.getElementsByTagName('body')[0];
      var container = body;
      container.appendChild(object);

      this.clippy = object;
    }.bind(this);
    
    this.setCopyData = function(text) {
      var clippy = this.clippy
      var flashVars = 'text='+text;
      var embed = clippy.getElementsByTagName('embed')[0];
      embed.setAttribute('flashvars', flashVars);
      var params = clippy.getElementsByTagName('param');
      for (var i = 0; i < params.length; i++) {
        var param = params[i];
        if (param.name == 'FlashVars') {
          param.value = flashVars;
        }
      }
    }.bind(this);

    this.delegateClick = function() {
      var object = window.document.getElementByid('copier-object');
      object.click();
    }.bind(this);
  };

  $(function() {
    window.document.querySelector('[data-fbuy-state="Email Message"]').style.display = 'block';
    var copyButtons = document.getElementsByClassName('copy');
    for (var i = 0; i < copyButtons.length; i++) {
      var button = copyButtons[i];
      var offset = button.getBoundingClientRect();
      var scroll = {
        x: window.scrollX,
        y: window.scrollY
      };
      var scale = 2.75;
      var copyHandler = new CopyHandler();
      copyHandler.init({
        height: button.offsetHeight,
        width: button.offsetWidth,
        top: offset.top + scroll.y + (button.offsetHeight * 0.5 * (scale - 1)),
        left: offset.left + scroll.x + (button.offsetWidth * 0.5 * (scale - 1)),
        scale: scale
      });
    }
  });


}(window, jQuery));
