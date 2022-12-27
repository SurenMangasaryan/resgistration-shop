function homePage() {
    let logOut = document.querySelector(".log-out");

    logOut.addEventListener('click', function () {
        if (localStorage.getItem('User')) {
            localStorage.removeItem('User');
            location.pathname = 'registration.html';
        }
    })

    let innerAllProducts = document.querySelector(".inner-all-products");

    function getProducts(url) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = (resp) => {
            let allImage;
            let products;
            let allProducts = JSON.parse(resp.target.response)
            innerAllProducts.innerHTML = "";

            for (let i = 0; i < allProducts.products.length; i++) {
                products = allProducts.products[i];

                let theProduct = document.createElement('div');
                theProduct.classList.add("the-product")

                for (let i = 0; i < products.images.length; i++) {
                    allImage = products.images[i];
                    let slide = 0;
                    let btns = document.createElement('button');
                    btns.classList.add('slide-btns')
                    btns.innerHTML = products.title;
                    innerAllProducts.append(btns)

                    btns.addEventListener('click', function () {
                        if (slide < products.images.length) {
                            slide++;
                            console.log(products.images[i]);
                        }

                    })
                }

                theProduct.innerHTML = `
                                        <h1>${products.title}</h1> <img src="${allImage}"> <br>
                                        <h2>${products.category}</h2> <p>${products.description}</p>
                                    `
                innerAllProducts.append(theProduct);
            }

        }
        xhr.send();
    }
    getProducts('https://dummyjson.com/products');


    function getCategories() {
        let innerCategories = document.querySelector('.inner-all-categories');
        let xhr = new XMLHttpRequest();

        let all = document.createElement('button');
        all.classList.add('catigory-btn');
        all.innerHTML = "All";
        innerCategories.append(all);

        xhr.open('GET', 'https://dummyjson.com/products/categories');
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
    getCategories()
}
homePage()



//tarberak 2 stugum  getProducts();

// let allImage;
// let products;
// let allProducts = JSON.parse(resp.target.response)

// for (let i = 0; i < allProducts.products.length; i++) {
//     products = allProducts.products[i];
//     innerAllProducts.innerHTML = "";

//     let theProduct = document.createElement('div');
//     theProduct.classList.add("the-product");

//     let slide = 0;

//     for (let i = 0; i < products.images.length; i++) {
//         allImage = products.images[i];

//         let btns = document.createElement('button');
//         btns.classList.add('slide-btns')
//         btns.innerHTML = products.title;
//         innerAllProducts.append(btns)

        

//         btns.addEventListener('click', function () {
//             if (slide < products.images.length) {
//                 slide++;
//                 theProduct.innerHTML = products.images[i];
//             }
//             innerAllProducts.append(theProduct);
//         })
//     }

//     theProduct.innerHTML = `
//                             <h1>${products.title}</h1> <img src="${allImage}"> 
//                             <h2>${products.category}</h2> <p>${products.description}</p>
//                         `
//     innerAllProducts.append(theProduct);
// }
