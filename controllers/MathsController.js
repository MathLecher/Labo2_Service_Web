import Repository from '../models/repository.js';
import Model from '../models/model.js';
import Controller from './Controller.js';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new Model));
    }
    get(){
        let params =  this.HttpContext.path.params
        if(params /*Trouver une facon de vérifier params */ ){
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
        this.HttpContext.response.notImplemented("Just for return");
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