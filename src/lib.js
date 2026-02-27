//export const APIURL = "http://localhost:5000/";
export const IMGURL = import.meta.env.BASE_URL;
export const APIURL = "https://p007-beckend.onrender.com/";
  
export function callApi(rmethod, url, data, responseHandler)
{
    console.log("API Call:", rmethod, url);
    let options = (rmethod === "GET" || rmethod === "DELETE")? {method: rmethod, headers: {'Content-Type' : 'application/json'}} : {method: rmethod, headers: {'Content-Type' : 'application/json'}, body: data};
    fetch(url, options)
        .then((response) => {
            console.log("Response Status:", response.status);
            if(!response.ok)
                throw new Error(response.status + ": " + response.statusText);
            return response.json();
        })
        .then((res) => {
            console.log("Success Response:", res);
            responseHandler(res);
        })
        .catch((err) => {
            console.error("API Error:", err);
            alert(err.message);
        });
}