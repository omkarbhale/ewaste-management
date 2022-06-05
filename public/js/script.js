function navBtnClicked() {
  document.getElementById("NavlinksHere").classList.toggle("make-display-non");
}

async function loginFunction() {
  let userNameLogin = document.getElementById("userNameLogin");
  let passwordLogin = document.getElementById("passwordLogin");
  try {
    const res = await axios.post("/api/auth/login", {
      email: "omkarbhale001@gmail.com",
      password: "omkarbhale",
    });
    console.log(res.data.token);
    localStorage.setItem("auth-token", res.data.token);
  } catch (err) {
    console.log(err);
  }
}

(async () => {
  if (document.getElementById("productPage")) {
    let path = window.location.pathname;
    let requestParam = "";

    if (path == "/products/mobiles") {
      requestParam = "mobiles";
    } else if (path == "/products/homeapp") {
      requestParam = "homeappliances";
    } else if (path == "/products/computers") {
      requestParam = "computers";
    }

    try {
      console.log(`/api/products?category=${requestParam}`);
      const { data } = await axios.get(
        `/api/products?category=${requestParam}`,
        {
          headers: {
            Authorization:
              "Bearer " + (localStorage.getItem("auth-token") || ""),
          },
        }
      );
      let productGridHere = document.getElementById("productGridHere");
      addDataToGrid(data);
    } catch (e) {
      console.log(e);
    }

    function addDataToGrid(data) {
      console.log(data.products);
      let cardHTML = "";
      data.products.forEach((ele) => {
        cardHTML += `
            <div class="card-box col-6 col-md-3">
                <a href="/items/${ele._id}">
                    <img src="../imgs/bag.webp" alt="">
                    <div class="pro-card-label">${ele.title}</div>
                    <div class="pro-card-avail">${ele.components}</div>
                    <div class="pro-card-price">₹${ele.sellingPrice}</div>
                </a>
            </div>
            `;
      });

      productGridHere.innerHTML = cardHTML;
    }
  }
})();

if (document.getElementById("itemsPage")) {
  let path = window.location.pathname;
  let requestParam = path.split("/")[2];

  axios({
    method: "get",
    url: `/api/products/${requestParam}`,
    headers: {
      Authorization: "Bearer " + (localStorage.getItem("auth-token") || ""),
    },
  }).then(function (response) {
    addDataToPage(response.data.product);
  });
  let itemsPage = document.getElementById("itemsPage");
  function addDataToPage(ele) {
    console.log(ele);
    let dataHTML = `
                <div class="row items-row">
                    <div class="col-md-6 item-product-img">
                        <img src="../imgs/bag.webp" alt="">
                    </div>
                    <div class="col-md-6">
                        <div class="item-page-card" style="width: 80%;">
                            <h2>${ele.title}</h2>
                            <div class="item-price-here">₹ ${ele.sellingPrice}</div>
                            <hr>
                            <div class="item-category">${ele.category}</div>
                            <div class="item-parts-avail">${ele.components}</div>
                            <div class="" style="width: 50%; margin: auto;">
                                <a onclick="" style="width: 100%;" class="proj-btn">Add to Cart</a>
                            </div>
                            <br>
                            <div class="item-details">${ele.description}
                            </div>
                        </div>
                    </div>
                </div>
                `;

    itemsPage.innerHTML = dataHTML;
  }
}

if (document.getElementById("homepage")) {
  let dataArr = ["mobiles", "homeappliances", "computers"];
  let navHome = document.getElementById("navHome");
  let navProfile = document.getElementById("navProfile");
  let navContact = document.getElementById("navContact");
  let divid = [navHome, navProfile, navContact];


  for (let i = 0; i < dataArr.length; i++) {
    const ele = dataArr[i];
    const dataele = divid[i];
    axios({
      method: "get",
      url: `/api/products?category=${ele}`,
      headers: {
        Authorization: "Bearer " + (localStorage.getItem("auth-token") || ""),
      },
    }).then(function (response) {
        console.log(response);
      addDataToPage(response.data.products, dataele);
    });
  }

  

  function addDataToPage(dat, dom) {
    console.log(dat);
    console.log(dom.getAttribute("id"));
    let dataHTML = "";

    dat.forEach((ele)=>{
        dataHTML += `
                <div class="card-box col-6 col-md-3">
                    <a href="/items/${ele._id}">
                        <img src="../imgs/bag.webp" alt="">
                        <div class="pro-card-label">${ele.title}</div>
                        <div class="pro-card-avail">${ele.components}</div>
                        <div class="pro-card-price">₹${ele.sellingPrice}</div>
                    </a>
                </div>
            `;
    })

    console.log(dataHTML);

        dom.innerHTML = dataHTML;
    if(dat.length == 0){
        dom.innerHTML = '';
    }
  }

}
