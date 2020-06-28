export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


export function throttle(callback, wait, immediate = false) {
	let timeout = null 
	let initialCall = true
	
	return function() {
	  const callNow = immediate && initialCall
	  const next = () => {
		callback.apply(this, arguments)
		timeout = null
	  }
	  
	  if (callNow) { 
		initialCall = false
		next()
	  }
  
	  if (!timeout) {
		timeout = setTimeout(next, wait)
	  }
	}
  }