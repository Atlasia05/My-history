var obj;


console.log("2",obj);

let arr = [];
let localArr = [];
let sum = [];
let itmeArr = [];
let itemcnt = 0;
let clickcnt = 0;
let hap = 0;
let albumArtist = [];
let albumName = [];

const array = [];

let contents = document.querySelector(".contents");
let cnt = 0;

window.onload = function () {
    $.getJSON("./music_data.json", function (data) {
        $.each(data, function (key, value) {
            obj = value;
            start();
        });
    });
};


function start() {
    for(let i = 0; i < obj.length; i++){
        const cells = [];
        const secondcells = [];
        cells.push(obj[i].artist.split(""));
        secondcells.push(obj[i].albumName.split(""));
        albumArtist.push(cells);
        albumName.push(secondcells);
    }

    //정렬 및 배열 추가
    for(let k = 19; k > 0; k--) {
        if(k > 9) {
            arr[arr.length] = `2018.05.${k}`;
        }
        else {
            arr[arr.length] = `2018.05.0${k}`;
        }
    }
    for(let j = 30; j > 0; j--) {
        if(j > 9) {
            arr[arr.length] = `2018.04.${j}`;
        }
        else {
            arr[arr.length] = `2018.04.0${j}`;
        }
    }

    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < obj.length; j++) {
            if(arr[i] == obj[j].release) {
                sum[i] = 0;
                itmeArr[i] = 0;
                cnt++
                if(cnt >= 19) {
                    break;
                }
                contextInner(j);
            }   
        }
    }

    MoreBtn();


    for(let i = 0; i < obj.length; i++) {
        let alph = localStorage.getItem(`item${i}`);
        if(alph != null) {
            sum[i] = (Number(obj[i].price.split("원")[0]));
            let local = localStorage.getItem(`itemvalue${i}`);
            addItem(i, local);
            for(let i = 0; i < localArr.length; i++) {
                let plus = document.querySelector(`.shopbtn > .addBtn${localArr[i]}`);
                plus.innerHTML = "추가하기";
            }
            localArr[localArr.length] = i;
            console.log(localArr[localArr.length - 1])
        }
    }
}

arr.sort(function(a, b) {
    if(a < b) return 1;
    if(a > b) return -1;
    if(a === b) return 0;
});


//All일때 20개씩 출력
// bar 메뉴 클릭했을때
let max_count = 19;
let more = contents.querySelector("button");
contents.addEventListener('mousedown', (e) => {
    if(e.target.id == "more") {
    cnt = 0;
    max_count += 18;
    contents.innerHTML = "";
        cnt = 0;
        for(let i = 0; i < arr.length; i++) {
            for(let j = 0; j < obj.length; j++) {
                if(arr[i] == obj[j].release) {
                    cnt++
                    if(cnt >= max_count) {
                        break;
                    }
                    contextInner(j);
                }
            }
        }
        MoreBtn()
    }
})

// 클릭 오류 방지
const bar = document.querySelector("#main-menu");
const title = document.querySelector(".col-md-12")

bar.addEventListener('click', (e) => {
    let trash = String(e.target.classList[0]);
    if(trash == "search" || trash == "form-control" || trash == "fa-search" || trash == "nav" || trash == "btn-default" || trash == "fa" || trash == "btn" || trash == "text-center") {

    }
    else {
        let list = document.querySelector(".active-menu");
        list.classList.remove("active-menu");

        if(e.target.tagName == "A") {
            e.target.classList.add("active-menu");
        }
        ChangeTitle(e.target.innerText);
        title.innerHTML = `
            <h2>${e.target.innerText}</h2>
        `
    }
    // for(let i = 0; i < localArr.length; i++) {
    //     let plus = document.querySelector(`.shopbtn > .addBtn${localArr[i]}`);
    //     plus.innerHTML = "추가하기";
    // }
})

//Bar 눌렀을때

