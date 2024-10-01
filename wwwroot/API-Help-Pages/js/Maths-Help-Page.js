//Afficher tests:
import queryString from "query-string";
import { webAPI_getMaths } from "../utils.js";

Init_test();

function Init_test() {
    renderTests();

}
async function renderTests() {
    showWaitingGif();
    $("#content").append(renderTest(0,"?op=+&x=7&y=6", 13));
    $("#content").append(renderTest(0,"?op=+&x=7&y=6", 13));
    $("#content").append(renderTest(0,"?op=+&x=7&y=6", 13));
    $("#content").append(renderTest(0,"?op=+&x=7&y=6", 13));
    $("#content").append(renderTest(0,"?op=+&x=7&y=6", 13));
    $("#content").append(renderTest(0,"?op=+&x=7&y=6", 13));
    $("#content").append(renderTest(0,"?op=+&x=7&y=6", 13));
    $("#content").append(renderTest(0,"?op=+&x=7&y=6", 13));
    $("#content").append(renderTest(0,"?op=+&x=7&y=6", 13));
}
function renderBookmark(id, queryString, valueServeur) {
    let statusReponse = "";
    await webAPI_getMaths("127.0.0.1:5000/api/maths",queryString,valeurReponse)
    if (valeurReponse == valueServeur){
        statusReponse = "OK";
    }
    else{
        statusReponse = "Error";
    }
    return $(`
     <span class="testRow" test_id=${id}">
        ${statusReponse} ---> {"queryString : ${queryString}"}
     </span>           
    `);
}
function showWaitingGif() {
    $("#content").empty();
    $("#content").append($("<div class='waitingGifcontainer'><img class='waitingGif' src='Loading_icon.gif' /></div>'"));
}