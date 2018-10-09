function asciiAt(str, i){
	return str.charCodeAt(i)&0xFF;
}
function str2ascii(str){
	var ascii = "";
	for (var i = 0; i < str.length; i++) {
		ascii += str.charCodeAt(i).toString(16);
	}
	return ascii;
}
function hexToBytes(hex){
	var bytes = [];
    for (var c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}
function Repeat(s, n){
	var a = [];
	while(a.length < n)
	{
		a.push(s);
	}
	return a.join('');
}
function hexh2bin(hex_val){
	var str = "";
	var half = hex_val & 0xFFFF;
	str = half.toString(16);
	if (str.length < 3)
	{
		str = "%" + Repeat("0", 2 - str.length) + str;
	}
	else
	{
		str = "%u" + Repeat("0", 4 - str.length) + str;
	}
	return unescape(str);
}
function hexw2bin(hex_val){
	return "" + hexh2bin(hex_val) + "" + hexh2bin(hex_val >> 16);
}
function s2hex(str){
	var str_ret = '';
	for (var i = 0; i < str.length; i++)
	{
		if(str.charCodeAt(i)==0){
			str_ret+=hex8((str.charCodeAt(i) >>> 4).toString(16));
			str_ret+=hex8((str.charCodeAt(i) & 0xF).toString(16));
		}
		else
		{
			str_ret+=(str.charCodeAt(i) >>> 4).toString(16);
			str_ret+=(str.charCodeAt(i) & 0xF).toString(16);
		}
	}
	return str_ret;
}
function bytesToHex(str){
	var hex = [];
    for (var  i = 0; i < str.length; i++) {
		if(str.charCodeAt(i)==0){
			hex.push(hex8((str.charCodeAt(i) >>> 4).toString(16)));
			hex.push(hex8((str.charCodeAt(i) & 0xF).toString(16)));
		}
		else
		{
			hex.push((str.charCodeAt(i) >>> 4).toString(16));
			hex.push((str.charCodeAt(i) & 0xF).toString(16));
		}
    }
	return hex.join("");
}
function hex32(s){
	return ('00000000' + s).substr(-8);
}
function hex16(s){
	return ('0000' + s).slice(-4)
}
function hex8(s){
	return ('00' + s).substr(-2);
}
function sleep(milliseconds){
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function logEntry(){
		var _loggger = document.getElementById("log");
		if (!_loggger) return 0;
		var logger = document.createElement("div");
		if (_loggger.hasChildNodes()){
			_loggger.insertBefore(logger, _loggger.firstChild);
		}else{
			_loggger.appendChild(logger);
		}
		return logger;
}
function logAdd(txt,_log){
	if(!_log) return;
	var div = document.createElement("div");
	div.innerHTML = txt;
	_log.appendChild(div);
}
function writeEnvInfo(__log_div){
	logAdd("<h3>PS3 System Browser Info:</h3>",__log_div);
	logAdd("<br>"+navigator.userAgent + "<br>",__log_div);
	logAdd(navigator.appName + " (" + navigator.platform + ")<br>",__log_div);
	logAdd(new Date().toTimeString() + "<br>",__log_div);
}
function setCharAt(str,index,chr){
	if(index > str.length-1) return str;
	return str.substr(0,index) + chr + str.substr(index+1);
}
String.prototype.replaceAt=function(index, ch){
	return this.substr(0, index) + ch + this.substr(index+ch.length);
}