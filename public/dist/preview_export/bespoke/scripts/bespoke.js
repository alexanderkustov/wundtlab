/*!
* Bespoke.js v0.3.1
*
* Copyright 2013, Mark Dalgleish
* This content is released under the MIT license
* http://mit-license.org/markdalgleish
*/
(function(moduleName, window) {

	var clicks = new Array();

	var from = function(selectorOrElement, selectedPlugins) {

		console.log(selectorOrElement);

		var parent = selectorOrElement.blur ? selectorOrElement : document.querySelector(selectorOrElement),
		slides = [].slice.call( document.querySelector('article').children, 0),
		activeSlide = slides[0],
		listeners = {},
		activate = function(index, customData) {
			if (!slides[index]) {
				return;
			}
			console.log(parent.children);
			console.log(slides);
			fire('deactivate', createEventData(activeSlide, customData));
			activeSlide = slides[index];
			slides.map(deactivate);
			fire('activate', createEventData(activeSlide, customData));
			addClass(activeSlide, 'active');
			removeClass(activeSlide, 'inactive');
		},
		deactivate = function(slide, index) {
			var offset = index - slides.indexOf(activeSlide),
			offsetClass = offset > 0 ? 'after' : 'before';
			['before(-\\d+)?', 'after(-\\d+)?', 'active', 'inactive'].map(removeClass.bind(0, slide));
			slide != activeSlide &&
			['inactive', offsetClass, offsetClass + '-' + Math.abs(offset)].map(addClass.bind(0, slide));
		},
		slide = function(index, customData) {
			fire('slide', createEventData(slides[index], customData)) && activate(index, customData);
		},
		step = function(offset, customData) {
			var slideIndex = slides.indexOf(activeSlide) + offset;
			fire(offset > 0 ? 'next' : 'prev', createEventData(activeSlide, customData)) && activate(slideIndex, customData);
		},
		on = function(eventName, callback) {
			(listeners[eventName] || (listeners[eventName] = [])).push(callback);
			return function() {
				listeners[eventName] = listeners[eventName].filter(function(listener) {
					return listener != callback;
				});
			};
		},
		fire = function(eventName, eventData) {
			return (listeners[eventName] || [])
			.reduce(function(notCancelled, callback) {
				return notCancelled && callback(eventData) !== false;
			}, true);
		},
		createEventData = function(slide, eventData) {
			eventData = eventData || {};
			eventData.index = slides.indexOf(slide);
			eventData.slide = slide;
			return eventData;
		},
		deck = {
			on: on,
			fire: fire,
			slide: slide,
			next: step.bind(0, 1),
			prev: step.bind(0, -1),
			parent: parent,
			slides: slides
		};
		addClass(parent, 'parent');
		slides.map(function(slide) {
			addClass(slide, 'slide');
		});
		for (var pluginName in selectedPlugins) {
			plugins[pluginName](deck, selectedPlugins[pluginName]);
		}
		activate(0);
		decks.push(deck);
		return deck;
	},
	decks = [],
	addClass = function(el, cls) {
		el.classList.add(moduleName + '-' + cls);
	},
	removeClass = function(el, cls) {
		el.className = el.className
		.replace(RegExp(moduleName + '-' + cls +'(\\s|$)', 'g'), ' ')
		.trim();
	},
	callOnAllDecks = function(method) {
		return function(arg) {
			decks.map(function(deck) {
				deck[method](arg);
			});
		};
	},
	bindPlugin = function(pluginName) {
		return {
			from: function(selectorOrElement, selectedPlugins) {
				(selectedPlugins = selectedPlugins || {})[pluginName] = true;
				return from(selectorOrElement, selectedPlugins);
			}
		};
	},
	makePluginForAxis = function(axis) {
		return function(deck) {
			var startPosition,
			delta;


//mouse down positioning and counting method
deck.parent.addEventListener('mousedown', function(e) {

		//console.log($(e.target).parent().parent().parent().attr('class'));
		if ($(e.target).parent().parent().parent().hasClass('componentContainer')) {
			//preciso de registrar o nome das classes clicadas, criar uma array que depois apareca no final
			clicks.push($(e.target).parent().parent().parent().attr('class'));
			deck.next();

			//preciso de saber o ultimo slide para mostrar quantas vezes as classes clicadas foram accionadas
			console.log("SLIDE NUMBER: " + "" + "of: " +  deck.slides.length );
			console.log("cenas na array: " + clicks.toString());

		}

});
document.addEventListener('keydown', function(e) {
	(
		e.which == 34 || // PAGE DOWN
		e.which == 32 || // SPACE
		axis == 'X' && e.which == 39 || // RIGHT
		axis == 'Y' && e.which == 40 // BOTTOM
		) && deck.next();
			(
		e.which == 33 || // PAGE UP
		axis == 'X' && e.which == 37 || // LEFT
		axis == 'Y' && e.which == 38 // TOP
		) && deck.prev();

	});

//touchevents
deck.parent.addEventListener('touchstart', function(e) {
	if (e.touches.length == 1) {
		startPosition = e.touches[0]['page' + axis];
		delta = 0;
	}
});
deck.parent.addEventListener('touchmove', function(e) {
	if (e.touches.length == 1) {
		e.preventDefault();
		delta = e.touches[0]['page' + axis] - startPosition;
	}
});
deck.parent.addEventListener('touchend', function() {
	Math.abs(delta) > 50 && (delta > 0 ? deck.prev() : deck.next());
});
};
},
plugins = {
	horizontal: makePluginForAxis('X'),
	vertical: makePluginForAxis('Y')
};
window[moduleName] = {
	from: from,
	slide: callOnAllDecks('slide'),
	next: callOnAllDecks('next'),
	prev: callOnAllDecks('prev'),
	horizontal: bindPlugin('horizontal'),
	vertical: bindPlugin('vertical'),
	plugins: plugins
};
}('bespoke', window));