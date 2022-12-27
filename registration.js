function registration() {
    let inputs = document.querySelectorAll(".box-inputs");
    
    let ok = document.querySelector(".box-button1");

    let trueUser = document.querySelector(".trueUser");
    let falseUser = document.querySelector(".flaseUser");

    let truePassword = document.querySelector(".truePassword");
    let flasePassword = document.querySelector(".flasePassword");

    let invalidError = document.querySelector(".error")

    let testName;
    let testPassword;

    let logData = {
        username: "kminchelle",
        password: "0lelplR",
    }

    new Promise((resolve, reject) => {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener("input", function () {
                if (inputs[i].name == "name") {
                    if (inputs[i].value == logData.username) {
                        testName = logData.username;
                        trueUser.style.display = "block";
                        falseUser.style.display = "none";
                    }
                    else {
                        falseUser.style.display = "block";
                        trueUser.style.display = "none";
                    }
                }
                if (inputs[i].name == "password") {
                    if (inputs[i].value == logData.password) {
                        testPassword = logData.password;
                        truePassword.style.display = "block";
                        flasePassword.style.display = "none";
                    }
                    else {
                        truePassword.style.display = "none";
                        flasePassword.style.display = "block";
                    }
                }
            })
        }

        ok.addEventListener('click', () => {
            if (testName && testPassword) {
                resolve(logData)
                invalidError.style.display = "none";
            } 
            else {
                reject(logData)
                invalidError.style.display = "block";
            }
        })

    }).then((selectPost) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://dummyjson.com/auth/login');
        xhr.onload = (resp) => {
            console.log(resp.target.response);

            localStorage.setItem('User', JSON.stringify(selectPost));

            const getLocalData = () => {
                let getData = localStorage.getItem('User');
                let parserData = JSON.parse(getData)
                console.log(parserData);
            }
            getLocalData()
        }
        xhr.send(JSON.stringify(selectPost))
        return selectPost;
    }).then(() => {
        setTimeout(() => {
            location.pathname = "homePage.html"
        }, 1000)
    })

    if (localStorage.getItem('User')) {
        location.pathname = "homePage.html"
    }
}
registration()

