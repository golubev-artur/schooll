/* 3D-модели для биологии (three.js, процедурные). window.open3D(modelKey, host) → {dispose} */
(function(){
const T=()=>window.THREE;
const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.55,metalness:0},o));
const tube=(pts,r,mat,seg=24)=>new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p))),seg,r,8,false),mat);
const ell=(x,y,z,mat,rx=1,ry=1,rz=1)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(1,32,24),mat);m.scale.set(rx,ry,rz);m.position.set(x,y,z);return m};
const MODELS={
chlamy(){const g=new THREE.Group(),body=M(0x5cb85c,{transparent:true,opacity:.82,roughness:.25});
 g.add(ell(0,0,0,body,.9,1.15,.9));
 const cup=new THREE.Mesh(new THREE.SphereGeometry(.8,32,24,0,Math.PI*2,Math.PI*.25,Math.PI*.75),M(0x1f7a2e,{side:THREE.DoubleSide}));cup.scale.set(1,1.05,1);cup.position.y=-.1;g.add(cup);
 g.add(ell(.05,-.2,.1,M(0x145a22),.38,.38,.38));
 g.add(ell(.55,.55,.5,M(0xd23b2f),.1,.1,.1));
 g.add(tube([[-.15,1.1,0],[-.5,1.7,.1],[-.9,2.2,0],[-1.5,2.4,.1]],.04,M(0x2f6b34)));
 g.add(tube([[.15,1.1,0],[.5,1.7,-.1],[.9,2.2,0],[1.5,2.4,-.1]],.04,M(0x2f6b34)));
 g.position.y=-.2;return g},
laminaria(){const g=new THREE.Group(),mat=M(0x5c5a1c,{side:THREE.DoubleSide,roughness:.8});
 for(let i=0;i<6;i++){const a=i/6*Math.PI*2,geo=new THREE.PlaneGeometry(.7,3.2,10,40),p=geo.attributes.position;
  for(let k=0;k<p.count;k++){const y=p.getY(k)+1.6,x=p.getX(k);p.setX(k,x*(1+.35*Math.sin(y*1.6))+.12*Math.sin(y*3+i));p.setZ(k,.15*Math.sin(y*2.4+i)*(1+x));}
  geo.computeVertexNormals();const m=new THREE.Mesh(geo,mat);m.position.set(Math.cos(a)*.18,1.7,Math.sin(a)*.18);m.rotation.y=a;m.rotation.z=(i%2?1:-1)*.12;g.add(m)}
 for(let i=0;i<7;i++){const a=i/7*Math.PI*2;g.add(tube([[0,.1,0],[Math.cos(a)*.3,-.15,Math.sin(a)*.3],[Math.cos(a)*.6,-.4,Math.sin(a)*.6],[Math.cos(a)*.7,-.55,Math.sin(a)*.7]],.045,M(0x5a3a1a)))}
 g.position.y=-1.2;return g},
moss(){const g=new THREE.Group(),gm=M(0x3f8f2a);
 for(let i=0;i<260;i++){const r=Math.sqrt(Math.random())*1.1,a=Math.random()*6.283,h=.25+Math.random()*.25,m=new THREE.Mesh(new THREE.ConeGeometry(.045,h,5),M(new THREE.Color().setHSL(.27+Math.random()*.06,.55,.22+Math.random()*.12)));m.position.set(Math.cos(a)*r-.9,h/2-.55,Math.sin(a)*r);m.rotation.set((Math.random()-.5)*.5,0,(Math.random()-.5)*.5);g.add(m)}
 for(let i=0;i<4;i++){const x=-1.2+i*.28,z=(i%2?.2:-.2);g.add(tube([[x,-.5,z],[x+.03,-.1,z],[x-.03,.3,z]],.014,M(0x8a5a2a)));g.add(ell(x-.03,.4,z,M(0xa8662b),.07,.14,.07))}
 const f=new THREE.Group(),rach=[[0,-.6,0],[.2,.3,0],[.1,1.3,0],[-.4,1.9,0],[-1,2],];
 const pts=[];for(let t=0;t<=1;t+=.1)pts.push([.35*Math.sin(t*2.2),-.6+t*2.6,0]);f.add(tube(pts,.03,M(0x2d6b25),30));
 for(let k=1;k<10;k++){const t=k/10,y=-.6+t*2.6,x=.35*Math.sin(t*2.2),L=.75*(1-t*.85);for(const s of[-1,1]){const l=ell(x+s*L*.5,y+.1,0,M(0x3fa536,{side:THREE.DoubleSide}),L*.5,.045,.14);l.rotation.z=s*.35;f.add(l)}}
 f.position.set(.8,-.1,0);f.rotation.y=.4;g.add(f);return g},
flower(){const g=new THREE.Group(),green=M(0x2f8f3a);
 g.add(tube([[0,-1.6,0],[.1,-.6,0],[-.05,.5,0],[0,1.3,0]],.07,green));
 for(const [y,s,a] of [[-.7,1,0],[-.1,-1,.8],[.5,1,1.6]]){const l=ell(s*.55,y,0,M(0x3fb04a,{side:THREE.DoubleSide}),.55,.05,.28);l.rotation.z=s*.25;l.rotation.y=a;g.add(l)}
 for(let i=0;i<5;i++){const a=i/5*Math.PI*2,p=ell(0,0,0,M(0xf4a6c6,{roughness:.4,side:THREE.DoubleSide}),.42,.05,.22);p.position.set(Math.cos(a)*.42,1.4,Math.sin(a)*.42);p.rotation.y=-a;p.rotation.z=.25;g.add(p)}
 g.add(ell(0,1.4,0,M(0xf3c317),.14,.14,.14));
 for(let i=0;i<8;i++){const a=i/8*6.283;g.add(tube([[0,1.4,0],[Math.cos(a)*.15,1.55,Math.sin(a)*.15],[Math.cos(a)*.25,1.62,Math.sin(a)*.25]],.012,M(0xf3c317)))}
 const rm=M(0xb48a52);g.add(tube([[0,-1.6,0],[0,-2,0],[0,-2.5,0]],.08,rm));
 for(let i=0;i<9;i++){const a=i/9*6.283;g.add(tube([[0,-2,0],[Math.cos(a)*.5,-2.3,Math.sin(a)*.5],[Math.cos(a)*.9,-2.7,Math.sin(a)*.9],[Math.cos(a)*1.1,-3.1,Math.sin(a)*1.1]],.025,rm))}
 g.scale.setScalar(.78);g.position.y=.35;return g},
cone(){const g=new THREE.Group(),sc=M(0x8a5a2e,{roughness:.8}),c=new THREE.Group();
 for(let i=0;i<110;i++){const t=i/110,a=i*2.399,r=.18+Math.sin(t*Math.PI)*.62,y=-1.15+t*2.3,s=new THREE.Mesh(new THREE.BoxGeometry(.26,.07,.34),M(0x7a4a26+((i%5)*0x050200),{roughness:.85}));s.position.set(Math.cos(a)*r,y,Math.sin(a)*r);s.rotation.y=-a;s.rotation.z=.5-t*.3;c.add(s)}
 c.add(ell(0,0,0,sc,.35,1.0,.35));c.rotation.z=.3;c.position.set(.2,.1,0);g.add(c);
 g.add(tube([[-2.2,1.3,0],[-1.2,1.2,0],[-.2,1.1,0],[.6,1.3,0]],.06,M(0x6a4a2a)));
 for(let i=0;i<70;i++){const x=-2+i*.04,z=(Math.random()-.5)*.1;for(const s of[-1,1]){g.add(tube([[x,1.2,0],[x+.1,1.2+s*.1,s*.5],[x+.2,1.2+s*.15,s*1]],.008,M(0x2e7d32),4))}}
 const sd=new THREE.Group();sd.add(ell(0,0,0,M(0x5a3a1a),.12,.2,.08));const w=ell(.05,.35,0,M(0xc9a36b,{side:THREE.DoubleSide}),.2,.5,.01);w.rotation.z=-.3;sd.add(w);sd.position.set(1.7,-1.1,.3);sd.rotation.z=.9;g.add(sd);
 return g}};

