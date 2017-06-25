//----------------------------------------------------------------------------------------
function dfs(n, fpre, idx = 0) {
    if (fpre)
        fpre(n, idx);
    if (n.children)
        for (var i = 0; i < n.children.length; i++)
            dfs(n.children[i], fpre, i);
}
function dfsFlat(n, f) {
    var r = [];
    dfs(n, n => { if (!f || f(n))
        r.push(n); });
    return r;
}
function clone(o) {
    var str = JSON.stringify(o);
    console.log(str);
    return JSON.parse(str);
}
function sigmoid(x) {
    return .5 + .5 * Math.tanh(x * 6 - 3);
}
function makeT(a, b) { return { P: a, θ: b }; }
var one = { re: 1, im: 0 };
//----------------------------------------------------------------------------------------
function h2e(t, z) {
    var oben = CaddC(CmulC(t.θ, z), t.P);
    var unten = CaddC(CmulC(CmulC(Ccon(t.P), t.θ), z), one);
    return CdivC(oben, unten);
}
function e2h(t, z) {
    var θ = Cneg(CmulC(Ccon(t.θ), t.P));
    var P = Ccon(t.θ);
    return h2e(makeT(P, θ), z);
}
function compose(t1, t2) {
    var divisor = CaddC(CmulC(t2.θ, CmulC(t1.P, Ccon(t2.P))), one);
    var θ = CdivC(CaddC(CmulC(t1.θ, t2.θ), CmulC(t1.θ, CmulC(Ccon(t1.P), t2.P))), divisor);
    var θp = CktoCp(θ);
    θp.r = 1;
    return ({
        P: CdivC(CaddC(CmulC(t2.θ, t1.P), t2.P), divisor),
        θ: CptoCk(θp)
    });
}
function shift(h, s, e) {
    var p = h2e(h, { re: 0, im: 0 });
    var a = h2e(makeT(Cneg(p), one), s);
    var esuba = CsubC(e, a);
    var aec = Ccon(CmulC(a, e));
    var divisor = 1 - Math.pow(CktoCp(CmulC(a, e)).r, 2);
    var b = {
        re: CmulC(esuba, CaddC(one, aec)).re / divisor,
        im: CmulC(esuba, CsubC(one, aec)).im / divisor
    };
    return compose(makeT(Cneg(p), one), makeT(b, one));
}
function arcCenter(a, b) {
    var d = a.re * b.im - b.re * a.im;
    var br = CktoCp(b).r;
    var ar = CktoCp(a).r;
    var numerator = CsubC(CmulR(a, 1 + br * br), CmulR(b, 1 + ar * ar));
    return { c: CmulC({ re: 0, im: 1 }, CdivR(numerator, 2 * d)), d: d };
}
var R2toArr = (p) => ([p.x, p.y]);
var R2assignR2 = (a, b) => { a.x = b.x; a.y = b.y; return a; };
var R2toC = (p) => ({ re: p.x, im: p.y });
var R2neg = (p) => ({ x: -p.x, y: -p.y });
var R2addR2 = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
var R2subR2 = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
var R2mulR = (p, s) => ({ x: p.x * s, y: p.y * s });
var R2divR = (p, s) => ({ x: p.x / s, y: p.y / s });
var CktoCp = (k) => ({ θ: Math.atan2(k.im, k.re), r: Math.sqrt(k.re * k.re + k.im * k.im) });
var CptoCk = (p) => ({ re: p.r * Math.cos(p.θ), im: p.r * Math.sin(p.θ) });
var CktoArr = (p) => ([p.re, p.im]);
var CkassignCk = (a, b) => { a.re = b.re; a.im = b.im; return a; };
var CktoR2 = (p) => ({ x: p.re, y: p.im });
var Ckneg = (p) => ({ re: -p.re, im: -p.im });
var Ckcon = (p) => ({ re: p.re, im: -p.im });
var CkaddC = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
var CksubCk = (a, b) => ({ re: a.re - b.re, im: a.im - b.im });
var CkmulR = (p, s) => ({ re: p.re * s, im: p.im * s });
var CkmulCk = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.im * b.re + a.re * b.im });
var Ckpow = (a) => ({ re: Math.cos(a), im: Math.sin(a) });
var CkdivR = (p, s) => ({ re: p.re / s, im: p.im / s });
var CkdivCk = (a, b) => CkdivCkImpl2(a, b);
var Cklog = (a) => CptoCk(Cplog(CktoCp(a)));
var CpmulCp = (a, b) => CktoCp({ re: a.r * b.r * Math.cos(a.θ + b.θ), im: a.r * b.r * Math.sin(a.θ + b.θ) });
var CpdivCp = (a, b) => CktoCp({ re: a.r / b.r * Math.cos(a.θ - b.θ), im: a.r / b.r * Math.sin(a.θ - b.θ) });
var Cplog = (a) => CplogImpl(a);
var CtoArr = CktoArr;
var CassignC = CkassignCk;
var CtoR2 = CktoR2;
var Cneg = Ckneg;
var Ccon = Ckcon;
var CaddC = CkaddC;
var CsubC = CksubCk;
var CmulR = CkmulR;
var CmulC = CkmulCk;
var Cpow = Ckpow;
var Clog = Cklog;
var CdivC = CkdivCk;
var CdivR = CkdivR;
var ArrtoC = (p) => ({ re: p[0], im: p[1] });
var ArrtoR2 = (p) => ({ x: p[0], y: p[1] });
function ArrAddR(p, s) { return [p[0] + s, p[1] + s]; }
function ArrDivR(p, s) { return [p[0] / s, p[1] / s]; }
function CkdivCkImpl(a, b) {
    var dn = (b.re * b.re + b.im * b.im);
    var r = {
        re: (a.re * b.re + a.im * b.im) / dn,
        im: (a.im * b.re - a.re * b.im) / dn
    };
    if (isNaN(r.re)) {
        r.re = 0;
        console.log('r.re=NaN');
    }
    if (isNaN(r.im)) {
        r.im = 0;
        console.log('r.im=NaN');
    }
    return r;
}
function CkdivCkImpl2(a, b) {
    var ap = CktoCp(a);
    var bp = CktoCp(b);
    return {
        re: ap.r / bp.r * Math.cos(ap.θ - bp.θ),
        im: ap.r / bp.r * Math.sin(ap.θ - bp.θ)
    };
}
function CplogImpl(a) {
    if (isFinite(Math.log(a.r)))
        return { r: Math.log(a.r), θ: a.θ };
    else
        return { r: 0, θ: 0 };
}
function maxR(c, v) {
    var mp = CktoCp(c);
    mp.r = mp.r > v ? v : mp.r;
    return CptoCk(mp);
}
function onUnitCircle(c) {
    var mp = CktoCp(c);
    mp.r = 1;
    return CptoCk(mp);
}
function piize(α) {
    if (α < 0)
        return α + 2 * Math.PI;
    if (α > 2 * Math.PI)
        return α - 2 * Math.PI;
    return α;
}

