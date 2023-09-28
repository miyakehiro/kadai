$(document).ready(function(){
    // Load JSON data and initialize the slider
    $.getJSON('../json/news.json', function(data) {
      displayData(data);
    });

    // Function to display data and initialize the slider
    function displayData(data) {
      var slider = $('.js-slider');
      slider.empty();

      // Append each item to the slider
      data.forEach(function(item, index) {
        var sliderItem = $('<div class="slider-item">')
            .append('<a class="list-item__link" href="'+item.link+ '"><picture><source srcset="' + item.img01+ '" type="image/webp"><img src="' +item.img02 + '" alt=""></picture><p class="date m-plus-1p">' + item.date + '</p><p class="txt m-plus-1p">' + item.text + '</p></a>');

        slider.append(sliderItem);
      });

      // Initialize the Slick slider
      slider.slick({
        infinite: true,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $('.prev-btn'),
        nextArrow: $('.next-btn')
      });
    }

    // Update data and refresh the slider when needed
    function updateData() {
      $.getJSON('/json/news.json', function(data) {
        // Clear the existing slider
        $('.js-slider').slick('unslick').empty();
        // Display the updated data
        displayData(data);
      });
    }

    // Example: Update the data every 10 seconds (adjust as needed)
    setInterval(updateData, 100000);
  });