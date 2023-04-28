"use client";

import { useInView } from "react-intersection-observer";

export const DEMO_CODE = `_="G=[[@o=j=28H,[@-j]];j3@(25+=A8)+i*Bji&32?70:,-40-i]b=a[j]=c.cloneNode(Qob#b3@Ub.getContext('2d'DVA8,e8-x,6	(j<17+7	,ix/=2;A3_e$J*J*y,.1KDsetIntervalQ5;f=B4+A20%8-8,ia@0	+B830-f*8	,y=10;f>0&f<9E-10<yV11;-1_(y^-6EOx)^6||i%4)Ex*x+y*y<80||a$Af*50y/f,/fDa5,++j		.;G.sortreturn -e[H}DG.map==A)/-W[,=W+X][H;Vo-i*3e3;Q3@YdrawImage(a[~~L2]],-J,L3]-JD!L2]EiYbeginPath(YmoFbezierCurF()})},j=4DjQj?c#c5:4e3;z=VXW*yij|(z+1)%.5<.1E(zZ191+(U527364,x.5+i1.5*e,(59542-yZ5188+(25080*,y-(j&28]j||OU8-i%)<54-BE25,e,|[1K4K,,K,8K][~~(B48+e/3)%1H,45+B])cos(>>j*4&15)Math..StylU'hsla('+[/2+/2,Xj0,(function(b,e){/J+/4,xY	+'%',sin()*LHL1]16G.push([XZy=W))--;)601]+')'fillfor(Z12700*4+xPI*),.height=*50/f+o,ij%*#.width=$.Rect(@0,Aj/Bi/D);E&&FveTo(-H0]JK,1Lb[Oabs(Qi=Ue=Vx=WiXYa.Z*(_0<x";for(Y=0;$="_ZYXWVUQOLKJHFEDBA@$#	"[Y++];)with(_.split($))_=join(pop());eval(_)`;

export function Demo() {
  const { ref, inView } = useInView({
    rootMargin: "250px 0px 500px 0px",
  });

  const onIframe = iframe => {
    if (iframe != null) {
      if (iframe.__written) return;
      const win = iframe.contentWindow;
      const doc = iframe.contentDocument;
      doc.open();
      doc.write('<!doctype html><head><meta charset="utf-8"><body>');
      const style = doc.createElement("style");
      style.textContent = `html, body { margin: 0; padding: 0; border: 0; width: 100%; height: 100%; }
         canvas { margin: auto; display: block; }`;
      doc.head.appendChild(style);
      const canvas = doc.createElement("canvas");
      doc.body.appendChild(canvas);
      // the `a` `b` `c` globals are expected by js1k demos
      win.a = canvas.getContext("2d");
      win.b = doc.body;
      win.c = canvas;
      const demo = doc.createElement("script");
      demo.textContent = DEMO_CODE;
      doc.body.appendChild(demo);

      function onResize() {
        const sw = doc.documentElement.clientWidth;
        const sh = doc.documentElement.clientHeight;
        win.scrollTo({
          left: (560 - sw) / 2,
          top: (560 - sh) / 2,
        });
      }
      onResize();
      win.addEventListener("resize", onResize);

      doc.close();
      iframe.__written = true;
    }
  };

  return (
    <div ref={ref}>
      {inView ? (
        <iframe
          style={{ border: 0 }}
          width="100%"
          height="100%"
          ref={onIframe}
        />
      ) : null}

      <style jsx>{`
        div {
          height: 560px;
          margin: 50px 0;
        }

        @media (max-width: 600px) {
          div {
            height: 350px;
          }
        }
      `}</style>
    </div>
  );
}
