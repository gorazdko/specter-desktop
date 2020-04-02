// This lib requires qrcode.min.js; source: https://github.com/davidshimjs/qrcodejs

class QRAnim {
/**
 * @param[in] name:  name of the variable that instantiated this class (QRAnim)
 * @param[in] width: qr width: width for normal qr, animated qr will be smaller
 *			       as it needs to leave space for buttons
 *	      		       @note: normal qr is qr_animated of
 *			       length 1 without "p1of1"
 * @param[in] qr_animated:
 *
 * ["p1of6 Multisig 5&wsh(sortedmulti(1,[f8720f8e/48h/1h/0h/2",
 * "p2of6 h]tpubDEwGuKMeWUefghYUSEvJkbzKN9hNLTWT56aCThafPMjY",
 * "p3of6 q2y9L7JQQSrNYx2FoTzFdzAtSHntnGNy4aeDjfLxJa7wKE5czu",
 * "p4of6 ExXWFzerNsiWo,[9d1dc604/48h/1h/0h/2h]tpubDEAMhNB9p",
 * "p5of6 UL6Ej2HuiJUU1TDMqHNxRKjGFxLfCB7cmxKjQKXNF4yR8CMpgD",
 * "p6of6 t5eh5V3XesKDUrcFHYDMz3u3ybWwHSAZZQLjiMAi4oKy6HEg))" ]
*/
constructor(qr_animated, width, name) {
this.objName = name
this.qrAnim = qr_animated
this.isQrAnimated = (qr_animated.length > 1)
this.width = width
this.id_qr = "qr_" + name
this.id_qr_div = name
this.id_qrindx = "qrindx_" + name
this.init()
this.qrcode = new QRCode(document.getElementById(this.id_qr), {
	text: this.qrAnim[0],
	width: this.width,
	height: this.width,
	colorDark : "#000000",
	colorLight : "#ffffff",
	correctLevel : QRCode.CorrectLevel.H});
this.indx = 0
if (this.isQrAnimated) {
document.getElementById(this.id_qrindx).innerHTML = "Part: 1" + " / " + this.qrAnim.length
}
}

hide() {
let t = document.getElementById(this.id_qr_div);
t.style.display = "none";
}

show() {
let t = document.getElementById(this.id_qr_div);
t.style.display = "flex";
}

qra_prev() {
 this.indx = this.indx - 1
 if (this.indx < 0) {
	this.indx = this.qrAnim.length - 1
}

this.qr_update(this.qrAnim[this.indx])

}

qra_next() {
this.indx = this.indx + 1
if (this.indx > this.qrAnim.length - 1) {
	this.indx = 0
}

this.qr_update(this.qrAnim[this.indx])
}

qr_update(txt) {
this.qrcode.clear();
this.qrcode.makeCode(txt);
if (this.isQrAnimated) {
document.getElementById(this.id_qrindx).innerHTML = "Part: " + (this.indx+1) + " / " + this.qrAnim.length
}
}

init() {
if (this.isQrAnimated) {
document.write("<div style='height: " + (this.width + 150) + "px' id='" + this.id_qr_div + "'> \
<table style='all:unset' > \
    <caption style='caption-side: bottom; font-size: 150%;' id='" + this.id_qrindx + "'></caption> \
    <tr style='all:unset'> \
        <td style='vertical-align: middle; border-bottom:unset; padding:10'><button id='btn_nxt' type='button' style='transform: rotate(180deg);' class='btn padded' onclick='" + this.objName + ".qra_prev()" + "'>&#10148;</button></td> \
        <td style='border-bottom:unset; padding:unset;'><div id='" + this.id_qr + "' class='qr padded'></div></td> \
        <td style='vertical-align: middle; border-bottom:unset; padding:10'><button type='button' class='padded btn' onclick='" + this.objName + ".qra_next()" + "'>&#10148;</button></td> \
</table><br/></div></br>"
);

} else {
document.write("<div style='height: " + (this.width + 80) + "px' id='" + this.id_qr_div + "'> \
<table style='all:unset' > \
    <caption style='caption-side: bottom; font-size: 150%;' id='" + this.id_qrindx + "'></caption> \
    <tr style='all:unset'> \
        <td style='border-bottom:unset;'></td> \
        <td style='border-bottom:unset; padding:unset;'><div id='" + this.id_qr + "' class='qr padded'></div></td> \
        <td style='border-bottom:unset;'></td> \
</table><br/></div></br>"
);
}
}
}