function ChangeTitle(ev) {
    cnt = 0;
    contents.innerHTML = "";
    if(ev.trim() == "ALL") {
        cnt = 0;
        for(let i = 0; i < arr.length; i++) {
            for(let j = 0; j < obj.length; j++) {
                if(arr[i] == obj[j].release) {
                    cnt++
                    if(cnt >= 19) {
                        break;
                    }
                    contextInner(j);
                }
            }
        }
        MoreBtn()
        for(let i = 0; i < localArr.length; i++) {
            let plus = document.querySelector(`.shopbtn > .addBtn${localArr[i]}`);
            plus.innerHTML = "추가하기";
        }
    }
    else {
        max_count=19;
        let innerNum = [];
        for(let i = 0; i < arr.length; i++) {
            for(let j = 0; j < obj.length; j++) {
                if(arr[i] == obj[j].release) {
                    if(obj[j].category == ev.trim()) {
                        contextInner(j);
                        innerNum[innerNum.length] = j;
                    }   
                    if(localArr.indexOf(j) == true) {
                        contextInner(j);
                        innerNum[innerNum.length] = j;
                    }
                }
            }
        }
        // for(let j = 0; j < innerNum.length; j++) {
        //     for(let i = 0; i < localArr.length; i++) {
        //         let plus = document.querySelector(`.shopbtn > .addBtn${localArr[i]}`);
        //         plus.innerHTML = "추가하기";
        //     }
        // }
    }
}

/* ======== function ========= */

function contextInner(num) {
    contents.innerHTML += `
        <div class="col-md-2 col-sm-2 col-xs-2 product-grid">
            <div class="product-items">
                    <div class="project-eff">
                        <img class="img-responsive" src="images/${obj[num].albumJaketImage}" alt="Time for the moon night">
                    </div>
                <div class="produ-cost">
                    <h5>${obj[num].albumName}</h5>
                    <span>
                        <i class="fa fa-microphone"> 아티스트</i> 
                        <p>${obj[num].artist}</p>
                    </span>
                    <span>
                        <i class="fa  fa-calendar"> 발매일</i> 
                        <p>${obj[num].release}</p>
                    </span>
                    <span>
                        <i class="fa fa-money"> 가격</i>
                        <p>${obj[num].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    </span>
                    <span class="shopbtn">
                        <button class="btn btn-default btn-xs addBtn${num}" onclick="addBtn(this)">
                            <i class="fa fa-shopping-cart"></i> 쇼핑카트담기
                        </button>
                    </span>
                </div>
            </div>
        </div>
    `;
}

function contextInnerCopy(num) {
    contents.innerHTML += `
        <div class="col-md-2 col-sm-2 col-xs-2 product-grid">
            <div class="product-items">
                    <div class="project-eff">
                        <img class="img-responsive" src="images/${obj[num].albumJaketImage}" alt="Time for the moon night">
                    </div>
                <div class="produ-cost">
                    <h5>${obj[num].albumName}</h5>
                    <span>
                        <i class="fa fa-microphone"> 아티스트</i> 
                        <p>${obj[num].artist}</p>
                    </span>
                    <span>
                        <i class="fa  fa-calendar"> 발매일</i> 
                        <p>${obj[num].release}</p>
                    </span>
                    <span>
                        <i class="fa fa-money"> 가격</i>
                        <p>${obj[num].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    </span>
                    <span class="shopbtn">
                        <button class="btn btn-default btn-xs addBtn${num}" onclick="addBtn(this)">
                            추가하기
                        </button>
                    </span>
                </div>
            </div>
        </div>
    `;
}

