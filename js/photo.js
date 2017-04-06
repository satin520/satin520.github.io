
$(function() {
  var page = 1;
  var offset = 20;
  var BoxImg = function() {
    this.init();
  }
  BoxImg.prototype = {
    init: function() {
      var that = this;
      $.getJSON("/photos/output.json", function(data) {
        that.render(that.page, data);
        that.scroll(data);
      });
    },

    render: function(page, data) {
      var begin = (page - 1) * this.offset;
      var end = page * this.offset;
        console.log(page)
      if (begin >= data.length) return;
      var html, li = "";
      for (var i = 0; i < data.length; i++) {

        li += '<li><div class="img-box">' +
          '<a class="img-bg" rel="example_group" href="https://raw.githubusercontent.com/satin520/satin520.github.io/master/photos/' + data[i] + '"></a>' +
          '<img src="https://raw.githubusercontent.com/satin520/satin520.github.io/master/photos/' + data[i] + '" />' +
          '</li>';
      }

      $(".img-box-ul").append(li);
      $(".img-box-ul").lazyload();
      $("a[rel=example_group]").fancybox();
    },

    scroll: function(data) {
      var that = this;
      $(window).scroll(function() {
        var windowPageYOffset = window.pageYOffset;
        var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
        var sensitivity = 0;

        var offsetTop = $(".instagram").offset().top + $(".instagram").height();

        if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
          that.render(++that.page, data);
        }
      })
    }
  }
  var boximg=new BoxImg();
})
