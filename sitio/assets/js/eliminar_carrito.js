const btn_carrito_eliminar = document.querySelectorAll("#eliminar_carrito");

btn_carrito_eliminar.forEach((button) => {
  button.addEventListener("click", async (event) => {
    const productId = event.target.getAttribute("data-product-carrito-id");

    try {
      location.href = "/carrito";
      await fetch(`/rt-carrito-eliminar/:${productId}`, {
        method: "DELETE",
      });
    } catch (err) {}
  });
});
