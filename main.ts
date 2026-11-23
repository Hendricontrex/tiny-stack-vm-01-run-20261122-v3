import{readFileSync as f,readdirSync as d,mkdirSync as m,writeFileSync as w}from'node:fs';
let I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output',
T=' 1a$&*+/~~~~~~~~)))))))%)))%)))~)))~~~~~~~~~~~~~@DD@ ~~~~~~~~~~~%(~~~~~~~~~~~~~~$$!$';
for(let n of d(I).sort()){
let P=f(I+'/'+n+'/program.bin'),B=f(I+'/'+n+'/input.bin'),L=P.length,
S=new Int32Array(256),s=0,C=new Int32Array(64),c=0,M=new Int32Array(256),
U=new Uint8Array(65536),u=0,j=0,p=0,q=0,e=0,a=0,b=0,r=0,t=0,g='';
A:for(;;){
if(q==1e6){e=10;break}
if(p<0||p>=L){e=9;break}
let o=P[p];
if(o>83){e=5;break}
let v=T.charCodeAt(o)-32,im=v>>4,pp=(v>>2)&3,pu=v&3;
if(im>4){e=5;break}
if(p+im>=L){e=9;break}
q++;
if(s<pp){e=2;break}
if(s-pp+pu>256){e=3;break}
let x=p+1+im;p=x;
switch(o){
case 0:break A;
case 1:S[s++]=(P[x-1]<<24)>>24;break;
case 2:S[s++]=P[x-4]|P[x-3]<<8|P[x-2]<<16|P[x-1]<<24;break;
case 3:s--;break;
case 4:S[s]=S[s-1];s++;break;
case 5:t=S[s-1];S[s-1]=S[s-2];S[s-2]=t;break;
case 6:S[s]=S[s-2];s++;break;
case 7:a=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=a;break;
case 23:S[s-1]=-S[s-1]|0;break;
case 27:S[s-1]=~S[s-1];break;
case 48:p=x+(((P[x-2]|P[x-1]<<8)<<16)>>16);break;
case 49:case 50:if((o==49)==(S[--s]==0))p=x+(((P[x-2]|P[x-1]<<8)<<16)>>16);break;
case 51:if(c==64){e=7;break A}C[c++]=x;p=P[x-2]|P[x-1]<<8;break;
case 52:if(!c){e=8;break A}p=C[--c];break;
case 64:a=S[s-1];if(a<0||a>255){e=6;break A}S[s-1]=M[a];break;
case 65:a=S[s-1];b=S[s-2];if(a<0||a>255){e=6;break A}s-=2;M[a]=b;break;
case 80:g=''+S[s-1];if(u+g.length>65536){e=11;break A}for(let k of g)U[u++]=k.charCodeAt(0);s--;break;
case 81:if(u+1>65536){e=11;break A}U[u++]=S[--s]&255;break;
case 82:S[s++]=j<B.length?B[j++]:-1;break;
case 83:e=S[--s]&255;break A;
default:
b=S[s-1];a=S[s-2];
r=o==16?(a+b)|0:o==17?(a-b)|0:o==18?Math.imul(a,b):o==19?b?(a/b)|0:(e=4):o==20?b?a%b|0:(e=4):o==21?b?(a>>>0)/(b>>>0)|0:(e=4):o==22?b?(a>>>0)%(b>>>0)|0:(e=4):o==24?a&b:o==25?a|b:o==26?a^b:o==28?a<<(b&31):o==29?a>>(b&31):o==30?(a>>>(b&31))|0:o==32?a==b?1:0:o==33?a<b?1:0:a>>>0<b>>>0?1:0;
if(e)break A;
s-=2;S[s++]=r;
}
}
m(O+'/'+n,{recursive:true});
w(O+'/'+n+'/stdout.bin',U.subarray(0,u));
w(O+'/'+n+'/exit.txt',e+'\n');
}
