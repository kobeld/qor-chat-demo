var TabRegion = Marionette.Region.extend({
  attachHtml: function(view){
    this.$el.append(view.el);
  }
})