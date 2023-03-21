async function filter() {
  const $items = document.querySelector("#items");

  const num_rooms = $("select#num_rooms").val();
  const type = $("select#type").val();

  const price_lower = $("#price_lower").val();

  const price_upper = $("#price_upper").val();

  let response = await fetch(
    "/filter/?" +
      new URLSearchParams({
        num_rooms: num_rooms,
        type: type,
        price_lower: price_lower,
        price_upper: price_upper,
      })
  );

  if (response.ok) {
    let items = await response.json();

    if (items.length) {
      const html = items
        .map((e) => {
          return `
          <div id="items" class="row">
      
            <div class="item">
      
              <a href="/item/${e.id}">
      
                <div class="card horizontal hoverable">
      
                 
                      <div class="card-image my-card-image">
                        <img src="${e.img}" alt="${e.img}" />
                      </div>
             
      
                  <div class="card-stacked">
      
                    <div class="card-content" style="font-size: 25px;">
      
                      <section class="section">
      
                        <div class="row">
      
                          <div class="col s6">
                          ${e.title}
                          </div>
      
                          <div class="col s6 align-c price">
                          ${eprice}
                          </div>
      
                        </div>
      
                        <div class="p10">
      
                          <li>
                            <span class="span_title">Тип</span>
                            <span class="span_text">${e.type}</span>
                          </li>
      
                          <li>
                            <span class="span_title">Площадь комнат</span>
                            <span class="span_text">${e.space} м²</span>
                          </li>
      
                          <li>
                            <span class="span_title">Комнат</span>
                            <span class="span_text">${e.num_rooms}</span>
                          </li>
      
                          <li>
                            <span class="span_title">Этаж</span>
                            <span class="span_text">${e.level}
                              из
                              ${e.total_level}</span>
                          </li>
      
                          <li>
                            <span class="span_title">Ремонт</span>
                            <span class="span_text">${e.repair}</span>
                          </li>
      
                        </div>
      
                      </section>
      
                    </div>
      
                  </div>
      
                </div>
      
              </a>
            </div>
      
        </div>
      
          `;
        })
        .join("");
      $items.innerHTML = html;

      document.querySelectorAll(".price").forEach((node) => {
        node.textContent = toCurrency(node.textContent);
      });
    } else {
      M.toast({ html: "Объявлений не найдено" });
    }
  }
}
