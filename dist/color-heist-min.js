Math.average=function(t){for(var e=0,r=0,o=t.length;o>r;r++)e+=t[r];return e/t.length},Math.variance=function(t){for(var e=0,r=Math.average(t),o=0,n=t.length;n>o;o++)e+=Math.pow(t[o]-r,2);return e/t.length};var Palette=function(t){this.options=t};Palette.prototype.getDominantColor=function(t){return t[0]},Palette.prototype.getAllColors=function(t){return t},Palette.prototype.__RGBAverage=function(t){var e,r,o,n=[];for(e=0,o=t.length;o>e;e++)r=Math.average(t[e]),n[e]={color:t[e],average:r};return n},Palette.prototype.__RGBVariance=function(t){var e,r,o;for(variances=[],e=0,o=t.length;o>e;e++)r=Math.variance(t[e]),variances[e]={color:t[e],variance:r};return variances},Palette.prototype.getLightestColors=function(t){return avgs=this.__RGBAverage(t),avgs.sort(function(t,e){return t.average<e.average}).map(function(t){return t.color})},Palette.prototype.getDarkestColors=function(t){return avgs=this.__RGBAverage(t),avgs.sort(function(t,e){return t.average>e.average}).map(function(t){return t.color})},Palette.prototype.getVibrantColors=function(t){var e=this.__RGBVariance(t);return e.sort(function(t,e){return t.variance<e.variance}).map(function(t){return t.color})},Palette.prototype.getDullColors=function(t){var e=this.__RGBVariance(t);return e.sort(function(t,e){return t.variance>e.variance}).map(function(t){return t.color})};var ColorScheme=function(t,e){this.colorProperties=t,this.name=e,this.styleSheetId="ColorHeistStyles",this.stylesheets={},this.styles=document.getElementById(this.styleSheetId),this.getClassName=function(t){if("undefined"!=typeof this.colorProperties[t]){this.colorProperties[t].color;return this.name+"-"+t}},this.getRGB=function(t){if("undefined"!=typeof this.colorProperties[t]){var e=this.colorProperties[t].color;return"rgb("+e[0]+","+e[1]+","+e[2]+")"}},this.write=function(){var e,r="";document.getElementById(this.styleSheetId)||(this.styles=document.createElement("div"),document.body.appendChild(this.styles),this.styles.setAttribute("id",this.styleSheetId)),document.getElementById(this.name)?e=document.getElementById(this.name):(e=document.createElement("style"),e.setAttribute("id",this.name),this.styles.appendChild(e));for(var o=Object.keys(t),n=0,i=o.length;i>n;n++){var a="."+this.name+"-"+o[n]+"{"+t[o[n]].property+":"+this.getRGB(o[n])+" !important}";r+=a}e.innerHTML=r}},ColorHeist=function(){this.thief=new ColorThief,this.palette=new Palette};ColorHeist.prototype.getColor=function(t,e){return this.thief.getColor(t,e)},ColorHeist.prototype.getPalette=function(t,e,r){return this.thief.getPalette(t,e,r)},ColorHeist.prototype.__getColorScheme=function(t,e,r,o,n){return schemeInput={backgroundLight:{color:e[0],property:"background"},backgroundLightAlt:{color:e[1],property:"background"},backgroundDark:{color:r[0],property:"background"},backgroundDarkAlt:{color:r[1],property:"background"},backgroundLightHighlight:{color:o[0],property:"background"},backgroundDarkHighlight:{color:n[0],property:"background"},textLight:{color:e[0],property:"color"},textDark:{color:r[0],property:"color"},textHighlightLight:{color:o[0],property:"color"},textHighlightDark:{color:n[0],property:"color"}},scheme=new ColorScheme(schemeInput,t),scheme.write(),scheme},ColorHeist.prototype.getColorScheme=function(t,e){return colors=this.thief.getPalette(t,10),lightest=this.palette.getLightestColors(colors).slice(0,5),darkest=this.palette.getDarkestColors(colors).slice(0,5),vibrantLight=this.palette.getLightestColors(this.palette.getVibrantColors(colors).slice(0,5)),vibrantDark=this.palette.getDarkestColors(this.palette.getVibrantColors(colors).slice(0,5)),this.__getColorScheme(e,lightest,darkest,vibrantLight,vibrantDark)};
var CanvasImage=function(t){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),document.body.appendChild(this.canvas),this.width=this.canvas.width=t.width,this.height=this.canvas.height=t.height,this.context.drawImage(t,0,0,this.width,this.height)};CanvasImage.prototype.clear=function(){this.context.clearRect(0,0,this.width,this.height)},CanvasImage.prototype.update=function(t){this.context.putImageData(t,0,0)},CanvasImage.prototype.getPixelCount=function(){return this.width*this.height},CanvasImage.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)},CanvasImage.prototype.removeCanvas=function(){this.canvas.parentNode.removeChild(this.canvas)};var ColorThief=function(){};if(ColorThief.prototype.getColor=function(t,n){var r=this.getPalette(t,5,n),o=r[0];return o},ColorThief.prototype.getPalette=function(t,n,r){"undefined"==typeof n&&(n=10),("undefined"==typeof r||1>r)&&(r=10);for(var o,e,a,u,i,c=new CanvasImage(t),f=c.getImageData(),s=f.data,v=c.getPixelCount(),h=[],p=0;v>p;p+=r)o=4*p,e=s[o+0],a=s[o+1],u=s[o+2],i=s[o+3],i>=125&&(e>250&&a>250&&u>250||h.push([e,a,u]));var g=MMCQ.quantize(h,n),l=g?g.palette():null;return c.removeCanvas(),l},!pv)var pv={map:function(t,n){var r={};return n?t.map(function(t,o){return r.index=o,n.call(r,t)}):t.slice()},naturalOrder:function(t,n){return n>t?-1:t>n?1:0},sum:function(t,n){var r={};return t.reduce(n?function(t,o,e){return r.index=e,t+n.call(r,o)}:function(t,n){return t+n},0)},max:function(t,n){return Math.max.apply(null,n?pv.map(t,n):t)}};var MMCQ=function(){function t(t,n,r){return(t<<2*c)+(n<<c)+r}function n(t){function n(){r.sort(t),o=!0}var r=[],o=!1;return{push:function(t){r.push(t),o=!1},peek:function(t){return o||n(),void 0===t&&(t=r.length-1),r[t]},pop:function(){return o||n(),r.pop()},size:function(){return r.length},map:function(t){return r.map(t)},debug:function(){return o||n(),r}}}function r(t,n,r,o,e,a,u){var i=this;i.r1=t,i.r2=n,i.g1=r,i.g2=o,i.b1=e,i.b2=a,i.histo=u}function o(){this.vboxes=new n(function(t,n){return pv.naturalOrder(t.vbox.count()*t.vbox.volume(),n.vbox.count()*n.vbox.volume())})}function e(n){var r,o,e,a,u=1<<3*c,i=new Array(u);return n.forEach(function(n){o=n[0]>>f,e=n[1]>>f,a=n[2]>>f,r=t(o,e,a),i[r]=(i[r]||0)+1}),i}function a(t,n){var o,e,a,u=1e6,i=0,c=1e6,s=0,v=1e6,h=0;return t.forEach(function(t){o=t[0]>>f,e=t[1]>>f,a=t[2]>>f,u>o?u=o:o>i&&(i=o),c>e?c=e:e>s&&(s=e),v>a?v=a:a>h&&(h=a)}),new r(u,i,c,s,v,h,n)}function u(n,r){function o(t){var n,o,e,a,u,i=t+"1",f=t+"2",s=0;for(c=r[i];c<=r[f];c++)if(g[c]>p/2){for(e=r.copy(),a=r.copy(),n=c-r[i],o=r[f]-c,u=o>=n?Math.min(r[f]-1,~~(c+o/2)):Math.max(r[i],~~(c-1-n/2));!g[u];)u++;for(s=l[u];!s&&g[u-1];)s=l[--u];return e[f]=u,a[i]=e[f]+1,[e,a]}}if(r.count()){var e=r.r2-r.r1+1,a=r.g2-r.g1+1,u=r.b2-r.b1+1,i=pv.max([e,a,u]);if(1==r.count())return[r.copy()];var c,f,s,v,h,p=0,g=[],l=[];if(i==e)for(c=r.r1;c<=r.r2;c++){for(v=0,f=r.g1;f<=r.g2;f++)for(s=r.b1;s<=r.b2;s++)h=t(c,f,s),v+=n[h]||0;p+=v,g[c]=p}else if(i==a)for(c=r.g1;c<=r.g2;c++){for(v=0,f=r.r1;f<=r.r2;f++)for(s=r.b1;s<=r.b2;s++)h=t(f,c,s),v+=n[h]||0;p+=v,g[c]=p}else for(c=r.b1;c<=r.b2;c++){for(v=0,f=r.r1;f<=r.r2;f++)for(s=r.g1;s<=r.g2;s++)h=t(f,s,c),v+=n[h]||0;p+=v,g[c]=p}return g.forEach(function(t,n){l[n]=p-t}),o(i==e?"r":i==a?"g":"b")}}function i(t,r){function i(t,n){for(var r,o=1,e=0;s>e;)if(r=t.pop(),r.count()){var a=u(c,r),i=a[0],f=a[1];if(!i)return;if(t.push(i),f&&(t.push(f),o++),o>=n)return;if(e++>s)return}else t.push(r),e++}if(!t.length||2>r||r>256)return!1;var c=e(t),f=0;c.forEach(function(){f++});var h=a(t,c),p=new n(function(t,n){return pv.naturalOrder(t.count(),n.count())});p.push(h),i(p,v*r);for(var g=new n(function(t,n){return pv.naturalOrder(t.count()*t.volume(),n.count()*n.volume())});p.size();)g.push(p.pop());i(g,r-g.size());for(var l=new o;g.size();)l.push(g.pop());return l}var c=5,f=8-c,s=1e3,v=.75;return r.prototype={volume:function(t){var n=this;return(!n._volume||t)&&(n._volume=(n.r2-n.r1+1)*(n.g2-n.g1+1)*(n.b2-n.b1+1)),n._volume},count:function(n){var r=this,o=r.histo;if(!r._count_set||n){var e,a,u,i=0;for(e=r.r1;e<=r.r2;e++)for(a=r.g1;a<=r.g2;a++)for(u=r.b1;u<=r.b2;u++)index=t(e,a,u),i+=o[index]||0;r._count=i,r._count_set=!0}return r._count},copy:function(){var t=this;return new r(t.r1,t.r2,t.g1,t.g2,t.b1,t.b2,t.histo)},avg:function(n){var r=this,o=r.histo;if(!r._avg||n){var e,a,u,i,f,s=0,v=1<<8-c,h=0,p=0,g=0;for(a=r.r1;a<=r.r2;a++)for(u=r.g1;u<=r.g2;u++)for(i=r.b1;i<=r.b2;i++)f=t(a,u,i),e=o[f]||0,s+=e,h+=e*(a+.5)*v,p+=e*(u+.5)*v,g+=e*(i+.5)*v;s?r._avg=[~~(h/s),~~(p/s),~~(g/s)]:r._avg=[~~(v*(r.r1+r.r2+1)/2),~~(v*(r.g1+r.g2+1)/2),~~(v*(r.b1+r.b2+1)/2)]}return r._avg},contains:function(t){var n=this,r=t[0]>>f;return gval=t[1]>>f,bval=t[2]>>f,r>=n.r1&&r<=n.r2&&gval>=n.g1&&gval<=n.g2&&bval>=n.b1&&bval<=n.b2}},o.prototype={push:function(t){this.vboxes.push({vbox:t,color:t.avg()})},palette:function(){return this.vboxes.map(function(t){return t.color})},size:function(){return this.vboxes.size()},map:function(t){for(var n=this.vboxes,r=0;r<n.size();r++)if(n.peek(r).vbox.contains(t))return n.peek(r).color;return this.nearest(t)},nearest:function(t){for(var n,r,o,e=this.vboxes,a=0;a<e.size();a++)r=Math.sqrt(Math.pow(t[0]-e.peek(a).color[0],2)+Math.pow(t[1]-e.peek(a).color[1],2)+Math.pow(t[2]-e.peek(a).color[2],2)),(n>r||void 0===n)&&(n=r,o=e.peek(a).color);return o},forcebw:function(){var t=this.vboxes;t.sort(function(t,n){return pv.naturalOrder(pv.sum(t.color),pv.sum(n.color))});var n=t[0].color;n[0]<5&&n[1]<5&&n[2]<5&&(t[0].color=[0,0,0]);var r=t.length-1,o=t[r].color;o[0]>251&&o[1]>251&&o[2]>251&&(t[r].color=[255,255,255])}},{quantize:i}}();