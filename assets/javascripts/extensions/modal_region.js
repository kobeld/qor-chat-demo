// For Bootstrap Modal
Marionette.Region.Modal = Marionette.Region.extend({
  onShow: function (view) {
    var self = this;
    this.listenTo(view, "modal:close", this.closeModal);
    this.$el.modal({backdrop: 'static'});
    this.$el.on('hidden.bs.modal', function (e) {
      self.cleanup()
    })
  },

  closeModal: function () {
    this.$el.modal("hide");
  },

  cleanup: function() {
    this.stopListening();
    this.empty();
    this.$el.off('hidden.bs.modal');
  }
})