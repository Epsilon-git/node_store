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
            <div class="item">

            <a href="/item/${e._id}">

              <div class="card horizontal hoverable">

                <div class="card-image my-card-image">
                  <img src="${e.img[0]}" alt="${e.title}" />
                </div>

                <div class="card-stacked">

                  <div class="card-content" style="font-size: 25px;">

                    <div class="col s12">
                      ${e.space}м²,
                      ${e.title}
                    </div>

                    <div class="row">

                      <div class="col s6">
                        ${e.type}
                        <br />
                        ${e.num_rooms}
                        комнат(а)
                      </div>

                      <div class="col s6 align-c price">
                        ${e.price}
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </a>
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
