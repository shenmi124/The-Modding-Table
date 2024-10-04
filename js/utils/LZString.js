// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.5 beta
// private property
var LZString=function(){function n(n,e){if(!r[n]){r[n]={}
for(var o=0;o<n.length;o++)r[n][n[o]]=o}return r[n][e]}var e=String.fromCharCode,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",r={},i=function(){return new Map}
if("undefined"==typeof Map){var s=function(){this.data={}}
s.prototype.get=function(n){return this.data.hasOwnProperty(n)?this.data[n]:null},s.prototype.set=function(n,e){this.data[n]=e},s.prototype.has=function(n){return this.data.hasOwnProperty(n)},s.prototype["delete"]=function(n){delete this.data[n]},i=function(){return new s}}var u={compressToBase64:function(n){if(null==n)return""
var e=u._compress(n,6,function(n){return o.charAt(n)})
switch(e.length%4){default:case 0:return e
case 1:return e+"==="
case 2:return e+"=="
case 3:return e+"="}},decompressFromBase64:function(e){return null==e?"":""==e?null:u._decompress(e.length,32,function(t){return n(o,e.charAt(t))})},compressToUTF16:function(n){return null==n?"":u._compress(n,15,function(n){return e(n+32)})+" "},decompressFromUTF16:function(n){return null==n?"":""==n?null:u._decompress(n.length,16384,function(e){return n.charCodeAt(e)-32})},compressToUint8Array:function(n){for(var e=u.compress(n),o=new Uint8Array(2*e.length),t=0,r=e.length;r>t;t++){var i=e.charCodeAt(t)
o[2*t]=i>>>8,o[2*t+1]=i%256}return o},decompressFromUint8Array:function(n){if(null===n||void 0===n)return u.decompress(n)
for(var o=new Array(n.length/2),t=0,r=o.length;r>t;t++)o[t]=256*n[2*t]+n[2*t+1]
var i=[]
return o.forEach(function(n){i.push(e(n))}),u.decompress(i.join(""))},compressToEncodedURIComponent:function(n){return null==n?"":u._compress(n,6,function(n){return t.charAt(n)})},decompressFromEncodedURIComponent:function(e){return null==e?"":""==e?null:(e=e.replace(/ /g,"+"),u._decompress(e.length,32,function(o){return n(t,e.charAt(o))}))},compress:function(n){return u._compress(n,16,function(n){return e(n)})},_compress:function(n,e,o){if(null==n)return""
var t,r,s,u=i(),a=i(),p="",c="",f="",l=2,h=3,d=2,m=[],v=0,g=0
for(s=0;s<n.length;s+=1)if(p=n[s],u.has(p)||(u.set(p,h++),a.set(p,!0)),c=f+p,u.has(c))f=c
else{if(a.has(f)){if(f.charCodeAt(0)<256){for(t=0;d>t;t++)v<<=1,g==e-1?(g=0,m.push(o(v)),v=0):g++
for(r=f.charCodeAt(0),t=0;8>t;t++)v=v<<1|1&r,g==e-1?(g=0,m.push(o(v)),v=0):g++,r>>=1}else{for(r=1,t=0;d>t;t++)v=v<<1|r,g==e-1?(g=0,m.push(o(v)),v=0):g++,r=0
for(r=f.charCodeAt(0),t=0;16>t;t++)v=v<<1|1&r,g==e-1?(g=0,m.push(o(v)),v=0):g++,r>>=1}l--,0==l&&(l=Math.pow(2,d),d++),a["delete"](f)}else for(r=u.get(f),t=0;d>t;t++)v=v<<1|1&r,g==e-1?(g=0,m.push(o(v)),v=0):g++,r>>=1
l--,0==l&&(l=Math.pow(2,d),d++),u.set(c,h++),f=String(p)}if(""!==f){if(a.has(f)){if(f.charCodeAt(0)<256){for(t=0;d>t;t++)v<<=1,g==e-1?(g=0,m.push(o(v)),v=0):g++
for(r=f.charCodeAt(0),t=0;8>t;t++)v=v<<1|1&r,g==e-1?(g=0,m.push(o(v)),v=0):g++,r>>=1}else{for(r=1,t=0;d>t;t++)v=v<<1|r,g==e-1?(g=0,m.push(o(v)),v=0):g++,r=0
for(r=f.charCodeAt(0),t=0;16>t;t++)v=v<<1|1&r,g==e-1?(g=0,m.push(o(v)),v=0):g++,r>>=1}l--,0==l&&(l=Math.pow(2,d),d++),a["delete"](f)}else for(r=u.get(f),t=0;d>t;t++)v=v<<1|1&r,g==e-1?(g=0,m.push(o(v)),v=0):g++,r>>=1
l--,0==l&&(l=Math.pow(2,d),d++)}for(r=2,t=0;d>t;t++)v=v<<1|1&r,g==e-1?(g=0,m.push(o(v)),v=0):g++,r>>=1
for(;;){if(v<<=1,g==e-1){m.push(o(v))
break}g++}return m.join("")},decompress:function(n){return null==n?"":""==n?null:u._decompress(n.length,32768,function(e){return n.charCodeAt(e)})},_decompress:function(n,o,t){var r,s,u,a,p,c,f,l,h=i(),d=4,m=4,v=3,g="",w=[],A={val:t(0),position:o,index:1}
for(s=0;3>s;s+=1)h.set(s,s)
for(a=0,c=Math.pow(2,2),f=1;f!=c;)p=A.val&A.position,A.position>>=1,0==A.position&&(A.position=o,A.val=t(A.index++)),a|=(p>0?1:0)*f,f<<=1
switch(r=a){case 0:for(a=0,c=Math.pow(2,8),f=1;f!=c;)p=A.val&A.position,A.position>>=1,0==A.position&&(A.position=o,A.val=t(A.index++)),a|=(p>0?1:0)*f,f<<=1
l=e(a)
break
case 1:for(a=0,c=Math.pow(2,16),f=1;f!=c;)p=A.val&A.position,A.position>>=1,0==A.position&&(A.position=o,A.val=t(A.index++)),a|=(p>0?1:0)*f,f<<=1
l=e(a)
break
case 2:return""}for(h.set(3,l),u=l,w.push(l);;){if(A.index>n)return""
for(a=0,c=Math.pow(2,v),f=1;f!=c;)p=A.val&A.position,A.position>>=1,0==A.position&&(A.position=o,A.val=t(A.index++)),a|=(p>0?1:0)*f,f<<=1
switch(l=a){case 0:for(a=0,c=Math.pow(2,8),f=1;f!=c;)p=A.val&A.position,A.position>>=1,0==A.position&&(A.position=o,A.val=t(A.index++)),a|=(p>0?1:0)*f,f<<=1
h.set(m++,e(a)),l=m-1,d--
break
case 1:for(a=0,c=Math.pow(2,16),f=1;f!=c;)p=A.val&A.position,A.position>>=1,0==A.position&&(A.position=o,A.val=t(A.index++)),a|=(p>0?1:0)*f,f<<=1
h.set(m++,e(a)),l=m-1,d--
break
case 2:return w.join("")}if(0==d&&(d=Math.pow(2,v),v++),h.get(l))g=h.get(l)
else{if(l!==m)return null
g=u+u[0]}w.push(g),h.set(m++,u+g[0]),d--,u=g,0==d&&(d=Math.pow(2,v),v++)}}}
return u}()
"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString)
