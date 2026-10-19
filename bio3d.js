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