function HighRightName(num, searchVal , searchArr) {
    contents.innerHTML += `
        <div class="col-md-2 col-sm-2 col-xs-2 product-grid">
            <div class="product-items">
                    <div class="project-eff">
                        <img class="img-responsive" src="images/${obj[num].albumJaketImage}" alt="Time for the moon night">
                    </div>
                <div class="produ-cost">
                    <h5><p style="display:inline;">${searchArr[0]}<span style="background-color: yellow; display:inline;">${searchVal}</span>${searchArr[1]}</p></h5>
                    <span>
                        <i class="fa fa-microphone"> 아티스트</i> 
                        <p>${obj[num].artist}</p>
                    </span>
                    <span>
                        <i class="fa  fa-calendar"> 발매일</i> 
                        <p>${obj[num].release}</p>
                    </span>
                    <span>
                        <i class="fa fa-money"> 가격</i>
                        <p>${obj[num].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    </span>
                    <span class="shopbtn">
                        <button class="btn btn-default btn-xs addBtn${num}" onclick="addBtn(this)">
                            <i class="fa fa-shopping-cart"></i> 쇼핑카트담기
                        </button>
                    </span>
                </div>
            </div>
        </div>
    `;
}

function HighRightArtist(num, searchVal , searchArr) {
    contents.innerHTML += `
        <div class="col-md-2 col-sm-2 col-xs-2 product-grid">
            <div class="product-items">
                    <div class="project-eff">
                        <img class="img-responsive" src="images/${obj[num].albumJaketImage}" alt="Time for the moon night">
                    </div>
                <div class="produ-cost">
                    <h5>${obj[num].albumName}</h5>
                    <span>
                        <i class="fa fa-microphone"> 아티스트</i> 
                        <p>${searchArr[0]}<span style="background-color: yellow; display:inline;">${searchVal}</span>${searchArr[1]}</p>
                    </span>
                    <span>
                        <i class="fa  fa-calendar"> 발매일</i> 
                        <p>${obj[num].release}</p>
                    </span>
                    <span>
                        <i class="fa fa-money"> 가격</i>
                        <p>${obj[num].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    </span>
                    <span class="shopbtn">
                        <button class="btn btn-default btn-xs addBtn${num}" onclick="addBtn(this)">
                            <i class="fa fa-shopping-cart"></i> 쇼핑카트담기
                        </button>
                    </span>
                </div>
            </div>
        </div>
    `;
}

// 추가 버튼

function addBtn(ev) {
    let location = ev.classList[3].split("addBtn")[1];
    if(ev.innerHTML == "추가하기") {

        let val = document.querySelector(`.numchange${location}`);
        let valplus = Number(val.value)+1;
        let itvalue = document.querySelector(`.prisum${location}`);

        val.value = valplus;
        itvalue.innerHTML = `
            <p>${valplus}</p>
        `
        sum[location] = Number(obj[location].price.split("원")[0] * valplus) ;
        Total()
        localStorage.setItem(`itemvalue${location}`, `${valplus}`);
    }
    else {
        addItem(location);
        localArr[localArr.length] = location;
    }

}

//아이템 추가

function addItem(num, val) {
    const tbody = document.querySelector("#itemTable");
    if(val == undefined) {
        val = 1;
    }
    sum[num] = (Number(obj[num].price.split("원")[0] * val));
    tbody.innerHTML += `
        <tr class="tr${num}">
            <td class="albuminfo">
                <img src="images/${obj[num].albumJaketImage}">
                <div class="info">
                    <h4>${obj[num].albumName}</h4>
                    <span>
                        <i class="fa fa-microphone"> 아티스트</i> 
                        <p>${obj[num].artist}</p>
                    </span>
                    <span>
                        <i class="fa  fa-calendar"> 발매일</i> 
                        <p>${obj[num].release}</p>
                    </span>
                </div>
            </td>
            <td class="albumprice">
                ${obj[num].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </td>
            <td class="albumqty">
                <input type="number" class="form-control numchange${num}" value="${val}" min="1" onchange="NumChange(this)">
            </td>
            <td class="pricesum prisum${num}">
                <p>${val}</p>
            </td>
            <td>
                <button class="btn btn-default del${num}" onclick="Delete(this)">
                    <i class="fa fa-trash-o"></i> 삭제
                </button>
            </td>
        </tr>
    `;
    itemcnt++;
    ShoppingBtn();
    Total(val);
    localStorage.setItem(`item${num}`, `${num}`);
    let plus = document.querySelector(`.shopbtn > .addBtn${num  }`);
    plus.innerHTML = "추가하기";
}