const GL=(c,o=.55,x={})=>M(c,Object.assign({transparent:true,opacity:o,roughness:.2,side:THREE.DoubleSide,depthWrite:false},x));
const box=(w,h,d,mat,x=0,y=0,z=0)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);return m};
const rnd=(a,b)=>a+Math.random()*(b-a);
Object.assign(MODELS,{
wall(){const g=new THREE.Group();
 g.add(box(3,2,.9,GL(0x3d9a2a,.28)));
 g.add(box(2.7,1.7,.78,GL(0xe6d84a,.45)));
 g.add(box(2.55,1.55,.7,GL(0x5ec8f0,.55)));
 for(let i=0;i<14;i++)g.add(ell(rnd(-1,1),rnd(-.6,.6),rnd(-.25,.25),M(0x3fae3f),.08,.05,.05));
 for(const [x,y] of[[1.5,1],[-1.5,1],[1.5,-1],[-1.5,-1]])g.add(box(.2,.2,1,M(0x2f8a22),x,y,0));
 return g},
vacuole(){const g=new THREE.Group();g.add(ell(0,0,0,GL(0x6fc8f2,.62,{roughness:.1}),1.7,1.25,1.1));
 g.add(ell(-.5,.45,.7,GL(0xffffff,.35),.5,.3,.2));
 for(let i=0;i<30;i++)g.add(ell(rnd(-1,1),rnd(-.7,.7),rnd(-.5,.5),M(0xd6eefc),.04,.04,.04));return g},
cytoplasm(){const g=new THREE.Group();g.add(box(3,2,1.6,GL(0x7ccff2,.3)));
 for(let i=0;i<70;i++)g.add(ell(rnd(-1.4,1.4),rnd(-.9,.9),rnd(-.7,.7),M(new THREE.Color().setHSL(rnd(.3,.62),.5,.5)),.05,.05,.05));
 g.add(ell(.6,.3,0,M(0xc9a3f0),.25,.25,.25));g.add(ell(-.7,-.3,.2,M(0x4aa845),.3,.18,.18));return g},
nucleus(){const g=new THREE.Group();g.add(ell(0,0,0,GL(0xb07fe0,.42,{roughness:.3}),1.5,1.5,1.5));
 g.add(ell(.1,.1,0,M(0x5b1d9a),.5,.5,.5));
 for(let i=0;i<12;i++){const p=[];let x=rnd(-.9,.9),y=rnd(-.9,.9),z=rnd(-.5,.5);for(let k=0;k<7;k++){p.push([x,y,z]);x+=rnd(-.3,.3);y+=rnd(-.3,.3);z+=rnd(-.3,.3)}g.add(tube(p,.025,M(0x6a2db0),14))}
 for(let i=0;i<20;i++){const a=Math.random()*6.28,b=Math.acos(rnd(-1,1));g.add(ell(1.5*Math.sin(b)*Math.cos(a),1.5*Math.cos(b),1.5*Math.sin(b)*Math.sin(a),M(0x8a55c8),.06,.06,.06))}return g},
nucleolus(){const g=new THREE.Group();g.add(ell(0,0,0,M(0x4b1580,{roughness:.8}),.9,.9,.9));
 for(let i=0;i<120;i++){const a=Math.random()*6.28,b=Math.acos(rnd(-1,1));g.add(ell(.9*Math.sin(b)*Math.cos(a),.9*Math.cos(b),.9*Math.sin(b)*Math.sin(a),M(0x7a3cc0),.07,.07,.07))}return g},
chromosomes(){const g=new THREE.Group(),m=M(0x3548c8,{roughness:.4}),cap=(x,y,z,l,rz)=>{const c=new THREE.Mesh(new THREE.CapsuleGeometry?new THREE.CapsuleGeometry(.09,l,6,12):new THREE.CylinderGeometry(.09,.09,l,12),m);c.position.set(x,y,z);c.rotation.z=rz;return c};
 for(const [x,y,z] of[[-.9,.5,0],[.9,.6,.2],[-.6,-.7,-.2],[.8,-.6,0]]){const X=new THREE.Group();X.add(cap(0,0,0,1,.45));X.add(cap(0,0,0,1,-.45));X.position.set(x,y,z);X.rotation.y=rnd(0,3);g.add(X)}return g},
chloroplast(){const g=new THREE.Group();g.add(ell(0,0,0,GL(0x3fae3f,.4,{roughness:.3}),2.1,1.15,1.15));
 for(const [x,z] of[[-.9,-.2],[-.3,.3],[.35,-.25],[.95,.2]]){const st=new THREE.Group();for(let k=0;k<7;k++){const d=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.07,20),M(0x1f7a2a));d.position.y=-.3+k*.1;st.add(d)}st.position.set(x,0,z);g.add(st)}
 g.add(tube([[-1.2,0,0],[-.6,.1,.1],[0,0,-.1],[.6,.1,0],[1.2,0,0]],.02,M(0x8fd18a)));return g},
