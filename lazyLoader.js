let dataFromApi = [];
let indexClicked = [];

// call to api
const getAllData = async () => {
    try {

        let response = await fetch('someurl');

        if (response.ok) {
            let responseToJson = await response.json();
            dataFromApi = responseToJson.data;
            showResultsInPage(responseToJson);
        }

    } catch(err) {
        console.log(err);
    }
}
getAllData();

// shows requests results on page
function showResultsInPage(results) {

    if (results.data) {

        results.data.forEach((n, index) => {
            
            resultsTable.tBodies[0].innerHTML += `<tr data-tr-index=${index}>
                    <td class="cell vert-align">${n.id}</td>
                    <td class="vert-align">${n.firstname}</td>
                    <td class="vert-align">${n.lastname}</td>
                    <td class="cell"><button onclick="showDetails(${index})" class="btn btn-primary"><i class="fa-solid fa-eye"></i></button></td>
                </tr>`;
        });

    }
}

const showDetails = (index) => {

    let trRows = document.querySelectorAll('[data-tr-index]');

    let detailsRow = document.createElement('tr');
    if (!indexClicked.includes(index)) {
        
        indexClicked.push(index);

        detailsRow.innerHTML = `<td class="cell-padding">
            <div class="flex-container details-cont">
                <div class="half-flex-col">
                    <h4 class="details"><strong>Lazy Row</strong></h4>
                    <p><strong>Some Data</strong>: ${dataFromApi[index].somedata ? dataFromApi[index].somedata : 'Non presente'}</p>
                    <p><strong>Another Data</strong>: ${dataFromApi[index].anotherdata ? dataFromApi[index].anotherdata : 'Non presente'}</p>
                    <p><strong>Yet Another Data</strong>: ${dataFromApi[index].yetanotherdata ? dataFromApi[index].yetanotherdata : 'Non presente'}</p>
                </div> 
            </div>
        </td>`;

        trRows[index].after(detailsRow);

    } else {
        indexClicked.splice(indexClicked.findIndex(clickIndex => clickIndex === index), 1);
        trRows[index].nextElementSibling.remove();

    }
}