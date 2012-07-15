(function($) {
	var defaults = {
			calloutCssClass: "updnValidatorCallout",
			pointerCssClass: "updnValidatorCalloutPointer",
			errorInputCssClass: "updnValidationErrorInput",
			errorLabelCssClass: "updnValidationErrorLabel",
			offsetX: 0,
			offsetY: 0
		};

	$.validateCallout = {
		init: function(options) {
			var opts = $.extend({}, defaults, options),
				alreadyShown = false,
				$callout = $('<div/>')
					.appendTo(document.body)
					.hide()
					.addClass(opts.calloutCssClass)
					.bind('open', function() {
						var $this = $(this),
							$element = $this.data('element'),
							elementId = $element.attr('id')
							pos = $element.position();
						$element.addClass(opts.errorInputCssClass);
						if (elementId) {
							$('label[for="' + elementId + '"]').addClass(opts.errorLabelCssClass);
						}
						$element.parent('label').addClass(opts.errorLabelCssClass);
						$this.css({
							position: 'absolute',
							left: Math.floor(pos.left + $element.outerWidth() + opts.offsetX),
							top: Math.floor(pos.top + opts.offsetY)
							})
						.fadeIn('fast');
					})
					.append($("<span/>").addClass(opts.pointerCssClass));

			$.validator.setDefaults({
				errorPlacement: function(error, element) {
					if (!alreadyShown) {
						alreadyShown = true;
						$callout.find(':not(.' + opts.pointerCssClass + ')').remove().end()
							.append(error)
							.data('element', element)
							.trigger('open');
					}
				},
				showErrors: function() {
					$('.' + opts.errorInputCssClass).removeClass(opts.errorInputCssClass);
					$('.' + opts.errorLabelCssClass).removeClass(opts.errorLabelCssClass);
					$callout.hide();
					alreadyShown = false;
					this.defaultShowErrors();
				}
			});
		}
	};
})(jQuery);