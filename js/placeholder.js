(function ($) {
	//feature detection
	var hasPlaceholder = 'placeholder' in document.createElement('input');

	$.fn.placeholder = function (options) {
		//merge in passed in options, if any
		var options = $.extend({}, $.fn.placeholder.defaults, options),
		//cache the original 'left' value, for use by Opera later
			o_left = options.placeholderCSS.left;

		//first test for native placeholder support before continuing
		//feature detection inspired by ye olde jquery 1.4 hawtness, with paul irish
		return (hasPlaceholder) ? this : this.each(function () {

			//local vars
			var $this = $(this),
				inputVal = $.trim($this.val()),
				inputWidth = $this.width(),
				inputHeight = $this.height(),

			//grab the inputs id for the <label @for>, or make a new one from the Date
				inputId = (this.id) ? this.id : 'placeholder' + (+new Date()),
				placeholderText = $this.attr('placeholder'),
				placeholder = $('<label for=' + inputId + '>' + placeholderText + '</label>');

			//stuff in some calculated values into the placeholderCSS object
			options.placeholderCSS['width'] = inputWidth;
			options.placeholderCSS['height'] = inputHeight;

			// adjust position of placeholder
			options.placeholderCSS['left'] = o_left;
			placeholder.css(options.placeholderCSS);

			//place the placeholder if the input is empty
			if (!inputVal) {
				$this.wrap(options.inputWrapper);
				$this.attr('id', inputId).after(placeholder);

				if ($this[0].nodeName.toLowerCase() === "textarea") {
					placeholder.css("top", $this.position().top + 3);
				}
			}

			//hide placeholder on focus
			$this.focus(function () {
				if (!$.trim($this.val())) {
					$this.next().hide();
				}
			});

			//show placeholder if the input is empty
			$this.blur(function () {
				if (!$.trim($this.val())) {
					$this.next().show();
				}
			});
		});
	};

	//expose defaults
	$.fn.placeholder.defaults = {
		//you can pass in a custom wrapper
		inputWrapper: '<span style="position:relative"></span>',

		//more or less just emulating what webkit does here
		//tweak to your hearts content
		placeholderCSS: {
			'font': '0.75em sans-serif',
			'color': '#bababa',
			'position': 'absolute',
			'left': '5px',
			'top': '3px',
			'overflow-x': 'hidden'
		}
	};
})(jQuery);
