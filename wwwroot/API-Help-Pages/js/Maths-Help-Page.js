//Afficher tests:
import { webAPI_getMaths } from "./utils.js";

let url = "";
let nbErreur;
$("#start").on("click", ()=>{
    url = $("#url").val()+"/api/maths";
    Init_test();
});
async function Init_test() {
    await renderTests((res)=>{renderVerdict(res);})
}
async function renderTests(callback) {
    nbErreur = 0
    await renderTest(0,"?op=+&x=-111&y=-244", -355,(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(1,"?op=-&x=1&y=abc", "y parameter is not a number",(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(2,"?n=a&op=p", "n parameter is not a number",(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(3,"?op=-&x=111&y=244",-133,(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(4,"?op=*&x=11.56&y=244.12345", 2822.067082,(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(5,"?op=/&x=99&y=11.06", 8.95117540687161,(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(6,"?op=/&x=99&y=0", Infinity,(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(7,"?op=/&x=0&y=0", "NaN",(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(8,"?op=%&x=5&y=5", 0,(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(9,"?op=%&x=100&y=13",9,(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(10,"?op=%&x=100&y=0", "NaN",(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(11,"?op=%&x=0&y=0", "NaN",(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(12,"?n=0&op=!", "n parameter must be an integer > 0",(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(13,"?n=0&op=p", "n parameter must be an integer > 0",(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(14,"?n=1&op=p", false,(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(15, "?n=2&op=p", true,(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(16, "?n=5&op=p", true,(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(17, "?n=6&op=p", false,(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(18, "?n=6.5&op=p", "n parameter must be an integer > 0",(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(19, "?n=113&op=p", true,(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(20, "?n=114&op=p", false,(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(21, "?n=1&op=np", 2,(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(22, "?n=30&op=np", 113,(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(23, "?X=111&op=+&y=244", "x parameter is missing",(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(24, "?Y=244&op=+&x=111", "y parameter is missing",(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(25, "?op=+&x=111&y=244&z=0", "too many parameters",(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(26, "?n=5&op=!&z=0", "too many parameters",(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(27, "?n=5.5&op=!", "n parameter must be an integer > 0",(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(28, "?z=0", "'op' parameter is missing",(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(29, "?n=-5&op=!", "n parameter must be an integer > 0",(res)=>{if(res == "Error") nbErreur+=1;});
    await renderTest(30, "?x=", "'op' parameter is missing",(res)=>{if(res == "Error") nbErreur+=1; callback(nbErreur);});
    
    console.log("Avant callbacck : ",nbErreur);
    callback(nbErreur);
}
async function renderTest(id, queryString, valueServeur, callback) {
    let statusReponse = "";
    await webAPI_getMaths(url,queryString, (res)=>{
        let clé = Object.keys(res)[0];
        let val = res[clé];
        if (val == valueServeur){
            statusReponse = "OK";
        }
        else{
            statusReponse = "Error";
            //nbErreur += 1;
            console.log(nbErreur);
        }
        $("#content").append(`
         <tr test_id=${id}">
            <td>
                    ${statusReponse} ---> {"queryString : ${queryString} ${clé} : ${val}"}
            </td>
         </tr>           
        `);
        callback(statusReponse);
    })
}
function renderVerdict(nbErreur){
    console.log(nbErreur);
    if(nbErreur <= 0){
        $("#verdict").html("<p>Bravo !!! Aucun problèmes </p>")
    }
    else{
        $("#verdict").html(`<p>Ishhhhhh !!! Il y a ${nbErreur} erreur(s) </p>`)
    }
}
