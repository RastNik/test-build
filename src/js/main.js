$(document).ready(function () {

	let slidersValues = {
		subscribers: 0,
		price: 0,
		monthlyPotential: 0,
		yearlyPotential: 0,
	};

	function updatePotential() {
		slidersValues.monthlyPotential = slidersValues.subscribers * slidersValues.price * 0.75;
		slidersValues.yearlyPotential = slidersValues.monthlyPotential * 12;
		$('#monthlyPotential').text(formatNumber(slidersValues.monthlyPotential) + ' $');
		$('#yearlyPotential').text(formatNumber(slidersValues.yearlyPotential) + ' $');
	}
	
	function setupSlider(selector, key, step = 1, postfix = '') {
		if($(selector).length > 0) {
			const slider = $(selector).ionRangeSlider({
				step: step,
				onChange: function (data) {
					slidersValues[key] = data.from;
					updatePotential();
				},
				postfix: postfix,
			}).data("ionRangeSlider");
			slidersValues[key] = slider.options.from;
			updatePotential();
		}
	}
	
	if ($.fn.ionRangeSlider) {
		setupSlider('#js-range-subscribers', 'subscribers', 100);
		setupSlider('#js-range-price', 'price', 5, ' $');
	}

	var header = $('header');
	$(window).scroll(function() {
		var scrolled = $(this).scrollTop();
		if (header.length && scrolled > 52) {
			header.addClass('scrolled');
		} else {
			header.removeClass('scrolled');
		}
	});

	let parallaxScene = $('.parallaxScene');
	if (parallaxScene.length && $(window).width() > 991) {
		parallaxScene.parallax();
	}

	$(document).on('click', '.headerMenuBtnJs', function () {
		let btn = $(this);
		let box = $(".headerMenuBoxJs");
		if (btn.hasClass("active")) {
			btn.removeClass("active");
			box.removeClass("open");
		} else {
			btn.addClass("active");
			box.addClass("open");
		}
		return false;
	});

	$(document).on('click', '.arcticmodal-btn', function () {
		let btnHref = $(this).attr('data-arcticmodal');
		$("#" + btnHref).arcticmodal();
		closeMobileMenu();
		return false;
	});

	$(".modalFormSelect").selectmenu({
		classes: {
			"ui-selectmenu-button": "modal_styles__form-select-button",
			"ui-selectmenu-menu": "modal_styles__form-select-menu"
		}
	});

	function downloadPdf(path, name) {
		var linkPdf = $('<a>');
		linkPdf.attr('href', path);
		linkPdf.attr('download', name);
		linkPdf.get(0).click();
	}

	$('.modalFormSend').submit(function(e) {
		const DOWNLOAD_FILE = e.target.dataset.fileDownload;
		e.preventDefault();
		$.ajax({
			url: "sendmail.php",
			type: "POST",
			data: $(this).serialize(),
			success: function(response) {
				if ($("#modal-1").is(":visible")) {
					$("#modal-1").arcticmodal('close');
				}
				if ($("#modal-2").is(":visible")) {
					$("#modal-2").arcticmodal('close');
				}
				if ($("#modal-3").is(":visible")) {
					$("#modal-3").arcticmodal('close');
				}
				setTimeout(function() {
					$("#modal-thanks").arcticmodal();
					if (DOWNLOAD_FILE) {
						downloadPdf(DOWNLOAD_FILE, 'MangaFY');
					}
				}, 500);
			},
			error: function(response) {
				alert('An error occurred while sending the message.');
			}
		});
	});

	$('.projectsSlider').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		infinite: false,
		arrows: true,
		responsive: [
			{
				breakpoint: 1210,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					variableWidth: true,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					variableWidth: true,
				}
			},
		]
	});

	screen6Tabs(".screen6Faq", 0);

	$(document).on('click', '.screen6Faq .nav', function () {
		let index = $(this).parent().index();
		screen6Tabs(".screen6Faq", index);
	});

	$(document).on('click', '.scrollToAnchor', function () {
		let btnHref = $(this).attr('href');
		gsap.to(window, {
			duration: 1,
			scrollTo: {
				y: btnHref,
				offsetY: 0,
			},
	  	});
		closeMobileMenu()
		return false;
	});

	if ($(window).width() > 767) {

		if ($(".screen1Animate").length) {
			let screen1Tl = gsap.timeline();
			screen1Tl
			.from(".screen1VisualAnimate", {
				opacity: 0,
				scale: 0.9,
				duration: 1,
				delay: 1
			}, 0)
		}

		if ($(".screen2Animate").length) {
			let screen2TlText = gsap.timeline();
			screen2TlText.pause();
			screen2TlText
			.from(".screen2Animate .screen2-wrap", {
				xPercent: 100,
				opacity: 0,
				duration: 1
			})
			gsap.timeline({
				scrollTrigger: {
					trigger: ".screen2Animate",
					scrub: true,
					pin: false,
					start: "top 50%",
					end: "bottom 50%",
					onEnter: function() {
						screen2TlText.play();
					},
					onLeaveBack: () => {
						screen2TlText.reverse();
					},
				}
			});
		}

		if ($(".screen3BoxAnimate").length) {
			gsap.timeline({
				scrollTrigger: {
					trigger: ".screen3BoxAnimate",
					scrub: true,
					pin: false,
					start: "top 100%",
					end: "bottom bottom",
					onEnter: function() {
						$( ".screen3BoxAnimate > div" ).each(function(index) {
							gsap.from(`.screen3BoxAnimate > div:nth-child(${index + 1})`, {
								yPercent: 100,
								opacity: 0,
								duration: 1,
								delay: (index * 2) / 10
							})
						});
					},
				}
			});
		}

		if ($(".screen4BgAnimate").length) {
			gsap.timeline({
				scrollTrigger: {
					trigger: ".screen4",
					scrub: true,
					pin: false,
					start: "top 100%",
					end: "bottom bottom",
					onEnter: function() {
						gsap.from(".screen4BgAnimate", {
							yPercent: 100,
							opacity: 0,
							duration: 1,
						})
					},
				}
			});
		}

		if ($(".screen5SliderAnimate").length) {
			gsap.timeline({
				scrollTrigger: {
					trigger: ".screen5SliderAnimate",
					scrub: true,
					pin: false,
					start: "top 100%",
					end: "bottom bottom",
					onEnter: function() {
						$( ".screen5SliderAnimate .slick-slide" ).each(function(index) {
							gsap.from(`.screen5SliderAnimate .slick-slide:nth-child(${index + 1})`, {
								xPercent: 100,
								opacity: 0,
								duration: 1,
								delay: index / 10
							})
						});
					},
				}
			});
		}

		if ($(".screen6BoxAnimate").length) {
			gsap.timeline({
				scrollTrigger: {
					trigger: ".screen6BoxAnimate",
					scrub: true,
					pin: false,
					start: "top 100%",
					end: "bottom bottom",
					onEnter: function() {
						$( ".screen6BoxAnimate > div" ).each(function(index) {
							gsap.from(`.screen6BoxAnimate > div:nth-child(${index + 1})`, {
								yPercent: 100,
								opacity: 0,
								duration: 1,
								delay: index / 10
							})
						});
					},
				}
			});
		}

		if ($(".screen7TitleAnimate").length) {
			gsap.timeline({
				scrollTrigger: {
					trigger: ".screen7TitleAnimate",
					scrub: true,
					pin: false,
					start: "top 100%",
					end: "bottom bottom",
					onEnter: function() {
						gsap.from(".screen7TitleAnimate", {
							scale: .7,
							opacity: 0,
							duration: 1,
						})
					},
				}
			});
		}

		if ($(".screen7BtnAnimate").length) {
			gsap.timeline({
				scrollTrigger: {
					trigger: ".screen7BtnAnimate",
					scrub: true,
					pin: false,
					start: "top 100%",
					end: "bottom bottom",
					onEnter: function() {
						gsap.from(".screen7BtnAnimate", {
							rotate: 45,
							ease: Elastic.easeOut.config(1, 1),
							duration: 1,
						})
					},
				}
			});
		}

		if ($(".screen7NoteAnimate").length) {
			gsap.timeline({
				scrollTrigger: {
					trigger: ".screen7NoteAnimate",
					scrub: true,
					pin: false,
					start: "top 100%",
					end: "bottom bottom",
					onEnter: function() {
						gsap.from(".screen7NoteAnimate", {
							opacity: 0,
							duration: 1,
						})
					},
				}
			});
		}

		if ($(".footerSubscriptionAnimate").length) {
			gsap.timeline({
				scrollTrigger: {
					trigger: ".footer",
					scrub: true,
					pin: false,
					start: "top 100%",
					end: "bottom bottom",
					onEnter: function() {
						gsap.from(".footerSubscriptionAnimate", {
							yPercent: -100,
							xPercent: -100,
							rotate: -90,
							opacity: 0,
							duration: 1,
						})
					},
				}
			});
		}

	}

});

