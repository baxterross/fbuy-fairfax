(function(window, $) {
  var CopyHandler = function() {
    this.defaultData = 'CopyHandler';
    this.clippy = {};

    this.init = function(config) {
      this.button = config.button;
      var value = this.button.parentNode.getElementsByTagName('input')[0].value,
          height = this.button.offsetHeight || 34,
          width = this.button.offsetWidth || 81,
          scale = 2.75;

      this.clippy = this.createClippyObject({
        height: height,
        width: width,
        bottom: 0,
        right: -(width * 0.5 * (scale - 1) - 1),
        scale: scale,
        data: value || this.defaultData
      });
      this.button.parentElement.appendChild(this.clippy);
      $(this.clippy).bind({
        mouseenter: this.mouseEnter,
        mouseleave: this.mouseLeave
      });
    }.bind(this);

    this.createClippyObject = function(config) {
      var height = config.height || 34,
          width = config.width || 81,
          bottom = config.bottom || 0,
          right = config.right || 0,
          scale = config.scale || 1,
          object,
          objectAttributes = [
            ['id', 'clippy'],
            ['classid', 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'],
            ['width', width],
            ['height', height],
            ['style', 'opacity: 0; transform: scaleX('+scale+'); position: absolute; height: '+height+'px; width: '+width+'px; bottom: '+bottom+'px; right: '+right+'px;']
          ],
          param,
          params = [
            ['movie', '/js/clippy.swf'],
            ['allowScriptAccess', 'always'],
            ['quality', 'high'],
            ['scale', 'noscale'],
            ['FlashVars', 'text='+config.data],
            ['bgcolor', 'transparent'],
            ['wmode', 'transparent']
          ],
          embed,
          embedAttributes = [
            ['src', '/js/clippy.swf'],
            ['width', width],
            ['height', height],
            ['name', 'clippy'],
            ['quality', 'high'],
            ['allowScriptAccess', 'always'],
            ['type', 'application/x-shockwave-flash'],
            ['pluginspage', 'http://www.macromedia.com/go/getflashplayer'],
            ['FlashVars', 'text='+config.data],
            ['bgcolor', 'transparent'],
            ['wmode', 'transparent']
          ],
          i;

      object = window.document.createElement('object');
      for (i = 0; i < objectAttributes.length; i++) {
        object.setAttribute(objectAttributes[i][0], objectAttributes[i][1]);
      }
      
      for (i = 0; i < params.length; i++) {
        param = window.document.createElement('param');
        param.setAttribute('name', params[i][0]);
        param.setAttribute('value', params[i][1]);
        object.appendChild(param);
      }

      embed = window.document.createElement('embed');
      for (i = 0; i < embedAttributes.length; i++) {
        embed.setAttribute(embedAttributes[i][0], embedAttributes[i][1]);
      }

      object.appendChild(embed);
      return object;
    }.bind(this);
    
    this.mouseEnter = function() {
      $(this.button).addClass('hover');
    }.bind(this);
    this.mouseLeave = function() {
      $(this.button).removeClass('hover');
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
      var copyHandler = new CopyHandler();
      var button = copyButtons[i];
      copyHandler.init({
        button: button
      });
    }
  });


}(window, jQuery));
