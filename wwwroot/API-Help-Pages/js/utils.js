export async function webAPI_getMaths(host, querystring, callback){
    $.get(
        host + querystring,
        function(data) {
            callback(data);
        }
    )
}