$(document).ready(() => {
  $(".create-form").submit(function (e) {
    e.preventDefault();
    let burgerName = $("#burger_name").val().trim();

    if (burgerName == "") {
      $("#burger_name").addClass("is-invalid");
      return false;
    } else {
      $("#burger_name").removeClass("is-invalid");
    }

    $.post("/api/burgers", {
      burger_name: burgerName
    }, (response) => {
      location.reload();
    });
  });

  $(".devour").click(function (e) {
    e.preventDefault();

    let id = $(this).attr("data-id");
    let url = `/api/burgers/${id}`;

    $.ajax({
      method: "PUT",
      url
    }).then(() => {
      location.reload();
    });
  });
});