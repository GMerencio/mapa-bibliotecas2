/* Arquivo de customização do HTML gerado pelo Swagger. */

const customize = function() {
    let servers = document.getElementsByClassName('servers-title');
    for (let el of servers) {
    	el.textContent = "Servidores";
    }
};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    customize();
} else {
    document.addEventListener("DOMContentLoaded", customize);
}