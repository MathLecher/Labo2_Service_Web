import Repository from '../models/repository.js';
import Model from '../models/model.js';
import Controller from './Controller.js';
import { factorial, isPrime, findPrime } from '../mathUtilities.js';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new Model));
    }
    get(){
        let params =  this.HttpContext.path.params
        if(params == null || params == undefined){
            params = {};
        }
        if(Object.keys(params).length == 0){
            let contenue = "<h1> GET : Maths endpoint <br> List of possible query strings : </h1>";
            contenue += "<br> <hr> <br>";
            contenue += "<p>"
            contenue += "? op = + & x = number & y = number <br> return {\"op\":\"+\", \"x\":number, \"y\":number, \"value\": x + y} <br>";
            contenue += "? op = - & x = number & y = number <br> return {\"op\":\"-\", \"x\":number, \"y\":number, \"value\": x - y} <br>";
            contenue += "? op = * & x = number & y = number <br> return {\"op\":\"*\", \"x\":number, \"y\":number, \"value\": x * y} <br>";
            contenue += "? op = / & x = number & y = number <br> return {\"op\":\"/\", \"x\":number, \"y\":number, \"value\": x / y} <br>";
            contenue += "? op = % & x = number & y = number <br> return {\"op\":\"%\", \"x\":number, \"y\":number, \"value\": x % y} <br>";
            contenue += "? op = ! & n = integer <br> return {\"op\":\"%\", \"n\":integer, \"value\": n!} <br>";
            contenue += "? op = p & n = integer <br> return {\"op\":\"p\", \"n\":integer, \"value\": true if n is a prime number} <br>";
            contenue += "? op = np & n = integer <br> return {\"op\":\"n\", \"n\":integer, \"value\": nth prime number} <br>";
            contenue += "</p>"

            this.HttpContext.response.HTML(contenue);
        }
        else{
            if (params["op"] === null || params["op"] === undefined){ //no 'op' param
                this.HttpContext.response.JSON({error: "'op' parameter is missing"});
            }
            else if (params["op"] === "!" || params["op"] === "p" || params["op"] === "np"){
                if (Object.keys(params).length > 2){ //max 2 params pour ces opérations (op, n)
                    this.HttpContext.response.JSON({error: "too many parameters"});
                }
                else if (params["n"] === null || params["n"] === undefined){ //no 'n' param
                    this.HttpContext.response.JSON({error: "n parameter is missing"});
                }
                else{
                    //valider 'n'
                    if (isNaN(params["n"])){
                        this.HttpContext.response.JSON({error: "n parameter is not a number"});
                    }
                    else if (!Number.isInteger(Number(params["n"])) || Number(params["n"]) <= 0){
                        this.HttpContext.response.JSON({error: "n parameter must be an integer > 0"});
                    }
                    else{ //tout est valide
                        if (params["op"] === "!"){
                            this.HttpContext.response.JSON({value: factorial(Number(params["n"]))});
                        }
                        else if (params["op"] === "p"){
                            this.HttpContext.response.JSON({value: isPrime(Number(params["n"]))});
                        }
                        else{ //np
                            this.HttpContext.response.JSON({value: findPrime(Number(params["n"]))});
                        }
                    }
                }
            }
            else if (params["op"] === " " /* + */ || params["op"] === "-" || params["op"] === "*" || params["op"] === "/" || params["op"] === "%"){
                if (Object.keys(params).length > 3){ //max 3 params pour les autres opérations (op, x, y)
                    this.HttpContext.response.JSON({error: "too many parameters"});
                }
                else if (params["x"] === null || params["x"] === undefined){ //no 'x' param
                    this.HttpContext.response.JSON({error: "x parameter is missing"});
                }
                else if (isNaN(params["x"])){ //valider x
                    this.HttpContext.response.JSON({error: "x parameter is not a number"});
                }
                else if (params["y"] === null || params["y"] === undefined){ //no 'y' param
                    this.HttpContext.response.JSON({error: "y parameter is missing"});
                }
                else if (isNaN(params["y"])){ //valider y
                    this.HttpContext.response.JSON({error: "y parameter is not a number"});
                }
                else{ //tout est valide
                    if (params["op"] === " "){ //+
                        this.HttpContext.response.JSON({value: Number(params["x"]) + Number(params["y"])+""});
                    }
                    else if (params["op"] === "-"){ //+
                        this.HttpContext.response.JSON({value: Number(params["x"]) - Number(params["y"])+""});
                    }
                    else if (params["op"] === "*"){ //+
                        this.HttpContext.response.JSON({value: Number(params["x"]) * Number(params["y"])+""});
                    }
                    else if (params["op"] === "/"){ //+
                        this.HttpContext.response.JSON({value: Number(params["x"]) / Number(params["y"])+""});
                    }
                    else{ //%
                        this.HttpContext.response.JSON({value: Number(params["x"]) % Number(params["y"])+""});
                    }
                }
            }
            else{ //op param invalid
                this.HttpContext.response.JSON({value: "'op' parameter invalid"});
            }
        }
    }
    post(){
        this.HttpContext.response.notImplemented("POST is not implemented");
    }
    put(){
        this.HttpContext.response.notImplemented("PUT is not implemented");
    }
    remove(){
        this.HttpContext.response.notImplemented("REMOVE is not implemented");
    }
}