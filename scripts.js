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
		return (`<div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 ${active}">
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
			$(`${parentCarouselinner} .carousel-inner`).hide()
			for(let i = 0; i < data.length; i++)
			{
				let item = ""
				let active = ""
				if (i == 0)
					active = "active"
				
				if (parentCarouselinner == "#carouselExampleControls")
					item = func(active, data[i].name, data[i].pic_url, data[i].text, data[i].title)
				else 
					item = func(active, data[i].title, data[i]["sub-title"], data[i].thumb_url, data[i].author, data[i].author_pic_url, data[i].star, data[i].duration, data[i].topic, data[i].views, data[i].published_at)

				$(`${parentCarouselinner} .carousel-inner`).append(item)
				$(".loader").hide()
			}
			$(`${parentCarouselinner} .carousel-inner`).show()
		});
	}

	readyFn(CarouselComponent, "https://smileschool-api.hbtn.info/quotes", "#carouselExampleControls")
	readyFn(CarouselPopTuto, "https://smileschool-api.hbtn.info/popular-tutorials", "#multi-item-example")
	readyFn(CarouselPopTuto, "https://smileschool-api.hbtn.info/latest-videos", "#multi-item-example2")

})
