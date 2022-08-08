
let api = 'https://localhost:5001/api/Infoes/'
let LocalTask = { id: "", task: "", check: false }
let listDOM = document.querySelector("#list")
let userTaskDOM = document.querySelector('#userTask')
const form = document.getElementById('userTask');
form.addEventListener('submit', formHandler)




function getList(api) {

    fetch(api)
        .then((response) => response.json())
        .then((data) => {
            listDOM.innerHTML = "";



            data.forEach(element => {
                if (element['check'] == false) {

                    // onclick="checkTrade(${element['id']},${element['check']},${element['note']},${element['date']})"
                    listDOM.innerHTML += `<li>${element['note']} <div onclick = "checkTrade('${element['id']}', '${element['check']}', '${element['note']}', '${element['date']}')"${element['note']} class= " dateClass"> ${element['date']} </div>  
                    
                    
                    <button
            class="close"
            style="width: 50px; height: 50px; text-align: center;"
            onClick="deleteList(${element['id']})"
            >x
            </button>
            </li>`
                } else {
                    listDOM.innerHTML += `<li class="checked">${element['note']} <div onclick = "checkTrade('${element['id']}', '${element['check']}', '${element['note']}', '${element['date']}')"${element['note']} class= " dateClass"> ${element['date']} </div>   
                    
                    
                    <button
            class="close"
            style="width: 50px; height: 50px; text-align: center;"
            onClick="deleteList(${element['id']})"
            >x
            </button>
            </li>`
                }

            });

            
        });

}
// Listeyi getirme
getList(api);






function formHandler(event) {
    event.preventDefault();
    const TASK = document.querySelector("#task")    //Kutudaki bilginin atanması

    if (TASK.value.trim() == "") {   //"input" değeri boş ise "toast" bildirimi ile
        $(".error").toast("show");  //"Listeye boş ekleme yapamazsınız!" bildirimini göster
    }
    else {
        addItem(TASK.value)          //Bilgi ekleme fonksiyonunu çalıştır

        TASK.value = ""              //Gonderdikten sonra "input" sıfırlama
        $(".success").toast("show"); //"Bilgi eklendi" bildirimini göster
    }

}
function tarihSaat() {
    var tarih = new Date();
    var yil = tarih.getFullYear();
    var ay = tarih.getMonth();
    var gun = tarih.getDay();
    var saat = tarih.getHours();
    var dakika = tarih.getMinutes();
    var saniye = tarih.getSeconds();
    return tarih.toLocaleString();

}

//Eleman ekleme
function addItem(input) {

    let date = tarihSaat()
    let note = input


    let data = {

        date: date,
        note: note,
        check: false
    }

    fetch(api, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)

    })
        .then(response => response.json())
        .then(data => {

            getList(api)

        })



}

//deleteList()
function deleteList(j) {
    console.log(j);
    fetch(api + j, {
        method: "DELETE",
        headers: {
            'content-type': 'application/json'
        }

    })
        .then(response => console.log(response))

        .then(data => {



            getList(api)
        })


}

function checkTrade(id, check, note, date) {
    console.log(id);
    console.log(check);
    console.log(note);
    console.log(date);
    
    check = check === 'true' ? false : true;
    let data = {
        check: check,
        id: id,
        date: date,
        note: note
    }
    fetch(api + id, {
        method: "PUT",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => console.log(response))

        .then(data => {



            getList(api)
        })
}





