import f from"node:fs";
let{MAKEFUN_INPUT_DIR:I,MAKEFUN_OUTPUT_DIR:O}=process.env,w,W,G,B,P,D,Q,R2,t=0,s=[],m=[],v=[],
R=(o,b,T,A)=>{let l=b,q=[b];T[b]=++t;A&&(A[b]=b);for(let p of q){if(p<l)l=p;for(let k=4;k--;){let c=p+D[k];if(!W[c]&&!o[c]&&T[c]!=t){T[c]=t;A&&(A[c]=p);q.push(c)}}}return l},
S=(g,b,p)=>{
let A=[b],P=[p],M=[""],K={},o=[],F=-1;
for(let u of R2)for(let x of u[0])o[x]=1;
K[R(o,p,s,v)+","+b]=1;
if(b==g)F=0;
for(let H=0;F<0&&H<A.length;H++){
let c=A[H];
for(let x of c)o[x]=1;
R(o,P[H],s,v);let E=t;
for(let i=0;i<c.length;i++)for(let j=4;j--;){
let u=c[i]+D[j],y=c[i]-D[j];
if(s[y]!=E||W[u]||o[u])continue;
let w2="";for(let n=y;n!=P[H];n=v[n])w2="udlr"[D.indexOf(n-v[n])]+w2;
let n2=[...c];n2[i]=u;n2.sort((x,y)=>x-y);
o[c[i]]=0,o[u]=1;
let K2=R(o,c[i],m,0)+","+n2;
o[u]=0,o[c[i]]=1;
if(K[K2])continue;
if(A.length>25e4)return null;
K[K2]=A.length;A.push(n2);P.push(c[i]);M.push(M[H]+w2+"udlr"[j]);
if(n2==g)F=A.length-1;
}
for(let x of c)o[x]=0;
}
if(F<0)return null;
Q=P[F];return M[F];
},
solve=L=>{
let r=L.split("\n");w=r[0].length;D=[-w,w,-1,1];W=[];G=[];B=[];
r.forEach((x,j)=>{for(let i=0;i<w;i++){let c=x[i],n=j*w+i;if(!c||c=="#")W[n]=1;else{".*".includes(c)&&G.push(n);"$*".includes(c)&&B.push(n);"@+".includes(c)&&(P=n)}}});
R2=[];let o=[],e=P/w|0,a=[];
for(let n=0;n<w;n++)o[e*w+n]=1;
for(let b of B){
if(a[b])continue;
R(o,b,s,0);
let q=[[],[]];
for(let x of B)if(s[x]==t)q[0].push(x),a[x]=1;
for(let x of G)if(s[x]==t)q[1].push(x);
q[0].length&&R2.push(q);
}
let u="",p=P;
for(let q of R2){
let z=S(""+q[1],q[0],p);
if(!z)return"";
u+=z;p=Q;q[0]=q[1];
}
return u;
};
f.readdirSync(I).forEach(d=>{
let a=I+"/"+d,b=O+"/"+d,s=solve(f.readFileSync(a+"/level.txt","utf8"));
f.mkdirSync(b,{recursive:!0});
f.writeFileSync(b+"/solution.txt",s);
});
