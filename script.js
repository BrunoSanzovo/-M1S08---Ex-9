document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutButton = document.querySelector('.checkout');
    const totalItemsElement = document.getElementById('totalItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const backgroundButton = document.querySelector('.change-background');
    const changePriceButtons = document.querySelectorAll('.change-price');

    addToCartButtons.forEach(button => {
        button.removeAttribute('data-novo-atributo');
    });

    let totalItems = 0;
    let totalPrice = 0;

    function updateCart() {
        totalItemsElement.textContent = totalItems;
        totalPriceElement.textContent = formatCurrency(totalPrice);
    }

    function formatCurrency(value) {
        return 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    }

    function formatPrice(price) {
        return parseFloat(price).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = button.parentElement;
            const productPriceText = product.querySelector('p').textContent.trim();
            const productPrice = parseFloat(productPriceText.replace('R$ ', '').replace('.', '').replace(',', '.'));
            totalItems++;
            totalPrice += productPrice;
            updateCart();
        });
    });

    changePriceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = button.closest('.product');
            const priceElement = product.querySelector('p');
            let newPrice = prompt('Digite o novo preço! exemplo "1,00" real ou "1" real:');
            newPrice = newPrice ? newPrice.trim() : null;
            if (newPrice !== null && !isNaN(parseFloat(newPrice))) {
                priceElement.textContent = 'R$ ' + formatPrice(newPrice);
                updateCart();
            } else {
                alert('Por favor, insira um preço válido no formato: exemplo "1,00" real ou "1" real');
            }
        });
    });

    checkoutButton.addEventListener('click', function() {
        alert('Compra finalizada! Total: ' + formatCurrency(totalPrice));
    });

    backgroundButton.addEventListener('click', function() {
        changeBackgroundColor();
    });

    function changeBackgroundColor() {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        document.body.style.backgroundColor = '#' + randomColor;
    }
});
