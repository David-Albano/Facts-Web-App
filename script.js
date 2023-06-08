const fact_form = document.getElementById("fact-form")
const btn_share = document.getElementById("btn-share")

btn_share.addEventListener("click", () => {
    hide_form()
})

function hide_form() {
    if (fact_form.style.display == "flex") {
        fact_form.style.display = "none"
        btn_share.innerHTML = "Share a fact"
    } else {
        fact_form.style.display = "flex"
        btn_share.innerHTML = "Close"
    }


}