// динамическое удаление объявлений из избранных
const $favourite = document.querySelector("#favourite");

if ($favourite) {
  $favourite.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;

      fetch("/favourite/remove/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((favourite) => {
          if (favourite.length) {
            const html = favourite
              .map((e) => {
                return `
              <tr>
              <td>${e.title}</td>
              <td>${e.price}</td>
              <td>
                <button
                  class="btn btn-small red darken-4 js-remove"
                  data-id="${e._id}"
                >Удалить
                </button>
              </td>
            </tr>
              `;
              })
              .join("");
            $favourite.querySelector("tbody").innerHTML = html;
          } else {
            $favourite.innerHTML = `
            <section class="my_container align-c">
              <h5 class="m100">Нет избранных</h5>
            </section>
            `;
          }
        });
    }
  });
}
//
