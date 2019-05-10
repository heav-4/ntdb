const fs=require("fs")
const get = require('simple-get')

var nttbl=[
	["0",0,0,0,0,0,0,0,0],
	["1c",0,1,0,0,0,0,0,0],
	["1e",1,0,0,0,0,0,0,0],
	["2a",1,1,0,0,0,0,0,0],
	["2c",0,1,0,1,0,0,0,0],
	["2e",1,0,1,0,0,0,0,0],
	["2i",1,0,0,0,1,0,0,0],
	["2k",1,0,0,1,0,0,0,0],
	["2n",0,1,0,0,0,1,0,0],
	["3a",1,1,1,0,0,0,0,0],
	["3c",0,1,0,1,0,1,0,0],
	["3e",1,0,1,0,1,0,0,0],
	["3i",0,1,1,1,0,0,0,0],
	["3j",0,1,1,0,1,0,0,0],
	["3k",1,0,0,1,0,0,1,0],
	["3n",0,1,0,0,0,0,1,1],
	["3q",0,0,0,1,0,0,1,1],
	["3r",1,1,0,0,1,0,0,0],
	["3y",0,1,0,0,1,0,0,1],
	["4c",0,1,0,1,0,1,0,1],
	["4e",1,0,1,0,1,0,1,0],
	["4k",1,1,0,1,0,0,1,0],
	["4a",0,0,0,0,1,1,1,1],
	["4i",0,1,1,0,0,0,1,1],
	["4n",0,0,0,1,0,1,1,1],
	["4y",0,1,0,0,1,1,0,1],
	["4q",0,0,1,1,1,0,0,1],
	["4j",0,1,1,0,1,0,1,0],
	["4r",1,1,1,0,1,0,0,0],
	["4t",1,0,0,1,1,1,0,0],
	["4w",0,0,0,1,1,0,1,1],
	["4z",1,0,0,1,1,0,0,1],
	["5c",1,0,1,1,1,0,1,0],
	["5e",0,1,0,1,1,1,0,1],
	["5k",0,1,1,0,1,1,0,1],
	["5a",0,0,0,1,1,1,1,1],
	["5i",0,0,1,1,1,1,1,0],
	["5n",1,0,1,1,1,1,0,0],
	["5y",1,0,1,1,0,1,1,0],
	["5q",1,1,1,0,1,1,0,0],
	["5j",1,0,0,1,0,1,1,1],
	["5r",0,0,1,1,0,1,1,1],
	["6c",1,0,1,1,1,1,1,0],
	["6e",0,1,0,1,1,1,1,1],
	["6k",0,1,1,0,1,1,1,1],
	["6a",0,0,1,1,1,1,1,1],
	["6i",0,1,1,1,0,1,1,1],
	["6n",1,1,1,0,1,1,1,0],
	["7c",1,1,1,1,1,1,1,0],
	["7e",0,1,1,1,1,1,1,1],
	["8",1,1,1,1,1,1,1,1],
]
var ntchars=[];
for (var i=0;i<nttbl.length;i++){
	ntchars[i]=nttbl[i][0]
}
function hasbit(n,bn){
	return Math.floor(n/Math.pow(2,bn))%2
}
function ruletostring(rule){
	var res=[0,0,0,0,0,0,0,0,0]
	var res2=""
	for (var i=0;i<nttbl.length;i++){
		if (hasbit(rule,i)){
			res[parseInt(ntchars[i][0])]++
		}
	}
	for (var i=0;i<res.length;i++){
		if(res[i]){
			res2+=i
			for (var j=0;j<nttbl.length;j++){
				if (hasbit(rule,j)&&ntchars[j][0]+""==i){
					if (!(i==1&&res[i]==2||
						i==2&&res[i]==6||
						i==3&&res[i]==10||
						i==4&&res[i]==13||
						i==5&&res[i]==10||
						i==6&&res[i]==6||
						i==7&&res[i]==2
					)){
						res2+=ntchars[j][1]!=undefined?ntchars[j][1]:""
					}
				}
			}
		}
	}
	return res2
}
function fliph(n){
	return [n[0],n[7],n[6],n[5],n[4],n[3],n[2],n[1]]
}
function flipv(n){
	return [n[4],n[3],n[2],n[1],n[0],n[7],n[6],n[5]]
}
function rotc(n){
	return [n[6],n[7],n[0],n[1],n[2],n[3],n[4],n[5]]
}
function parseRule(rs){
	var res=0;
	var res2=0;
	var i=1;
	var negate=false;
	var cn=-1;
	while (rs[i]!="/"){
		if (/[0-8]/.test(rs[i])&&(/[0-8]/.test(rs[i+1])|rs[i+1]=="/")){
			switch (parseInt(rs[i],10)){
				case 0:
					res+=Math.pow(2,0);
				break;
				case 1:
					res+=Math.pow(2,1);
					res+=Math.pow(2,2);
				break;
				case 2:
					res+=Math.pow(2,3);
					res+=Math.pow(2,4);
					res+=Math.pow(2,5);
					res+=Math.pow(2,6);
					res+=Math.pow(2,7);
					res+=Math.pow(2,8);
				break;
				case 3:
					res+=Math.pow(2,9);
					res+=Math.pow(2,10);
					res+=Math.pow(2,11);
					res+=Math.pow(2,12);
					res+=Math.pow(2,13);
					res+=Math.pow(2,14);
					res+=Math.pow(2,15);
					res+=Math.pow(2,16);
					res+=Math.pow(2,17);
					res+=Math.pow(2,18);
				break;
				case 4:
					res+=Math.pow(2,19);
					res+=Math.pow(2,20);
					res+=Math.pow(2,21);
					res+=Math.pow(2,22);
					res+=Math.pow(2,23);
					res+=Math.pow(2,24);
					res+=Math.pow(2,25);
					res+=Math.pow(2,26);
					res+=Math.pow(2,27);
					res+=Math.pow(2,28);
					res+=Math.pow(2,29);
					res+=Math.pow(2,30);
					res+=Math.pow(2,31);
				break;
				case 5:
					res+=Math.pow(2,32);
					res+=Math.pow(2,33);
					res+=Math.pow(2,34);
					res+=Math.pow(2,35);
					res+=Math.pow(2,36);
					res+=Math.pow(2,37);
					res+=Math.pow(2,38);
					res+=Math.pow(2,39);
					res+=Math.pow(2,40);
					res+=Math.pow(2,41);
				break;
				case 6:
					res+=Math.pow(2,42);
					res+=Math.pow(2,43);
					res+=Math.pow(2,44);
					res+=Math.pow(2,45);
					res+=Math.pow(2,46);
					res+=Math.pow(2,47);
				break;
				case 7:
					res+=Math.pow(2,48);
					res+=Math.pow(2,49);
				break;
				case 8:
					res+=Math.pow(2,50);
				break;
				
			}
			negate=false;
		} else {
			if (cn!=-1&&!/[1-7]/.test(rs[i])){
				switch (cn){
					case 1:
						res+=Math.pow(2,1)*(negate^rs[i]=="c");
						res+=Math.pow(2,2)*(negate^rs[i]=="e");
					break;
					case 2:
						res+=Math.pow(2,3)*(negate^rs[i]=="a");
						res+=Math.pow(2,4)*(negate^rs[i]=="c");
						res+=Math.pow(2,5)*(negate^rs[i]=="e");
						res+=Math.pow(2,6)*(negate^rs[i]=="i");
						res+=Math.pow(2,7)*(negate^rs[i]=="k");
						res+=Math.pow(2,8)*(negate^rs[i]=="n");
					break;
					case 3:
						res+=Math.pow(2,9)*(negate^rs[i]=="a");
						res+=Math.pow(2,10)*(negate^rs[i]=="c");
						res+=Math.pow(2,11)*(negate^rs[i]=="e");
						res+=Math.pow(2,12)*(negate^rs[i]=="i");
						res+=Math.pow(2,13)*(negate^rs[i]=="j");
						res+=Math.pow(2,14)*(negate^rs[i]=="k");
						res+=Math.pow(2,15)*(negate^rs[i]=="n");
						res+=Math.pow(2,16)*(negate^rs[i]=="q");
						res+=Math.pow(2,17)*(negate^rs[i]=="r");
						res+=Math.pow(2,18)*(negate^rs[i]=="y");
					break;
					case 4:
						res+=Math.pow(2,19)*(negate^rs[i]=="c");
						res+=Math.pow(2,20)*(negate^rs[i]=="e");
						res+=Math.pow(2,21)*(negate^rs[i]=="k");
						res+=Math.pow(2,22)*(negate^rs[i]=="a");
						res+=Math.pow(2,23)*(negate^rs[i]=="i");
						res+=Math.pow(2,24)*(negate^rs[i]=="n");
						res+=Math.pow(2,25)*(negate^rs[i]=="y");
						res+=Math.pow(2,26)*(negate^rs[i]=="q");
						res+=Math.pow(2,27)*(negate^rs[i]=="j");
						res+=Math.pow(2,28)*(negate^rs[i]=="r");
						res+=Math.pow(2,29)*(negate^rs[i]=="t");
						res+=Math.pow(2,30)*(negate^rs[i]=="w");
						res+=Math.pow(2,31)*(negate^rs[i]=="z");
					break;
					case 5:
						res+=Math.pow(2,32)*(negate^rs[i]=="c");
						res+=Math.pow(2,33)*(negate^rs[i]=="e");
						res+=Math.pow(2,34)*(negate^rs[i]=="k");
						res+=Math.pow(2,35)*(negate^rs[i]=="a");
						res+=Math.pow(2,36)*(negate^rs[i]=="i");
						res+=Math.pow(2,37)*(negate^rs[i]=="n");
						res+=Math.pow(2,38)*(negate^rs[i]=="y");
						res+=Math.pow(2,39)*(negate^rs[i]=="q");
						res+=Math.pow(2,40)*(negate^rs[i]=="j");
						res+=Math.pow(2,41)*(negate^rs[i]=="r");
					break;
					case 6:
						res+=Math.pow(2,42)*(negate^rs[i]=="c");
						res+=Math.pow(2,43)*(negate^rs[i]=="e");
						res+=Math.pow(2,44)*(negate^rs[i]=="k");
						res+=Math.pow(2,45)*(negate^rs[i]=="a");
						res+=Math.pow(2,46)*(negate^rs[i]=="i");
						res+=Math.pow(2,47)*(negate^rs[i]=="n");
					break;
					case 7:
						res+=Math.pow(2,48)*(negate^rs[i]=="c");
						res+=Math.pow(2,49)*(negate^rs[i]=="e");
					break;
				}
			}
			if (rs[i]=="0"){
				res+=Math.pow(2,0);
				negate=false;
			}
			if (rs[i]=="1"){
				cn=1;
				negate=false;
			}
			if (rs[i]=="2"){
				cn=2;
				negate=false;
			}
			if (rs[i]=="3"){
				cn=3;
				negate=false;
			}
			if (rs[i]=="4"){
				cn=4;
				negate=false;
			}
			if (rs[i]=="5"){
				cn=5;
				negate=false;
			}
			if (rs[i]=="6"){
				cn=6;
				negate=false;
			}
			if (rs[i]=="7"){
				cn=7;
				negate=false;
			}
			if (rs[i]=="8"){
				res+=Math.pow(2,50);
				negate=false;
			}
			if (rs[i]=="-"){
				negate=true;
			}
		}
		i++
	}
	negate=false;
	cn=-1;
	while (rs[i]!=undefined){
		if (/[0-8]/.test(rs[i])&&(/[0-8]/.test(rs[i+1])|rs[i+1]==undefined)){
			switch (parseInt(rs[i],10)){
				case 0:
					res2+=Math.pow(2,0);
				break;
				case 1:
					res2+=Math.pow(2,1);
					res2+=Math.pow(2,2);
				break;
				case 2:
					res2+=Math.pow(2,3);
					res2+=Math.pow(2,4);
					res2+=Math.pow(2,5);
					res2+=Math.pow(2,6);
					res2+=Math.pow(2,7);
					res2+=Math.pow(2,8);
				break;
				case 3:
					res2+=Math.pow(2,9);
					res2+=Math.pow(2,10);
					res2+=Math.pow(2,11);
					res2+=Math.pow(2,12);
					res2+=Math.pow(2,13);
					res2+=Math.pow(2,14);
					res2+=Math.pow(2,15);
					res2+=Math.pow(2,16);
					res2+=Math.pow(2,17);
					res2+=Math.pow(2,18);
				break;
				case 4:
					res2+=Math.pow(2,19);
					res2+=Math.pow(2,20);
					res2+=Math.pow(2,21);
					res2+=Math.pow(2,22);
					res2+=Math.pow(2,23);
					res2+=Math.pow(2,24);
					res2+=Math.pow(2,25);
					res2+=Math.pow(2,26);
					res2+=Math.pow(2,27);
					res2+=Math.pow(2,28);
					res2+=Math.pow(2,29);
					res2+=Math.pow(2,30);
					res2+=Math.pow(2,31);
				break;
				case 5:
					res2+=Math.pow(2,32);
					res2+=Math.pow(2,33);
					res2+=Math.pow(2,34);
					res2+=Math.pow(2,35);
					res2+=Math.pow(2,36);
					res2+=Math.pow(2,37);
					res2+=Math.pow(2,38);
					res2+=Math.pow(2,39);
					res2+=Math.pow(2,40);
					res2+=Math.pow(2,41);
				break;
				case 6:
					res2+=Math.pow(2,42);
					res2+=Math.pow(2,43);
					res2+=Math.pow(2,44);
					res2+=Math.pow(2,45);
					res2+=Math.pow(2,46);
					res2+=Math.pow(2,47);
				break;
				case 7:
					res2+=Math.pow(2,48);
					res2+=Math.pow(2,49);
				break;
				case 8:
					res2+=Math.pow(2,50);
				break;
				
			}
			negate=false;
		} else {
			if (cn!=-1&&!/[1-7]/.test(rs[i])){
				switch (cn){
					case 1:
						res2+=Math.pow(2,1)*(negate^rs[i]=="c");
						res2+=Math.pow(2,2)*(negate^rs[i]=="e");
					break;
					case 2:
						res2+=Math.pow(2,3)*(negate^rs[i]=="a");
						res2+=Math.pow(2,4)*(negate^rs[i]=="c");
						res2+=Math.pow(2,5)*(negate^rs[i]=="e");
						res2+=Math.pow(2,6)*(negate^rs[i]=="i");
						res2+=Math.pow(2,7)*(negate^rs[i]=="k");
						res2+=Math.pow(2,8)*(negate^rs[i]=="n");
					break;
					case 3:
						res2+=Math.pow(2,9)*(negate^rs[i]=="a");
						res2+=Math.pow(2,10)*(negate^rs[i]=="c");
						res2+=Math.pow(2,11)*(negate^rs[i]=="e");
						res2+=Math.pow(2,12)*(negate^rs[i]=="i");
						res2+=Math.pow(2,13)*(negate^rs[i]=="j");
						res2+=Math.pow(2,14)*(negate^rs[i]=="k");
						res2+=Math.pow(2,15)*(negate^rs[i]=="n");
						res2+=Math.pow(2,16)*(negate^rs[i]=="q");
						res2+=Math.pow(2,17)*(negate^rs[i]=="r");
						res2+=Math.pow(2,18)*(negate^rs[i]=="y");
					break;
					case 4:
						res2+=Math.pow(2,19)*(negate^rs[i]=="c");
						res2+=Math.pow(2,20)*(negate^rs[i]=="e");
						res2+=Math.pow(2,21)*(negate^rs[i]=="k");
						res2+=Math.pow(2,22)*(negate^rs[i]=="a");
						res2+=Math.pow(2,23)*(negate^rs[i]=="i");
						res2+=Math.pow(2,24)*(negate^rs[i]=="n");
						res2+=Math.pow(2,25)*(negate^rs[i]=="y");
						res2+=Math.pow(2,26)*(negate^rs[i]=="q");
						res2+=Math.pow(2,27)*(negate^rs[i]=="j");
						res2+=Math.pow(2,28)*(negate^rs[i]=="r");
						res2+=Math.pow(2,29)*(negate^rs[i]=="t");
						res2+=Math.pow(2,30)*(negate^rs[i]=="w");
						res2+=Math.pow(2,31)*(negate^rs[i]=="z");
					break;
					case 5:
						res2+=Math.pow(2,32)*(negate^rs[i]=="c");
						res2+=Math.pow(2,33)*(negate^rs[i]=="e");
						res2+=Math.pow(2,34)*(negate^rs[i]=="k");
						res2+=Math.pow(2,35)*(negate^rs[i]=="a");
						res2+=Math.pow(2,36)*(negate^rs[i]=="i");
						res2+=Math.pow(2,37)*(negate^rs[i]=="n");
						res2+=Math.pow(2,38)*(negate^rs[i]=="y");
						res2+=Math.pow(2,39)*(negate^rs[i]=="q");
						res2+=Math.pow(2,40)*(negate^rs[i]=="j");
						res2+=Math.pow(2,41)*(negate^rs[i]=="r");
					break;
					case 6:
						res2+=Math.pow(2,42)*(negate^rs[i]=="c");
						res2+=Math.pow(2,43)*(negate^rs[i]=="e");
						res2+=Math.pow(2,44)*(negate^rs[i]=="k");
						res2+=Math.pow(2,45)*(negate^rs[i]=="a");
						res2+=Math.pow(2,46)*(negate^rs[i]=="i");
						res2+=Math.pow(2,47)*(negate^rs[i]=="n");
					break;
					case 7:
						res2+=Math.pow(2,48)*(negate^rs[i]=="c");
						res2+=Math.pow(2,49)*(negate^rs[i]=="e");
					break;
				}
			}
			if (rs[i]=="0"){
				res2+=Math.pow(2,0);
				negate=false;
			}
			if (rs[i]=="1"){
				cn=1;
				negate=false;
			}
			if (rs[i]=="2"){
				cn=2;
				negate=false;
			}
			if (rs[i]=="3"){
				cn=3;
				negate=false;
			}
			if (rs[i]=="4"){
				cn=4;
				negate=false;
			}
			if (rs[i]=="5"){
				cn=5;
				negate=false;
			}
			if (rs[i]=="6"){
				cn=6;
				negate=false;
			}
			if (rs[i]=="7"){
				cn=7;
				negate=false;
			}
			if (rs[i]=="8"){
				res2+=Math.pow(2,50);
				negate=false;
			}
			if (rs[i]=="-"){
				negate=true;
			}
		}
		i++
	}
	return [res,res2];
}

