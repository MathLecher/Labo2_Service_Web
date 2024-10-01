export async function webAPI_getMaths(host, querystring){
    $.get(
        host + querystring,
        function(data) {
            return data;
        }
    )
}