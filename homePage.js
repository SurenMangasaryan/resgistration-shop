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

        allProducts.products.forEach(element => {
            let theProduct = document.createElement('div');
            theProduct.classList.add("the-product")
            theProduct.innerHTML = `<h1>${element.title}</h1> <img src="${element.images[0]}"> <br> <h2>${element.category}</h2> <p>${element.description}</p>`
            oneProduct.append(theProduct);

            element.images.forEach((items, index) => {
                let circle = document.createElement('div');
                circle.classList.add('circle');
                circle.innerHTML = index;
                oneProduct.append(circle);

                circle.addEventListener('click', () => {
                    theProduct.innerHTML = ` <h1>${element.title}</h1> <img src="${items}"> <br> <h2>${element.category}</h2> <p>${element.description}</p> `
                })
            })
        });
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