let hasStorage=!1;hasStorage="undefined"!=typeof Storage,$.ajaxSetup({cache:!1});let latestIntervalID,override,defaultAllSchedules=JSON.parse('[[{"name":"1","start":"7:40","end":"8:30"},{"name":"2","start":"8:35","end":"9:30"},{"name":"3","start":"9:35","end":"10:27"},{"name":"Break","start":"10:27","end":"10:42"},{"name":"4","start":"10:47","end":"11:39"},{"name":"5","start":"11:44","end":"12:36"},{"name":"Lunch","start":"12:36","end":"13:06"},{"name":"6","start":"13:11","end":"14:03"},{"name":"7","start":"14:08","end":"15:00"}],[{"name":"1","start":"7:40","end":"8:30"},{"name":"2","start":"8:35","end":"10:10"},{"name":"Break","start":"10:10","end":"10:25"},{"name":"4","start":"10:30","end":"12:05"},{"name":"Tutorial","start":"12:10","end":"12:50"},{"name":"Lunch","start":"12:50","end":"13:20"},{"name":"6","start":"13:25","end":"15:00"}],[{"name":"1","start":"7:40","end":"8:30"},{"name":"3","start":"8:35","end":"10:10"},{"name":"Break","start":"10:10","end":"10:25"},{"name":"5","start":"10:30","end":"12:05"},{"name":"Lunch","start":"12:05","end":"12:35"},{"name":"7","start":"12:40","end":"14:15"}],[{"name":"1","start":"7:40","end":"8:30"},{"name":"2","start":"8:35","end":"10:10"},{"name":"Break","start":"10:10","end":"10:25"},{"name":"4","start":"10:30","end":"12:05"},{"name":"Tutorial","start":"12:10","end":"12:50"},{"name":"Lunch","start":"12:50","end":"13:20"},{"name":"6","start":"13:25","end":"15:00"}],[{"name":"1","start":"7:40","end":"8:30"},{"name":"3","start":"8:35","end":"10:10"},{"name":"Break","start":"10:10","end":"10:25"},{"name":"5","start":"10:30","end":"12:05"},{"name":"Lunch","start":"12:05","end":"12:35"},{"name":"7","start":"12:40","end":"14:15"}]]');function newDebugDate(){let e=new Date;return e.setTime(e.getTime()+0),e}function generateSchedule(e){let t,n=newDebugDate().getDay();if(override){const a=newDebugDate(),r=`${a.getDate()}-${a.getMonth()+1}-${a.getFullYear()}`;t=override[r]?override[r]:e[n-1]}else t=e[n-1];if(0!=n&&6!=n||override){$("#periods").html("<tr><th>Period</th><th>Start/End</th><th>Duration</th></tr>");let e=[];latestIntervalID&&clearInterval(latestIntervalID);for(let n=0;n<t.length;n++){currentP=t[n];let a=timeStringToDate(currentP.start),r=timeStringToDate(currentP.end);e.push({time:a.getTime(),name:"Start of "+currentP.name}),e.push({time:r.getTime(),name:"End of "+currentP.name});let s=a.toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:!0}),m=r.toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:!0}),l=currentP.name+("Break"!=currentP.name&&"Lunch"!=currentP.name&&getClassName(currentP.name)?": "+getClassName(currentP.name):"");document.getElementById("periods").innerHTML+=`<tr${"Break"==currentP.name||"Lunch"==currentP.name?" class='break'":" value="+currentP.name}>\n        <td>${l}</td>\n        <td>${s}</td>\n        <td>${m}</td>\n      </tr>`}$(".pinput").each(function(e){$(this).val(getClassName(String(e+1)))}),latestIntervalID=setInterval(renderTimer,1,e,n)}else $("#timer").text("No school today!")}function getClassName(e){return hasStorage&&localStorage.getItem(e)?localStorage.getItem(e):void 0}function timeStringToDate(e){let t=newDebugDate(),n=e.split(":");return t.setHours(n[0],n[1],0),t}function findNext(e){let t=newDebugDate();for(let n=0;n<e.length;n++)if(e[n].time>=t.getTime())return e[n]}$.get("https://gist.githubusercontent.com/piguyisme/e652e0a5009f17efde347c390767d069/raw/schedule.json",e=>{JSON.parse(e)!=defaultAllSchedules&&generateSchedule(defaultAllSchedules=JSON.parse(e))}),$.get("https://gist.githubusercontent.com/piguyisme/db88af35c569b7b5a8aff60c679f527c/raw/overrides.json",e=>{override=JSON.parse(e),generateSchedule(defaultAllSchedules)}),$(document).ready(()=>{generateSchedule(defaultAllSchedules)});let prevSec=0,prevNext=0;function renderTimer(e,t){t!=newDebugDate().getDay()&&generateSchedule(defaultAllSchedules),nextTime=findNext(e);let n=newDebugDate(),a=document.getElementById("timer");if(nextTime){let e=msToTime(nextTime.time-n.getTime());"visible"==document.visibilityState&&(a.innerHTML=e.minutes+":"+e.seconds+"."+e.milliseconds,prevNext!=nextTime&&($("#next").text("Until "+nextTime.name+(getClassName(nextTime.name.slice(-1))?": "+getClassName(nextTime.name.slice(-1)):"")),prevNext=nextTime)),prevSec!=e.seconds&&(document.title=e.minutes+":"+e.seconds,prevSec=e.seconds)}else a.innerText="School's Out!",document.title="School's Out!"}function msToTime(e){var t=Math.floor(e%1e3),n=Math.floor(e/1e3%60),a=Math.floor(e/6e4);return{minutes:a=a<10?"0"+a:a,seconds:n=n<10?"0"+n:n,milliseconds:t=t<100?t<10?"00"+t:"0"+t:t}}function setClassName(e,t){hasStorage&&(t&&""!=t?(localStorage.setItem(e,t),$(`tr[value=${e}] td:nth-child(1)`).text(e+": "+t)):(localStorage.removeItem(e),$(`tr[value=${e}] td:nth-child(1)`).text(e)))}$("#shownaming").click(()=>{$("#naming").stop(),$("#naming").slideToggle()}),$(".pinput").on("input",function(){let e=$(this);setClassName(e.attr("id")[1],e.val())});