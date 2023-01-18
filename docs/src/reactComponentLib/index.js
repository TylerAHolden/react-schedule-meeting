import{isValid as e,getDay as t,startOfMonth as r,format as a,differenceInMinutes as o,addMinutes as n,isSameDay as i,isSameMinute as l,isPast as c,isAfter as d,isToday as s,subMonths as m,addMonths as g,subDays as b,addDays as u,isBefore as p,isEqual as x}from"date-fns";import*as v from"react";import T,{useState as f,useEffect as y}from"react";import h from"color";import _ from"react-calendar";import{setup as w,styled as k}from"goober";import{shouldForwardProp as E}from"goober/should-forward-prop";const S=({direction:e})=>v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"26",height:"26",viewBox:"0 0 512 512"},v.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"48",d:"back"===e?"M328 112L184 256l144 144":"M184.001 400L328.001 256L184.001 112"}));w(T.createElement,void 0,void 0,E((e=>"$"!==e[0])));const C=k(_)`
  &.react-calendar,
  &.react-calendar *,
  &.react-calendar *:before,
  &.react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  button {
    margin: 0;
    border: 0;
    outline: none;
  }
  button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: hsl(0, 0%, 90.19607843137256%);
  }
  .react-calendar__navigation button[disabled] {
    background-color: hsl(0, 0%, 94.11764705882352%);
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers {
    font-weight: bold;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;
  }

  .day-tile {
    width: 60px;
    height: 60px;
    @media (max-width: 768px) {
      height: 45px;
    }
    color: rgba(var(--text-color-rgb), .9);
    padding: 5px;
    position: relative;
    z-index: 1;
    &::after {
      content: '';
      position: absolute;
      left: 2px;
      top: 2px;
      bottom: 2px;
      right: 2px;
      z-index: -1;
    }
  }

  .day-tile abbr {
    font-weight: bold;
    font-size: 15.33px;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: rgba(var(--text-color-rgb), .6);
  }

  button {
    margin-top: 2.5px !important;
    margin-bottom: 2.5px !important;
  }

  .active-day-tile {
    &::after {
      background: rgba(var(--primary-color-rgb), 0.222);
      border-radius: var(--border-radius);
    }
    color: rgba(var(--primary-color-text-shade-rgb), 1);
  }

  .active-day-tile:hover {
    opacity: 0.5;
  }

  .react-calendar__tile:disabled.day-tile {
    background: rgba(var(--background-color-rgb), 1);
  }

  .react-calendar__tile--now.day-tile {
    background: rgba(var(--background-color-rgb), 1);
    &::after {
      border-radius: var(--border-radius);
      background: rgba(var(--primary-color-rgb), 0.111);
    }
  }

  .react-calendar__tile--now:hover.day-tile {
    background: rgba(var(--background-color-rgb), 1);
    &::after {
      border-radius: var(--border-radius);
      background: rgba(var(--primary-color-rgb), 0.111);
    }
  }

  .react-calendar__tile:hover.day-tile {
    background: rgba(var(--background-color-rgb), 1);
  }

  .react-calendar__tile--active.day-tile {
    background: rgba(var(--background-color-rgb), 1);
    color: rgba(var(--primary-color-text-shade-rgb), 1);
    &::after {
      border-radius: var(--border-radius);
      border: solid rgba(var(--primary-color-rgb), 0.111) 1px;
    }
  }

  .react-calendar__tile--active:enabled.day-tile,
  .react-calendar__tile--active:enabled:focus.day-tile {
    &::after {
      background: rgba(var(--primary-color-rgb), 0.222)
      border-radius: var(--border-radius);
      border: solid rgba(var(--primary-color-rgb), 1) 1px;
    }
    &.react-calendar__tile--now {
      &::after {
        background: rgba(var(--primary-color-rgb), 0.111);
      }
    }
  }

  /* month day titles */
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    font-weight: normal;
    color: rgba(var(--text-color-rgb), 1);
    font-size: 14px;
    font-weight: 700;
  }

  .react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
    color: rgba(var(--text-color-rgb), 1);
  }

  /* calendar styles */
  &.react-calendar {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    border: none !important;
    width: 100% !important;
    min-height: 390px;
    @media (max-width: 768px) {
      min-height: 302px;
    }
  }
`,D=(e,t)=>a(e,"MM/dd/yyyy",{locale:t}),N=({availableTimeslots:a,onDaySelected:o,selectedDay:n,locale:i})=>{const[l,c]=f([]);y((()=>{const r=[];a.map((a=>{if(!e(new Date(a.startTime)))throw new Error(`Invalid date for start time on slot ${a.id}`);if(!e(new Date(a.endTime)))throw new Error(`Invalid date for end time on slot ${a.id}`);return t(new Date(a.startTime))!==t(new Date(a.endTime))&&r.push(D(new Date(a.endTime),i)),r.push(D(new Date(a.startTime),i)),null})),c([...new Set(r)])}),[a]);return T.createElement(C,{defaultView:"month",onClickDay:e=>{o(e)},showNavigation:!1,tileDisabled:e=>"month"===e.view&&!l.some((t=>t===D(e.date,i))),tileClassName:e=>l.some((t=>t===D(e.date,i)))?["day-tile","active-day-tile"]:"month"===e.view?"day-tile":null,value:n,activeStartDate:r(n)})},B=k("button")`
  padding: 16px;
  border: none;
  color: ${({selected:e})=>e?"rgba(var(--primary-color-contrast-rgb), 1)":"rgba(var(--text-color-rgb), 1)"};
  background-color: ${({selected:e})=>e?"rgba(var(--primary-color-rgb), 1)":"rgba(0,0,0,0)"};
  border-radius: var(--border-radius);
  outline: none;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  &:hover {
    opacity: 0.8;
    background-color: ${({selected:e})=>e?"rgba(var(--primary-color-rgb), 1)":"rgba(var(--background-color-contrast-rgb), 0.06)"};
  }
`,$=k("button")`
  padding: 12px 16px;
  margin: 4px;
  border: none;
  color: rgba(var(--primary-color-contrast-rgb), 1);
  background-color: rgba(var(--primary-color-rgb), 1);
  border-radius: var(--border-radius);
  outline: none;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  @media (max-width: 768px) {
    padding: 7px 12px;
  }
  :hover {
    opacity: 0.8;
  }
`,L=k("div")`
  display: flex;
  width: 100%;
  align-items: center;
`,F=k("button")`
  padding: 8px 24px;
  border: none;
  background-color: rgb(0, 0, 0, 0);
  border-radius: var(--border-radius);
  outline: none;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  height: 100%;
  color: rgba(var(--text-color-rgb), 1);
  &:hover {
    background-color: rgba(var(--background-color-contrast-rgb), 0.06);
  }
`,z=({confirmState:e,onStartTimeSelect:t,startTimeEvent:r,selected:o,onCancelClicked:n,format_startTimeFormatString:i,lang_confirmButtonText:l,lang_cancelButtonText:c,lang_selectedButtonText:d,locale:s})=>T.createElement(L,{className:"rsm-start-time-item"},T.createElement(B,{type:"button",className:"rsm-confirm-button",selected:Boolean(o||e),onClick:t},e&&!o&&`${l} `,o&&`${d} `,a(r.startTime,i,{locale:s})),(e||o)&&T.createElement(F,{type:"button",className:"rsm-cancel-button",onClick:n},c)),j=k("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 24px;
  padding-top: 16px;
`,R=k("div")`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  align-items: stretch;
  justify-content: flex-start;
  &.has-selection {
    button:not(.is-selected) {
      opacity: 0.5;
    }
  }
`,G=k("div")`
  position: absolute;
  width: 100%;
  height: 24px;
  left: 0;
  right: 0;
  z-index: 12;
  pointer-events: none;
  &.top {
    background: linear-gradient(180deg, rgba(var(--background-color-rgb), 1), rgba(var(--background-color-rgb), 0));
    top: 42px;
  }
  &.bottom {
    bottom: 0;
    background: linear-gradient(0deg, rgba(var(--background-color-rgb), 1), rgba(var(--background-color-rgb), 0));
  }
`,A=k("div")`
  flex-shrink: 0;
  flex: 1;
  padding: 0.5px;
  margin: 0px 8px;
  position: relative;
  background: ${({makeTransparent:e})=>e?"transparent":"rgba(var(--background-color-contrast-rgb), 0.05)"};
`,I=k("p")`
  margin: 0;
  opacity: 0.5;
  margin-bottom: 24px;
  font-size: 18px;
  color: rgba(var(--text-color-rgb), 1);
`,M=k("div")`
  height: 100%;
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`,O=k(B)`
  border: none;
  padding: 6px 18px;
  width: auto;
  text-align: left;
  p {
    margin: 0;
    color: inherit;
    font-weight: inherit;
    text-align: inherit;
  }
  small {
    font-weight: 700;
  }
  display: flex;
  align-items: center;
  svg {
    margin-left: 14px;
    margin-right: -4px;
  }
`,U=k(I)`
  font-size: 90%;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: var(--border-radius);
  border: 1px solid rgba(var(--background-color-contrast-rgb), 0.5);
`,H=({skipConfirmCheck:e,selectedDay:t,selectedStartTime:r,startTimeListItems:o=[],onStartTimeSelect:n,emptyListContentEl:i,lang_emptyListText:l,format_startTimeFormatString:c,lang_confirmButtonText:d,lang_cancelButtonText:s,lang_goToNextAvailableDayText:m,lang_noFutureTimesText:g,lang_selectedButtonText:b,onGoToNextAvailableDayClick:u,nextFutureStartTimeAvailable:p,format_nextFutureStartTimeAvailableFormatString:x,startTimeListStyle:v,setSelectedStartTime:h,locale:_})=>{const[w,k]=f(-1);y((()=>{k(-1)}),[t]);const E=T.createElement(M,null,T.createElement(T.Fragment,null,i||T.createElement(I,{className:"rsm-empty-list-text"},l),p?T.createElement(O,{type:"button",selected:!0,className:"rsm-next-available-date-button",onClick:u},T.createElement("p",null,T.createElement("small",null,m),T.createElement("br",null),a(p,x,{locale:_})),T.createElement(S,{direction:"forward"})):T.createElement(U,{className:"rsm-no-future-times-text"},g)));return T.createElement(T.Fragment,null,0===o.length?E:"scroll-list"===v?T.createElement(T.Fragment,null,T.createElement(G,{className:"top"}),T.createElement(G,{className:"bottom"}),T.createElement(j,null,o.map(((t,a)=>T.createElement(T.Fragment,{key:a},T.createElement(z,{locale:_,lang_selectedButtonText:b,lang_confirmButtonText:d,lang_cancelButtonText:s,format_startTimeFormatString:c,onCancelClicked:()=>(e=>{k(-1),r&&e.startTime.getTime()===r&&h(void 0)})(t),selected:Boolean(r&&r===t.startTime.getTime()),confirmState:a===w,startTimeEvent:t,onStartTimeSelect:()=>((t,r)=>{e||w===r?(n(t),k(-1)):k(r)})(t,a)}),a!==o.length-1&&T.createElement(A,{makeTransparent:w===a||w===a+1})))))):T.createElement(R,{className:r?"has-selection":""},o.map(((e,t)=>T.createElement($,{key:t,type:"button",className:r&&r===e.startTime.getTime()?"is-selected":"",onClick:()=>n(e)},a(e.startTime,c,{locale:_}))))))},V=k("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  --text-color-rgb: ${({$textColorRGB:e})=>e};
  --primary-color-text-shade-rgb: ${({$calendarColoredTextRGB:e})=>e};
  --background-color-rgb: ${({$backgroundColorRGB:e})=>e};
  --background-color-contrast-rgb: ${({$backgroundColorContrastRGB:e})=>e};
  --primary-color-rgb: ${({$primaryColorRGB:e})=>e};
  --primary-color-contrast-rgb: ${({$primaryColorContrastRGB:e})=>e};
  --border-radius: ${({$borderRadius:e})=>e}px;
`,W=k("div")`
  display: flex;
  border-radius: var(--border-radius);
  background: rgba(var(--background-color-rgb), 1);
  box-shadow: 0 5px 22px rgba(20, 21, 21, 0.22), 0px 1px 4px rgba(20, 21, 21, 0.14);
  padding: 16px;
  margin: 16px;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  @media (max-width: 768px) {
    padding: 8px;
    margin: 8px;
  }
`,q=k("div")`
  width: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 16px;
  @media (max-width: 768px) {
    width: auto;
    height: 1px;
  }
`,J=k("div")`
  flex: 1;
`,K=k("div")`
  flex: 1;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    min-height: 301px;
  }
`,P=k("div")`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`,Q=k("h3")`
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 24px;
  color: rgba(var(--text-color-rgb), 1);
`,X=k("div")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`,Y=k("button")`
  outline: none;
  background: none;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  opacity: 0.4;
  margin: 0;
  color: rgba(var(--text-color-rgb), 0.7);
  &:hover {
    opacity: 0.7;
    background: rgba(var(--background-color-contrast-rgb), 0.06);
  }
`,Z=({availableTimeslots:e=[],backgroundColor:t="#ffffff",borderRadius:r=0,className:p,defaultDate:x,emptyListContentEl:v,eventDurationInMinutes:_=30,eventStartTimeSpreadInMinutes:w=0,format_nextFutureStartTimeAvailableFormatString:k="cccc, LLLL do",format_selectedDateDayTitleFormatString:E="cccc, LLLL do",format_selectedDateMonthTitleFormatString:C="LLLL yyyy",format_startTimeFormatString:D="h:mm a",lang_cancelButtonText:B="Cancel",lang_confirmButtonText:$="Confirm",lang_emptyListText:L="No times available",lang_goToNextAvailableDayText:F="Next Available",lang_noFutureTimesText:z="No future times available",lang_selectedButtonText:j="Selected:",locale:R,onNoFutureTimesAvailable:G,onSelectedDayChange:A,onStartTimeSelect:I,primaryColor:M="#3f5b85",scheduleMeetingStyles:O,selectedStartTime:U,skipConfirmCheck:Z=!1,startTimeListStyle:ee="grid",textColor:te})=>{const re=h(M).rgb().array().join(","),ae=h(t).rgb().array().join(","),oe=h(t).isDark(),ne=te||(oe?"255, 255, 255":"34, 34, 34"),ie=h(M).isDark()?"255, 255, 255":"34, 34, 34",le=oe?"255, 255, 255":"34, 34, 34",ce=oe?h(M).lighten(.5).rgb().array().join(","):h(M).darken(.5).rgb().array().join(","),[de,se]=f(U?U.getTime():void 0),[me,ge]=f(new Date),[be,ue]=f([]),[pe,xe]=f([]),[ve,Te]=f(),[fe,ye]=f([]);y((()=>{se(U?U.getTime():void 0)}),[U]),y((()=>{const t=[...e];t.sort(((e,t)=>new Date(e.startTime).getTime()-new Date(t.startTime).getTime())),ye(t)}),[e]);y((()=>{const e=[];for(const t of fe){const r=o(new Date(t.endTime),new Date(t.startTime));let a=Math.floor(r/(_+w))-1;for(;a>=0;){const r={availableTimeslot:t,startTime:n(new Date(t.startTime),a*(_+w))};e.push(r),a--}}x&&ge(x),ue(e)}),[fe,_,w,x]),y((()=>{var e;const t=[];for(const e of be)i(e.startTime,me)&&0===t.filter((t=>l(t.startTime,e.startTime))).length&&(c(e.startTime)||t.push(e));const r=t.sort(((e,t)=>e.startTime.getTime()-t.startTime.getTime())),a=null===(e=be.find((e=>d(e.startTime,me)&&!s(e.startTime))))||void 0===e?void 0:e.startTime;be.length>0&&G&&!a&&0===r.length&&G(me),Te(a),xe(r)}),[me,be]);return T.createElement(V,{className:p,$primaryColorRGB:re,$borderRadius:r,style:O,$backgroundColorContrastRGB:le,$textColorRGB:ne,$backgroundColorRGB:ae,$primaryColorContrastRGB:ie,$calendarColoredTextRGB:ce},T.createElement(W,null,T.createElement(J,null,T.createElement(X,null,T.createElement(Y,{type:"button",className:"rsm-arrow-button",onClick:()=>{ge(m(me,1))}},T.createElement(S,{direction:"back"})),T.createElement(Q,{className:"rsm-date-title"},a(me,C,{locale:R})),T.createElement(Y,{type:"button",className:"rsm-arrow-button",onClick:()=>{ge(g(me,1))}},T.createElement(S,{direction:"forward"}))),T.createElement(N,{locale:R,selectedDay:me,availableTimeslots:fe,onDaySelected:e=>{ge(e),A&&A(e)}})),T.createElement(q,null),T.createElement(K,null,T.createElement(P,null,T.createElement(X,null,T.createElement(Y,{type:"button",className:"rsm-arrow-button",onClick:()=>{ge(b(me,1))}},T.createElement(S,{direction:"back"})),T.createElement(Q,{className:"rsm-date-title"},a(me,E,{locale:R})),T.createElement(Y,{type:"button",className:"rsm-arrow-button",onClick:()=>{ge(u(me,1))}},T.createElement(S,{direction:"forward"}))),T.createElement(H,{skipConfirmCheck:Z,selectedDay:me,selectedStartTime:de,locale:R,format_nextFutureStartTimeAvailableFormatString:k,nextFutureStartTimeAvailable:ve,lang_goToNextAvailableDayText:F,lang_noFutureTimesText:z,onGoToNextAvailableDayClick:()=>{ve&&ge(ve)},lang_confirmButtonText:$,lang_cancelButtonText:B,lang_emptyListText:L,lang_selectedButtonText:j,emptyListContentEl:v,onStartTimeSelect:e=>{const t=(e=>{const t=[null,null],r=o(e.startTime,new Date(e.availableTimeslot.startTime));if(0!==r){const a={oldId:e.availableTimeslot.id,startTime:e.availableTimeslot.startTime,endTime:n(new Date(e.availableTimeslot.startTime),r)};t[0]=a}const a=n(new Date(e.availableTimeslot.startTime),r+_);if(0!==o(a,new Date(e.availableTimeslot.endTime))){const r={oldId:e.availableTimeslot.id,startTime:a,endTime:e.availableTimeslot.endTime};t[1]=r}return t})(e),r=Object.assign(Object.assign({},e),{splitTimeslot:t,resetDate:()=>ge(x||new Date),resetSelectedTimeState:()=>se(void 0)});se(e.startTime.getTime()),I&&I(r)},startTimeListItems:pe,format_startTimeFormatString:D,startTimeListStyle:ee,setSelectedStartTime:se})))))};function ee(e,t){if(!e||!t)return[];const r=[...e],a=[...t];r.sort(((e,t)=>new Date(e.startTime).getTime()-new Date(t.startTime).getTime()));let o=0;for(;o<r.length;){const e=r[o];try{const t=new Date(e.startTime),n=new Date(e.endTime);"string"==typeof e.startTime&&(e.startTime=t),"string"==typeof e.endTime&&(e.endTime=n);for(const i of a)try{const a=new Date(i.startTime),l=new Date(i.endTime);if("string"==typeof i.startTime&&(i.startTime=a),"string"==typeof i.endTime&&(i.endTime=l),p(a,t)||x(a,t))p(t,l)&&(p(l,n)?e.startTime=l:(r.splice(o,1),o--));else if(p(a,n))if(p(l,n)){const t=Object.assign(Object.assign({},e),{startTime:l});e.endTime=a,r.splice(o+1,0,t),o--}else e.endTime=a}catch(e){throw console.error("Invalid Date for unavailable slot: ",i),e}}catch(t){throw console.error("Invalid Date for available slot: ",e),t}o++}return r}export{Z as ScheduleMeeting,ee as timeSlotDifference};