function not17(n){
	return Math.pow(2,nttbl.length)-1-n
}
function inRange(m,mx,rule){
	var mp=parseRule(m)[0]
	var mxp=parseRule(mx)[0]
	var mrule=parseRule(rule)[0]
	for (var i=0;i<nttbl.length;i++){
		if (hasbit(mp,i)){
			if (!hasbit(mrule,i)){return false}
		}
		if (!hasbit(mxp,i)){
			if (hasbit(mrule,i)){return false}
		}
	}
	mp=parseRule(m)[1]
	mxp=parseRule(mx)[1]
	mrule=parseRule(rule)[1]
	for (var i=0;i<nttbl.length;i++){
		if (hasbit(mp,i)){
			if (!hasbit(mrule,i)){return false}
		}
		if (!hasbit(mxp,i)){
			if (hasbit(mrule,i)){return false}
		}
	}
	return true
}
var apgchars="0123456789abcdefghijklmnopqrstuv"
function rle(apgcode){
	var contenta=apgcode.split("_")[1];
	var x=0;
	var y=0;
	var res=[];
	for (var i=0;i<contenta.split("z").length*5;i++){
		res[i]=[];
	}
	contenta=contenta.split("w").join("00");
	contenta=contenta.split("x").join("000");
	contenta=contenta.split("y1").join("00000");
	contenta=contenta.split("y2").join("000000");
	contenta=contenta.split("y3").join("0000000");
	contenta=contenta.split("y4").join("00000000");
	contenta=contenta.split("y5").join("000000000");
	contenta=contenta.split("y6").join("0000000000");
	contenta=contenta.split("y7").join("00000000000");
	contenta=contenta.split("y8").join("000000000000");
	contenta=contenta.split("y9").join("0000000000000");
	contenta=contenta.split("ya").join("00000000000000");
	contenta=contenta.split("yb").join("000000000000000");
	contenta=contenta.split("yc").join("0000000000000000");
	contenta=contenta.split("yd").join("00000000000000000");
	contenta=contenta.split("ye").join("000000000000000000");
	contenta=contenta.split("yf").join("0000000000000000000");
	contenta=contenta.split("yg").join("00000000000000000000");
	contenta=contenta.split("yh").join("000000000000000000000");
	contenta=contenta.split("yi").join("0000000000000000000000");
	contenta=contenta.split("yj").join("00000000000000000000000");
	contenta=contenta.split("yk").join("000000000000000000000000");
	contenta=contenta.split("yl").join("0000000000000000000000000");
	contenta=contenta.split("ym").join("00000000000000000000000000");
	contenta=contenta.split("yn").join("000000000000000000000000000");
	contenta=contenta.split("yo").join("0000000000000000000000000000");
	contenta=contenta.split("yp").join("00000000000000000000000000000");
	contenta=contenta.split("yq").join("000000000000000000000000000000");
	contenta=contenta.split("yr").join("0000000000000000000000000000000");
	contenta=contenta.split("ys").join("00000000000000000000000000000000");
	contenta=contenta.split("yt").join("000000000000000000000000000000000");
	contenta=contenta.split("yu").join("0000000000000000000000000000000000");
	contenta=contenta.split("yv").join("00000000000000000000000000000000000");
	contenta=contenta.split("yw").join("000000000000000000000000000000000000");
	contenta=contenta.split("yx").join("0000000000000000000000000000000000000");
	contenta=contenta.split("yy").join("00000000000000000000000000000000000000");
	contenta=contenta.split("yz").join("000000000000000000000000000000000000000");
	contenta=contenta.split("y0").join("0000");
	for (var i=0;i<contenta.length;i++){
		if (apgchars.includes(contenta[i])){
			var char="0".repeat(Math.max(5-apgchars.indexOf(contenta[i]).toString(2).length,0))+apgchars.indexOf(contenta[i]).toString(2)
			var verticaldata=(char).toString(2).substr((char).toString(2).length-5,5)
			for (var j=0;j<5;j++){
				res[y+(4-j)][x]=verticaldata[j]
			}
			x++
		}
		if (contenta[i]=="z"){
			y+=5;
			x=0;
		}
	}
	var res2=""; //final rle
	for (var i=0;i<res.length;i++){
		for (var j=0;j<res[i].length;j++){
			res2+=res[i][j]==1?"o":"b";
		}
		res2+=i==res.length-1?"!":"$"
	}
	return res2
}
function on(x,y,univ){
	var res=0;
	for (var i=0;i<univ.length;i++){
		if (univ[i][0]==x&&univ[i][1]==y&&univ[i][2]){
			res=1;
			break;
		}
	}
	return res
}
function exist(x,y,univ){
	var res=false;
	for (var i=0;i<univ.length;i++){
		if (univ[i][0]==x&&univ[i][1]==y){
			res=true;
			break;
		}
	}
	return res
}
function aeq(a1,a2){
	if (a1.length!=a2.length){return false}
	for (var i=0;i<a1.length;i++){
		if (a1[i]!=a2[i]){return false}
	}
	return true
}
function getnapkin(x,y,univ){
	return [
		on(x,y+1,univ),
		on(x+1,y+1,univ),
		on(x+1,y,univ),
		on(x+1,y-1,univ),
		on(x,y-1,univ),
		on(x-1,y-1,univ),
		on(x-1,y,univ),
		on(x-1,y+1,univ)
	]
}
function napeq(np,tr){
	for (var i=0;i<np.length;i++){
		if (np[i]!=tr[i+1]){return false}
	}
	return true
}
function gettransition(nap){
	for (var i=0;i<nttbl.length;i++){
		if (napeq(nap,nttbl[i])){return ntchars[i]}
	}
	return false;
}
function getneighborhood(x,y,univ){
	var napkin=getnapkin(x,y,univ)
	if (gettransition(napkin))return gettransition(napkin);
	napkin=rotc(napkin)
	if (gettransition(napkin))return gettransition(napkin);
	napkin=rotc(napkin)
	if (gettransition(napkin))return gettransition(napkin);
	napkin=rotc(napkin)
	if (gettransition(napkin))return gettransition(napkin);
	napkin=rotc(napkin)
	napkin=fliph(napkin)
	if (gettransition(napkin))return gettransition(napkin);
	napkin=rotc(napkin)
	if (gettransition(napkin))return gettransition(napkin);
	napkin=rotc(napkin)
	if (gettransition(napkin))return gettransition(napkin);
	napkin=rotc(napkin)
	if (gettransition(napkin))return gettransition(napkin);
	napkin=rotc(napkin)
	napkin=flipv(napkin)
	if (gettransition(napkin))return gettransition(napkin);
	napkin=rotc(napkin)
	if (gettransition(napkin))return gettransition(napkin);
	napkin=rotc(napkin)
	if (gettransition(napkin))return gettransition(napkin);
	napkin=rotc(napkin)
	if (gettransition(napkin))return gettransition(napkin);
	napkin=rotc(napkin)
	napkin=fliph(napkin)
	if (gettransition(napkin))return gettransition(napkin);
	napkin=rotc(napkin)
	if (gettransition(napkin))return gettransition(napkin);
	napkin=rotc(napkin)
	if (gettransition(napkin))return gettransition(napkin);
	napkin=rotc(napkin)
	if (gettransition(napkin))return gettransition(napkin);
	return false
}
var napkin=[[0,1],[1,1],[-1,1],[0,-1],[1,-1],[-1,-1],[1,0],[-1,0]]
function minmaxrule(rle,gens,rule){ //here we go :(
	var univ=[];
	(()=>{
		var i=0;
		var x=0;
		var y=0;
		while (rle[i]!="!"){
			if (rle[i]=="$"){
				y++;x=0
			} else {
				if (rle[i]=="o")univ.push([x,y,1,0])
				x++
			}
			i++
		}
	})()
	var minrule=[0,0]
	var maxrule=parseRule("B12345678/S012345678")
	for (var i=0;i<gens;i++){
		for (var j=univ.length-1;j>=0;j--){
			var neighbors=getneighborhood(univ[j][0],univ[j][1],univ);
			if (hasbit(parseRule(rule)[1],ntchars.indexOf(neighbors))){ //check if transition is part of rule
				univ[j][3]=1
				if (!hasbit(minrule[1],ntchars.indexOf(neighbors))){
					minrule[1]+=Math.pow(2,ntchars.indexOf(neighbors))
				}
			} else {
				univ[j][3]=0
				if (hasbit(maxrule[1],ntchars.indexOf(neighbors))){
					maxrule[1]-=Math.pow(2,ntchars.indexOf(neighbors))
				}
			}
		}
		for (var j=univ.length-1;j>=0;j--){
			for (var k=0;k<napkin.length;k++){
				var neighbors=getneighborhood(univ[j][0]+napkin[k][0],univ[j][1]+napkin[k][1],univ);
				
				if(!exist(univ[j][0]+napkin[k][0],univ[j][1]+napkin[k][1],univ)){
					if (hasbit(parseRule(rule)[0],ntchars.indexOf(neighbors))){
						univ.push([univ[j][0]+napkin[k][0],univ[j][1]+napkin[k][1],0,1])
						if (!hasbit(minrule[0],ntchars.indexOf(neighbors))){
							minrule[0]+=Math.pow(2,ntchars.indexOf(neighbors))
						}
					} else {
						if (hasbit(maxrule[0],ntchars.indexOf(neighbors))){
							maxrule[0]-=Math.pow(2,ntchars.indexOf(neighbors))
						}
						if (!neighbors){
							console.log(getnapkin(univ[j][0]+napkin[k][0],univ[j][1]+napkin[k][1],univ))
						}
					}
				}
			}
		}
		for (var j=univ.length-1;j>=0;j--){
			if (univ[j][3]) univ[j][2]=1
			else univ.splice(j,1)
		}
	}
	return ["B"+ruletostring(minrule[0])+"/S"+ruletostring(minrule[1]),"B"+ruletostring(maxrule[0])+"/S"+ruletostring(maxrule[1])]
}
function getinfo(apgcode,rule){
	var arle=rle(apgcode)
	var period=apgcode.startsWith("xs")?1:apgcode.split("_")[0].substr(2);
	var minmax=minmaxrule(arle,period,rule)
	var type="unknown"
	switch (apgcode.substr(0,2)){
		case "xp":
			type="oscillator";
			break;
		case "xq":
			type="spaceship";
			break;
		case "xs":
			type="still life";
			break;
	}
	return [arle,minmax[0],minmax[1],type,period,apgcode]
}
function dbcensus(info,rule){
	console.log(rule+" in progress... (census "+censusid+")")
	var ninfo=info.split("\n")
	var blacktmp=fs.readFileSync("blacklist.txt").toString("utf8").split("\n")
	var dbtmp=[]
	var exit=false;
	var to=setTimeout(()=>{exit=true},120000)
	for (var i=0;i<ninfo.length;i++){
		if (!blacktmp.includes(ninfo[i])&&ninfo[i].startsWith("xq")){
			dbtmp.push(getinfo(ninfo[i],rule))
			blacktmp.push(ninfo[i])
		}
		if(exit){console.log("took over 2 minutes, stopping");break}
	}
	clearTimeout(to)
	if (dbtmp.length){
		var dbs=fs.readFileSync("db.js").toString("utf8")
		dbs=dbs.substr(0,dbs.length-2)
		for (var i=0;i<dbtmp.length;i++){
			dbs+="[\""+dbtmp[i][0]+"\",\""+dbtmp[i][1]+"\",\""+dbtmp[i][2]+"\",\""+dbtmp[i][3]+"\",\""+dbtmp[i][4]+"\",\""+dbtmp[i][5]+"\"],"
		}
		dbs+="]"
		fs.writeFileSync("db.js",dbs.split("][").join("],["))
		fs.writeFileSync("blacklist.txt",blacktmp.join("\n"))
	} else {console.log("census had no information")}
	console.log(rule+" completed")
	dbcensusi(clist[censusid++])
}


async function getcensus(cname,cb){
	console.log("getting data for census "+cname.split("s").join("/S").split("b").join("B"))
	var data="a"
	get.concat("http://catagolue.appspot.com/textcensus/"+cname+"/C1/",(err,res,d)=>{
		
		if(err)throw err
		data=d.toString("utf8")
		data=data.split("\"")
		data.splice(0,4)
		data=data.join("").split(/[\n,]/)
		for (var i=data.length-1;i>=0;i--){
			if (!(i%2)){
				data.splice(i,1)
			}
		}
		data.splice(data.length-1,1)
		data=data.filter(w=>w.startsWith("x")).join("\n")
		cb(data)
	})
}
async function dbcensusi(cname){
	getcensus(cname,d=>{
		cname=cname.split("s").join("/S").split("b").join("B")
		dbcensus(d,cname)
	})
}
var censusid=440;
clist=fs.readFileSync("censuslist.txt").toString("utf8")
clist=clist.split("\n");
dbcensusi(clist[censusid++])
//console.log(minmaxrule("ooo$booo!",2,"B3/S23"))
//console.log(getinfo("xp2_7e","B3/S23"))
