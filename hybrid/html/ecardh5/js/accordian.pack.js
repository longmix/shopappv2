function $(d){
	return document.getElementById(d)}


	function g(d,v){
		if(v==undefined){
			if(d.style.display!="none"&&d.style.display!=""){
			
			 return d.offsetHeight}o=d.style.display;
			 d.style.display="block";
			 v=parseInt(d.offsetHeight);
			 d.style.display=o;
		     return v
	}
	else{
		d.style.height=v+"px"
	}
   }
	function of(d,v){
		          g(d,v);v=v/d.h;
		          d.style.opacity=v;
		          d.style.filter="alpha(opacity="+v*100+")"}
function b(d){
	        d=$(d);
	        z=g(d);
	        x=d.h;
	        if(z>0){v=Math.round(z/d.s);
		    v=(v<1)?z-1:z-v;of(d,v)}else{g(d,0);
			d.style.display="none";
			clearInterval(d.t)
		}
	}

function e(d){
	        d=$(d);z=g(d);
	        x=d.h;d.style.display="block";
	        if(z<x){
	        	v=Math.round((x-z)/d.s);
	            v=(v<1)?z+1:v+z;of(d,v)}else{g(d,x);
	            clearInterval(d.t)
	        }
	    }
function Accordian(d,s,f){
	 l=$(d).getElementsByTagName("div");
     a=[];for(i=0;i<l.length;i++){d=l[i];
	if(d.id.substr(d.id.indexOf("-"),d.id.length)=="-content"){
		a.push(d)}}x=null;
	  for(i=0;i<l.length;i++){
	  	(function(h){c=h.id.substr(0,h.id.indexOf("-"));
		if(c+"-header"==h.id){c=$(c+"-content");
		c.style.display="none";
		c.style.overflow="hidden";
		c.h=g(c);
		c.s=(s==undefined)?7:s;
		h.f=f;
		h.c=a;
		if(h.className.match(new RegExp(f+"+")))
       {x=h}h.onclick=function(){
	   for(j=0;j<this.c.length;
	   	  j++){n=this.c[j].id;n=n.substr(0,n.indexOf("-"));d=$(n+"-header");
	   	  n=$(n+"-content");s=d.className.split(new RegExp("\\s+"));
	   	  for(p=0;p<s.length;p++){if(s[p]==""+d.f){s.splice(p,1);
	   	  	d.className=s.join(" ");break}}clearInterval(n.t);
	   	  	if(d.id==this.id){if(n.style.display=="none"){g(n,0);
	   	  	n.t=setInterval('e("'+n.id+'")',9)}d.className+=" "+d.f}
	   	  	else{
	   	  		if(n.style.display=="block")
	   	  			{n.t=setInterval('b("'+n.id+'")',9)
	   	  	      }
	   	  	  }
	   	  	}
	   	  }
	   	}
	   })
		     (l[i])}
	   	  	    if(x!=null){x.onclick()}}