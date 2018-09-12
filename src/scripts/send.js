function sendMail() {
    var adress, contact, ad, domain;

    var elem = document.getElementById("sendMailAnchor");
    contact = "kontakt";
	ad = "@";
    domain = "musikanalyse.net";
    adress = contact + ad + domain;
    elem.href = "mailto:" + adress;  
    return false;
}