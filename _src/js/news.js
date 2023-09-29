$(document).ready(function(){
    // JSON データを読み込んでスライダーを初期化
    $.getJSON('../json/news.json', function(data) {
      displayData(data);
    });

    // JSON データを読み込んでスライダーを初期化
    function displayData(data) {
      var slider = $('.js-slider');
      slider.empty();

      // 各アイテムをスライダーに追加
      data.forEach(function(item, index) {
        var sliderItem = $('<div class="slider-item">')
            .append('<a class="list-item__link '+item.new+'" href="'+item.link+ '"><picture><source srcset="' + item.img01+ '" type="image/webp"><img src="' +item.img02 + '" alt=""></picture><p class="date m-plus-1p">' + item.date + '</p><p class="txt m-plus-1p">' + item.text + '</p></a>');

        slider.append(sliderItem);
      });

      // Slick スライダーを初期化
      slider.slick({
        infinite: true,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $('.prev-btn'),
        nextArrow: $('.next-btn')
      });
    }

    // データを更新してスライダーをリフレッシュする関数
    function updateData() {
      $.getJSON('/json/news.json', function(data) {
        // 既存のスライダーをクリア
        $('.js-slider').slick('unslick').empty();
        // 更新されたデータを表示
        displayData(data);
      });
    }

    // 10秒ごとにデータを更新
    setInterval(updateData, 10000);
  });