// 합

function Total(ev) {
    const total = document.querySelector(".total");
    hap = 0;
    for(let i = 0; i < sum.length; i++) {
        if(sum[i] != undefined) {
            hap += Number(sum[i]);
        }
    }
    hap = hap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');;
    total.innerHTML = `
        <h3>총 합계금액 : <span>${hap}</span> 원</h3>
    `;
    ShoppingBtn()
}

// 바뀐 숫자
function NumChange(ev) {
    let changeNum = ev.value;
    let inputnum = ev.classList[1].split("numchange")[1];
    let itvalue = document.querySelector(`.prisum${inputnum}`);
    itvalue.innerHTML = `
        <p>${changeNum}</p>
    `
    sum[inputnum] = Number(obj[inputnum].price.split("원")[0] * changeNum) ;
    Total()
    localStorage.setItem(`itemvalue${inputnum}`, `${changeNum}`);
}


// 쇼핑하기
function ShoppingBtn() {
    let shopbtn = document.querySelector(".btn-lg");
    hap = 0;
    for(let i = 0; i < sum.length; i++) {
        if(sum[i] != undefined) {
            hap += Number(sum[i]);
        }
    }
    hap = hap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    shopbtn.innerHTML = `
        <i class="fa fa-shopping-cart"></i> 쇼핑카트 <strong>${itemcnt}</strong> 개 금액 ￦ ${hap}원</a> 
    `;
}

// 삭제
function Delete(ev) {
    let value = confirm("정말 삭제 하시겠습니까?");
        if(value == 1) {
        let delclass = ev.classList[2].split("del")[1];
        let del = document.querySelector(`.tr${delclass}`);
        del.remove();
        sum[delclass] = 0;
        itemcnt--;
        Total();
        ShoppingBtn();
        localStorage.removeItem(`item${delclass}`);
        localStorage.removeItem(`itemvalue${delclass}`);
        let plus = document.querySelector(`.shopbtn > .addBtn${localArr[delclass]}`);
        plus.innerHTML = `<i class="fa fa-shopping-cart"></i> 쇼핑카트담기`;
        
        
    }
}

// 더보기
function MoreBtn() {
    contents.innerHTML += `
        <button style="transform: translateX(38vw); width:6vw; height:4vh; outline:none; font-size:22px;" id="more">More...</button>
    `
    clickcnt++
}

// 결제
let pry = document.querySelector(".modal-footer > .btn-primary");

pry.addEventListener('click', (e) => {
    alert("결제가 완료되었습니다.");
    const tbody = document.querySelector("#itemTable");
    tbody.replaceChildren()
    for(let k = 0; k < obj.length; k++) {
        sum[k] = 0;
        itmeArr[k] = 0;
        itemcnt = 0;
        clickcnt = 0;
    }
    Total();
    localStorage.clear();

    let list = document.querySelector(".active-menu");
    let ev = list.textContent;
    ChangeTitle(ev);
})

// 검색

let searchInput = document.querySelector(".input-group > .form-control");
let searchBtn = document.querySelector(".input-group-btn > button");
let searchVal = "";

searchBtn.addEventListener('click', () => {
    contents.innerHTML = ``;
    searchVal = searchInput.value;
    let checkCnt = 0;
    for(let i = 0; i < obj.length; i++) {
        // console.log(obj[i].artist);
        // console.log(obj[i].artist.lastIndexOf(`${}`));
        if(obj[i].artist.split(`${searchVal}`).length >= 2) {
            HighRightArtist(i , searchVal, obj[i].artist.split(`${searchVal}`) );
            checkCnt++;
        }
        else if(obj[i].albumName.split(`${searchVal}`).length >= 2) {
            HighRightName(i, searchVal, obj[i].albumName.split(`${searchVal}`));
            checkCnt++;
        } 
    }
    if(checkCnt < 1){
        contents.innerHTML =
         `<p style="color:red; font-size:30px;">검색 결과가 없습니다.</p>`
    }
})
