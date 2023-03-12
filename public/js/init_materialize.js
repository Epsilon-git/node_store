$(document).ready(function () {
  M.AutoInit();

  M.updateTextFields();

  // Инициализация слайдера "ЦЕНЫ"
  var priceSlider = document.getElementById("slider");

  if (priceSlider) {
    noUiSlider.create(priceSlider, {
      start: [0, 1],
      connect: true,
      tooltips: [true, true],
      orientation: "horizontal", // 'horizontal' or 'vertical'
      range: { min: 0, max: 1 },
      step: 100,
      tooltips: false,

      format: {
        from: function (value) {
          return parseInt(value);
        },
        to: function (value) {
          return parseInt(value);
        },
      },
    });

    //установка мак цены в слайдере
    setMaxPrice();
    //

    // обработка изменений и записывание их в инпуты (атрибут "value")
    var snapValues = [
      document.getElementById("price_lower"),
      document.getElementById("price_upper"),
    ];

    priceSlider.noUiSlider.on("update", function (values, handle) {
      snapValues[handle].setAttribute("value", values[handle]);
    });
  }
  //

  async function setMaxPrice() {
    let response = await fetch("/maxPrice/");

    if (response.ok) {
      maxPrice = await response.json();

      priceSlider.noUiSlider.updateOptions({
        start: [0, maxPrice],
        range: {
          min: 0,
          max: maxPrice,
        },
      });
    }
  }

  M.textareaAutoResize($("#description"));

  
  // $("input#input_text, textarea#description").characterCounter();
});
