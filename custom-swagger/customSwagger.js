/* Arquivo de customização do HTML gerado pelo Swagger. */

const customize = function() {
    let servers = document.getElementsByClassName('servers-title');
    for (let el of servers) {
    	el.textContent = "Servidores";
    }
    
    let elem = document.createElement("div");
    elem.innerHTML =
        "<div style=\"text-align: center; font-family: Titillium Web,sans-serif; margin: 16px;\">This text was injected via /ext/custom-javascript.js, using the SwaggerUIOptions.InjectJavascript method.</div>";
    document.body.insertBefore(elem, document.body.firstChild);
};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    customize();
} else {
    document.addEventListener("DOMContentLoaded", customize);
}