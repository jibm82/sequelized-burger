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
    swal({
      heightAuto: false,
      title: 'Who ate that burger?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Devour',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        if (name === "") {
          swal.showValidationMessage("You must provide the customer's name");
          return false;
        } else {
          return name;
        }
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        let id = $(this).attr("data-id");
        let url = `/api/burgers/${id}`;

        $.ajax({
          method: "PUT",
          url,
          data: {
            name: result.value
          }
        }).then(() => {
          location.reload();
        });
      }
    })
  });
});