mito(){const g=new THREE.Group();g.add(ell(0,0,0,GL(0xff8a1f,.4,{roughness:.3}),2.1,1,1));
 for(let k=-4;k<=4;k++){const w=1-Math.abs(k)*.1,f=new THREE.Mesh(new THREE.TorusGeometry(.62*w,.08,8,24,Math.PI*1.3),M(0xd2501a));f.position.x=k*.22;f.rotation.y=Math.PI/2;f.rotation.z=(k%2?1:-1)*.9;g.add(f)}
 g.add(ell(0,0,0,GL(0xffc27a,.3),1.9,.85,.85));return g},
leuko(){const g=new THREE.Group();g.add(ell(0,0,0,GL(0xdfe3e8,.5,{roughness:.2}),1.9,1.1,1.1));
 for(let i=0;i<14;i++)g.add(ell(rnd(-1,1),rnd(-.5,.5),rnd(-.4,.4),M(0xf6f6f2,{roughness:.3}),rnd(.16,.3),rnd(.14,.24),rnd(.14,.24)));return g},
chromo(){const g=new THREE.Group();g.add(ell(0,0,0,GL(0xffb02e,.45,{roughness:.25}),1.9,1.15,1.15));
 for(let i=0;i<26;i++)g.add(ell(rnd(-1.1,1.1),rnd(-.6,.6),rnd(-.5,.5),M(new THREE.Color().setHSL(rnd(.02,.08),.95,.5)),.14,.14,.14));return g}
});