$(window).on("load", function () { hideLoader() });

function closeMobileMenu() {
	let btn = $(".headerMenuBtnJs");
	let box = $(".headerMenuBoxJs");
	if (btn.hasClass("active")) {
		btn.removeClass("active");
		box.removeClass("open");
	}
}

function screen6Tabs(parrent, index) {
	let box = $(parrent);
	if (box.length) {
		let item = box.find(".block");
		let itemContent = item.eq(index).find(".content");
		if (item.eq(index).hasClass("active")) {
			item.eq(index).removeClass("active");
			itemContent.slideUp(300);
		} else {
			item.removeClass('active');
			item.eq(index).addClass("active");
			item.find(".content").slideUp(300);
			itemContent.slideDown(300);
		}
	}
	setTimeout(function() {
		ScrollTrigger.refresh(true);
	}, 100);
	
}

function hideLoader() {
	$("body").removeClass("hidden");
	setTimeout(() => $(".fixedNavJs").addClass("show"), 1000);
	const loader = $("#loader-js");
	loader.addClass("load-1");
	setTimeout(() => loader.addClass("load-2"), 400);
	setTimeout(() => loader.fadeOut(500), 400);
}

class Grain {
	constructor(el) {
		this.patternSize = 150;
		this.patternScaleX = 1;
		this.patternScaleY = 1;
		this.patternRefreshInterval = 3; // 8
		this.patternAlpha = 15; // int between 0 and 255,
		this.canvas = el;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.scale(this.patternScaleX, this.patternScaleY);
		this.patternCanvas = document.createElement("canvas");
		this.patternCanvas.width = this.patternSize;
		this.patternCanvas.height = this.patternSize;
		this.patternCtx = this.patternCanvas.getContext("2d");
		this.patternData = this.patternCtx.createImageData(
			this.patternSize,
			this.patternSize
		);
		this.patternPixelDataLength = this.patternSize * this.patternSize * 4; // rgba = 4
		this.resize = this.resize.bind(this);
		this.loop = this.loop.bind(this);
		this.frame = 0;
		window.addEventListener("resize", this.resize);
		this.resize();
		window.requestAnimationFrame(this.loop);
	}
	resize() {
		this.canvas.width = window.innerWidth * devicePixelRatio;
		this.canvas.height = window.innerHeight * devicePixelRatio;
	}
	update() {
		const { patternPixelDataLength, patternData, patternAlpha, patternCtx } = this;
		for (let i = 0; i < patternPixelDataLength; i += 4) {
			const value = Math.random() * 255;
			patternData.data[i] = value;
			patternData.data[i + 1] = value;
			patternData.data[i + 2] = value;
			patternData.data[i + 3] = patternAlpha;
		}
		patternCtx.putImageData(patternData, 0, 0);
	}
	draw() {
		const { ctx, patternCanvas, canvas, viewHeight } = this;
		const { width, height } = canvas;
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat");
		ctx.fillRect(0, 0, width, height);
	}
	loop() {
		const shouldDraw = ++this.frame % this.patternRefreshInterval === 0;
		if (shouldDraw) {
			this.update();
			this.draw();
		}
		window.requestAnimationFrame(this.loop);
	}
}

let el = document.querySelector(".grain");
let grain;
if (el) {
	grain = new Grain(el);
}

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
	get: function () {
		return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
	}
});

document.body.addEventListener("click", playVideoOnLowPower);
document.body.addEventListener("touchstart", playVideoOnLowPower);

function playVideoOnLowPower() {
	try {
		const videoElements = document.querySelectorAll("video");
		for (i = 0; i < videoElements.length; i++) {
			if (videoElements[i].playing) {
			}
			else {
				videoElements[i].play();
			}
		}
	}
	catch (err) {
		console.log(err);
	}
}

function formatNumber(num) {
	return num.toLocaleString('ru-RU');
}
