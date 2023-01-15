let logOut = document.querySelector(".log-out");

logOut.addEventListener('click', function () {
    if (localStorage.getItem('User')) {
        localStorage.removeItem('User');
        location.pathname = 'registration.html';
    }
})

let innerAllProducts = document.querySelector(".inner-all-products");
let oneProduct = document.querySelector('.one-product');

function getProducts(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = (resp) => {
        let allProducts = JSON.parse(resp.target.response);
        oneProduct.innerHTML = "";

        for (let i = 0; i < allProducts.products.length; i++) {
            let theProduct = document.createElement('div');
            theProduct.classList.add("the-product")
            theProduct.innerHTML = `
                                        <h1>${allProducts.products[i].title}</h1> <img src="${allProducts.products[i].images[0]}"> <br>
                                        <h2>${allProducts.products[i].category}</h2> <p>${allProducts.products[i].description}</p>
                                    `
            oneProduct.append(theProduct);

            for (let j = 0; j < allProducts.products[i].images.length; j++) {
                let circle = document.createElement('div');
                circle.classList.add('circle');
                circle.innerHTML = j;
                theProduct.append(circle);

                circle.addEventListener('click', function () {
                    theProduct.innerHTML = `
                                        <h1>${allProducts.products[i].title}</h1> <img src="${allProducts.products[i].images[j]}"> <br>
                                        <h2>${allProducts.products[i].category}</h2> <p>${allProducts.products[i].description}</p>
                                    `
                })
            }
        }

    }
    xhr.send();
}
getProducts('https://dummyjson.com/products');


function getCategories(url) {
    let innerCategories = document.querySelector('.inner-all-categories');
    let xhr = new XMLHttpRequest();

    let all = document.createElement('button');
    all.classList.add('catigory-btn');
    all.innerHTML = "All";
    innerCategories.append(all);

    xhr.open('GET', url);
    xhr.onload = (resp) => {
        let allCategories = JSON.parse(resp.target.response);

        for (let i = 0; i < allCategories.length; i++) {
            let categoryBtns = document.createElement('button');
            categoryBtns.classList.add('catigory-btn');
            categoryBtns.innerHTML = allCategories[i];
            innerCategories.append(categoryBtns);

            categoryBtns.addEventListener('click', () => {
                getProducts(`https://dummyjson.com/products/category/${allCategories[i]}`)
            })
        }
        all.addEventListener('click', () => {
            getProducts('https://dummyjson.com/products')
        })
    }
    xhr.send();
}
getCategories('https://dummyjson.com/products/categories')