var unitVectors = [{ re: 1, im: 0 }, { re: 0, im: 1 }, { re: -1, im: 0 }, { re: 0, im: -1 }];
function layoutUnitVectors(root) {
  var some = [{ re: 0, im: 0 }].concat(unitVectors);
  var i = 0;
  dfs(root, n => {
    n.z = { re: some[i % some.length].re, im: some[i % some.length].im };
    i++;
  });
  return root;
}
function layoutUnitLines(root) {
  root.z = { re: 0, im: 0 };
  for (var i = 0; i < 4; i++)
    layoutPath(root.children[i], unitVectors[i], root.children[i].height);
  function layoutPath(pathBegin, target, depth = 30) {
    var i = 0;
    var pa = 1 / depth;
    var rt = r => pa + r * (1 - pa);
    dfs(pathBegin, n => {
      var r = i / depth;
      n.z = { re: rt(r) * target.re, im: rt(r) * target.im };
      i++;
    });
  }
  return root;
}
function layoutSpiral(root) {
  var flatNodes = dfsFlat(root);
  var nrN = flatNodes.length;
  var nrRounds = Math.floor(nrN / 24);
  for (var i = 0; i < nrN; i++) {
    var a = i / nrN * 2 * Math.PI * (nrRounds + 1);
    var r = Math.pow(2, i / nrN) - 1;
    flatNodes[i].z = { re: r * Math.cos(a), im: r * Math.sin(a) };
  }
  return root;
}
function layoutRadial(root) {
  root = d3.tree().size([2 * Math.PI, 0.9])(root);
  dfs(root, n => {
    var a = n.x - Math.PI / 2;
    n.z = { re: n.y * Math.cos(a), im: n.y * Math.sin(a) };
  });
  return root;
}
function layoutLamping(n, wedge = { p: { re: 0, im: 0 }, m: { re: 0, im: 1 }, α: Math.PI }) {
  console.log('--------------------------------------------------------', n.depth);
  console.log(wedge.p, wedge.m, wedge.α);
  n.z = wedge.p;
  if (n.children) {
    for (var i = 0; i < n.children.length; i++) {
      var cα = wedge.α / n.children.length * (i + 1);
      console.assert(isFinite(cα));
      console.log('cα', cα);
      var s = .1;
      var it = ((1 - s * s) * Math.sin(cα)) / (2 * s);
      console.log('it', it);
      var d = Math.sqrt(Math.pow(it, 2) + 1) - it;
      d = d * .5;
      console.assert(isFinite(d));
      console.log('d', d);
      var p1 = makeT(wedge.p, one);
      var np = h2e(p1, CmulR(wedge.m, d));
      console.log('np', np);
      var npp1 = makeT(Cneg(np), one);
      var nd1 = makeT({ re: -d, im: 0 }, one);
      var nm = h2e(npp1, h2e(p1, wedge.m));
      console.log('nm', nm);
      var nα = Clog(h2e(nd1, Cpow(cα))).im;
      console.assert(isFinite(nα));
      layoutLamping(n.children[i], { p: np, m: nm, α: nα });
    }
  }
  return n;
}
function wedgeTranslate(w, P) {
  var t = makeT(P, one);
  var pα = { re: Math.cos(w.α), im: Math.sin(w.α) };
  w.α = CktoCp(h2e(t, pα)).θ;
  var pΩ = { re: Math.cos(w.Ω), im: Math.sin(w.Ω) };
  w.Ω = CktoCp(h2e(t, pΩ)).θ;
}
function layoutHyperbolic(n) {
  var pi = Math.PI;
  var startAngle = 0.5 * pi;
  var defAngleWidth = 1.98 * pi;
  function layoutNode(n, wedge, length) {
    if (n.parent) {
      var angleWidth = piize(wedge.Ω - wedge.α);
      var bisectionAngle = wedge.α + (angleWidth / 2.0);
      n.z = CptoCk({ θ: bisectionAngle, r: length });
      n.z = h2e(makeT(n.parent.z, one), n.z);
      wedgeTranslate(wedge, n.parent.z);
      wedgeTranslate(wedge, Cneg(n.z));
    }
    var angleWidth = piize(wedge.Ω - wedge.α);
    if (angleWidth > defAngleWidth) {
      var anglediff = angleWidth - defAngleWidth;
      wedge.α += anglediff / 2.0;
      wedge.α = piize(wedge.α);
      wedge.Ω -= anglediff / 2.0;
      wedge.Ω = piize(wedge.Ω);
      angleWidth = defAngleWidth;
    }
    var currentAngle = wedge.α;
    for (var c of n.children || []) {
      var α = currentAngle;
      currentAngle += angleWidth * (n.weigth || 1 / n.children.length);
      var Ω = piize(currentAngle);
      layoutNode(c, { α: α, Ω: Ω }, length);
    }
    return n;
  }
  var wedge = {
    α: piize(startAngle - defAngleWidth / 2.0),
    Ω: piize(startAngle + defAngleWidth / 2.0)
  };
  n.z = { re: 0, im: 0 };
  return layoutNode(n, wedge, .42);
}

export default {
  layoutHyperbolic: layoutHyperbolic
};
