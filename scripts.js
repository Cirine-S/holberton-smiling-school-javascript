$(document).ready(function(){




	function CarouselComponent(active, name, image, quote, title){
		return (`<div class="carousel-item ${active}">
						<div class="row d-flex justify-content-center">
							<div class="col-lg-2">
								<img src="${image}" class="rounded-circle img-fluid" alt="slide">
							</div>
							<div class="col-lg-6 text-light inner-2">
								<p>${quote}</p>
								<p class="font-weight-bold">${name}</p>
								<p>${title}</p>
							</div>
						</div>
					</div>
				</div>`)
	}

	function CarouselPopTuto(active, title, subtitle, thumb_url, author, author_pic_url, star, duration, topic, views, published_at){
		let starImg = "<img class='img-fluid' src= './images/star_on.png'/>"
		return (`<div class="col-12 col-sm-6 col-md-4 col-lg-3 ${active}">
					<div class="card">
						<div class="card-body">
							<div class="">
								<a class="play"><img class="img-fluid" src=${thumb_url} alt="play" /></a>
							</div>
							<p class="card-title font-weight-bold">${title}</p>
							<p class="card-text">
								<span>${subtitle}</span>
							</p>
							<!-- VIDEO REVIEWER -->
							<div class="row mb-3">
								<div class="col-3 user_review">
									<img class="rounded-circle img-fluid " src=${author_pic_url} />
								</div>
								<div class="col-9 d-lg-flex justify-content-lg-start align-items-lg-center">
									<span class="text-dark font-weight-bold">${author}</span>
								</div>
							</div>
							<!-- VIDEO CALIFICATION -->
							<div class="row text-center">
								<div class="col-7">
									<div class="d-flex justify-content-lg-center">
										${starImg.repeat(star)}
									</div>

								</div>
								<div class="col-5">
									<span class="text-dark font-weight-bold">${duration}</span>
								</div>
							</div>
						</div>
					</div>
				</div>`)
	}

	

	function readyFn(func, url, parentCarouselinner) {
	
		$.getJSON(url, function(data){
			$(`${parentCarouselinner}`).hide()
			for(let i = 0; i < data.length; i++)
			{
				let item = ""
				let active = ""

				
				item = func(active, data[i].title, data[i]["sub-title"], data[i].thumb_url, data[i].author, data[i].author_pic_url, data[i].star, data[i].duration, data[i].topic, data[i].views, data[i].published_at)

				$(`${parentCarouselinner}`).append(item)
				$(".loader").hide()
			}
			$(`${parentCarouselinner} .carousel-inner`).show()
		});
	}

	function CoursesVideos(func, url, parentCarouselinner) {

		$(`${parentCarouselinner} .loader`).hide()
		let topic = $('#dropdownTopic option:selected').val()
		let sort = $('#dropdownSort option:selected').val()
		let q = $('#keywords').text()
		$.get( url, {q : q, topic : topic, sort: sort} )
			.done(function( data ) {
				if ($(`${parentCarouselinner}`).children().length > 0) {
					$(`${parentCarouselinner}`).empty();
				  }
				for(let i = 0; i < data.courses.length; i++)
				{
					let item = ""
					let active = "active"
					
					item = func(active, data.courses[i].title, data.courses[i]["sub-title"], data.courses[i].thumb_url, data.courses[i].author, data.courses[i].author_pic_url, data.courses[i].star, data.courses[i].duration, data.courses[i].topic, data.courses[i].views, data.courses[i].published_at)


					$(`${parentCarouselinner}`).append(item)
					$(`${parentCarouselinner}`).show()
					$(".loader").hide()
				}

			})

	}

	$("#dropdownTopic").change(() => CoursesVideos(CarouselPopTuto, "https://smileschool-api.hbtn.info/courses", "#rowVideos"))
	$("#dropdownSort").change(() => CoursesVideos(CarouselPopTuto, "https://smileschool-api.hbtn.info/courses", "#rowVideos"))

	readyFn(CarouselComponent, "https://smileschool-api.hbtn.info/quotes", "#carouselExampleControls")
	readyFn(CarouselPopTuto, "https://smileschool-api.hbtn.info/popular-tutorials", "#multi-item-example")
	readyFn(CarouselPopTuto, "https://smileschool-api.hbtn.info/latest-videos", "#multi-item-example2")

})
