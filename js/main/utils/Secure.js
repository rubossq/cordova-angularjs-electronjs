var Secure = Base.extend({
	
	hexdigits: '0123456789ABCDEF',
	hexLookup: Array(256),
	
	constructor: function(){
		for(var i=0;i<256;i++)
			this.hexLookup[i]=this.hexdigits.indexOf(String.fromCharCode(i));
	},
	
	/* encrypt Secure.key */
	encrypt: function(s){
		return this.bin2hex(
					mcrypt.Encrypt(
						s, Constant.SECURE_IV, Constant.SECURE_KEY, Constant.SECURE_CIPHER, Constant.SECURE_MODE
					)
			   );
	},
	
	/* decrypt Secure.key */
	decrypt: function(s){
		return mcrypt.Decrypt(
					this.hex2bin(s), Constant.SECURE_IV, Constant.SECURE_KEY, Constant.SECURE_CIPHER, Constant.SECURE_MODE
			   );
	},
	
	bin2hex: function(str){
		var out='';
		for(var i=0;i<str.length;i++)
			out+=this.hexdigits[str.charCodeAt(i)>>4]+this.hexdigits[str.charCodeAt(i)&15];
		return out;
	},

	hex2bin: function(str){
		var out='';
		var part=-1;
		for(var i=0;i<str.length;i++){
			var t=this.hexLookup[str.charCodeAt(i)]
			if(t>-1){
				if(part>-1){
					out+=String.fromCharCode(part|t);
					part=-1;
				}else
					part=t<<4;
			}
		}
		return out;
	}
	
	
});