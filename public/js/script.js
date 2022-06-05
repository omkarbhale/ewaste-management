function navBtnClicked(){
    document.getElementById('NavlinksHere').classList.toggle('make-display-non');
}

async function loginFunction(){
    let userNameLogin = document.getElementById('userNameLogin');
    let passwordLogin = document.getElementById('passwordLogin');
    try {
        const res = await axios.post('/api/auth/login', {
            email: 'lalala@gmail.com',
            password: 'password'
        })
        console.log(res.data.token);
        localStorage.setItem('auth-token', res.data.token);
    } catch(err) {
        console.log(err);
    }
}

(async () => {
if(document.getElementById("productPage")){
    let path = window.location.pathname;
    let requestParam = '';
    
    if(path == '/products/mobiles'){
        requestParam = 'mobiles';
    } else if(path == '/products/homeapp'){
        requestParam = 'homeappliances';
    } else if(path == '/products/computers'){
        requestParam = 'computers';
    }
    
    try {
        const {data} = await axios.get(`/api/products/${requestParam}`, {
            headers: {
                Authorization: 'Bearer ' + (localStorage.getItem('auth-token') || '')
            }
        })
        let productGridHere = document.getElementById('productGridHere');
        addDataToGrid(data);
    } catch(e) {
        console.log(e);
    }

    

    function addDataToGrid(data){
        console.log(data.products);
        let cardHTML ='';
        data.products.forEach(ele => {

            cardHTML += `
            <div class="card-box col-6 col-md-3">
                <a href="">
                    <img src="../imgs/bag.webp" alt="">
                    <div class="pro-card-label">${ele.title}</div>
                    <div class="pro-card-avail">IC, Motherboard</div>
                    <div class="pro-card-price">₹${ele.sellingPrice}</div>
                </a>
            </div>
            `;
        });

        productGridHere.innerHTML= cardHTML;
    }
}
})()