Object.assign(MODELS,{
membrane(){const g=new THREE.Group(),hm=M(0xf0a020),tm=M(0xe8d9a0,{roughness:.8});
 for(const side of[1,-1])for(let i=-7;i<=7;i++)for(let j=-3;j<=3;j++){const x=i*.3,z=j*.3,y=side*.55;g.add(ell(x,y,z,hm,.11,.11,.11));for(const dx of[-.045,.045]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.5,6),tm);t.position.set(x+dx,side*.28,z);g.add(t)}}
 for(const [x,z] of[[-1.2,.3],[.4,-.3],[1.7,.2]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,1.5,16,1,true),GL(0x7a4fd0,.75));p.position.set(x,0,z);g.add(p)}
 g.rotation.x=.5;return g}
});

const PUR=()=>new THREE.MeshPhysicalMaterial({color:0x8a4fe0,roughness:.35,metalness:0,clearcoat:1,clearcoatRoughness:.2,side:THREE.DoubleSide});
const fib=(n,f)=>{for(let i=0;i<n;i++){const y=1-2*(i+.5)/n,r=Math.sqrt(1-y*y),a=i*2.39996;f(new THREE.Vector3(Math.cos(a)*r,y,Math.sin(a)*r))}};
const poreRings=(g,R,n,sz,wedge)=>fib(n,v=>{let ph=Math.atan2(v.z,v.x);if(ph<0)ph+=Math.PI*2;if(wedge&&ph>Math.PI*1.5)return;const p=new THREE.Group(),t=new THREE.Mesh(new THREE.TorusGeometry(sz,sz*.38,8,14),M(0x5a1fa8,{roughness:.5}));p.add(t);const c=ell(0,0,0,M(0x2a0a60),sz*.5,sz*.5,sz*.25);p.add(c);p.position.copy(v.clone().multiplyScalar(R*1.004));p.lookAt(v.clone().multiplyScalar(R*2));g.add(p)});
const chroThreads=(g,R,cnt,col)=>{for(let i=0;i<cnt;i++){const p=[];const v=new THREE.Vector3(rnd(-1,1),rnd(-1,1),rnd(-1,1)).normalize().multiplyScalar(R*rnd(.5,.97));for(let k=0;k<8;k++){p.push([v.x,v.y,v.z]);v.add(new THREE.Vector3(rnd(-.28,.28),rnd(-.28,.28),rnd(-.28,.28)));if(v.length()>R)v.setLength(R*.95)}g.add(tube(p,.02,M(col,{roughness:.4}),16))}};
const shell=(R,mat,wedge)=>new THREE.Mesh(new THREE.SphereGeometry(R,56,40,0,wedge?Math.PI*1.5:Math.PI*2),mat);
Object.assign(MODELS,{
nucleus(){const g=new THREE.Group();
 g.add(shell(1.5,PUR(),true));g.add(shell(1.4,new THREE.MeshPhysicalMaterial({color:0x6f3fd0,roughness:.5,side:THREE.DoubleSide}),true));
 g.add(shell(1.3,new THREE.MeshStandardMaterial({color:0x2d8be6,roughness:.4,side:THREE.DoubleSide}),true));
 chroThreads(g,1.28,150,0x7fd4ff);
 g.add(ell(0,0,0,M(0x4a1a90,{roughness:.25}),.5,.5,.5));
 poreRings(g,1.5,70,.075,true);
 for(const a of[0,Math.PI*1.5]){const w=box(1.5,.02,.02,M(0));w.visible=false}
 g.rotation.set(.45,2.0,0);return g},
pores(){const g=new THREE.Group();g.add(shell(1.5,PUR(),false));poreRings(g,1.5,90,.085,false);g.add(ell(-1.45,0,.2,M(0x4a1a90,{roughness:.25}),.45,.45,.45));g.rotation.y=2;return g},
chromatin(){const g=new THREE.Group();g.add(ell(0,0,0,GL(0x5ab4ff,.2),1.35,1.35,1.35));chroThreads(g,1.3,320,0x6fd0ff);return g}
});
window.open3D=(key,host)=>{
 const W=host.clientWidth||400,H=host.clientHeight||360,r=new THREE.WebGLRenderer({antialias:true,alpha:true});r.setPixelRatio(Math.min(devicePixelRatio,2));r.setSize(W,H);host.appendChild(r.domElement);
 const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,W/H,.1,100);cam.position.set(0,.4,7);
 sc.add(new THREE.HemisphereLight(0xffffff,0x556655,.95));const dl=new THREE.DirectionalLight(0xffffff,1.1);dl.position.set(3,5,4);sc.add(dl);
 const obj=(MODELS[key]||MODELS.flower)(),pivot=new THREE.Group();pivot.add(obj);sc.add(pivot);
 let drag=false,px=0,py=0,auto=true,z=7,vx=0,vy=0,raf,dead=false;const el=r.domElement;el.style.touchAction='none';el.style.cursor='grab';
 el.onpointerdown=e=>{drag=true;auto=false;px=e.clientX;py=e.clientY;el.setPointerCapture(e.pointerId);el.style.cursor='grabbing'};
 el.onpointermove=e=>{if(!drag)return;vy=(e.clientX-px)*.01;vx=(e.clientY-py)*.01;pivot.rotation.y+=vy;pivot.rotation.x=Math.max(-1.4,Math.min(1.4,pivot.rotation.x+vx));px=e.clientX;py=e.clientY};
 el.onpointerup=el.onpointercancel=()=>{drag=false;el.style.cursor='grab'};
 el.onwheel=e=>{e.preventDefault();z=Math.max(3,Math.min(12,z+e.deltaY*.005));cam.position.z=z};
 const loop=()=>{if(dead)return;if(auto)pivot.rotation.y+=.008;r.render(sc,cam);raf=requestAnimationFrame(loop)};loop();
 return{dispose(){dead=true;cancelAnimationFrame(raf);r.dispose();el.remove()},auto(v){auto=v}}};
})();
