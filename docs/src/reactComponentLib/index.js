import{isValid as e,startOfMonth as t,format as r,differenceInMinutes as a,addMinutes as o,isSameDay as n,isSameMinute as i,isPast as l,isAfter as c,isToday as d,subMonths as s,addMonths as m,subDays as g,addDays as b,isBefore as u,isEqual as p}from"date-fns";import*as x from"react";import v,{useState as T,useEffect as f}from"react";import y from"color";import h from"react-calendar";import{setup as _,styled as w}from"goober";import{shouldForwardProp as k}from"goober/should-forward-prop";const E=({direction:e})=>x.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"26",height:"26",viewBox:"0 0 512 512"},x.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"48",d:"back"===e?"M328 112L184 256l144 144":"M184.001 400L328.001 256L184.001 112"}));_(v.createElement,void 0,void 0,k((e=>"$"!==e[0])));const S=w(h)`
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
`,C=(e,t)=>r(e,"MM/dd/yyyy",{locale:t}),D=({startTimeEventsList:r,onDaySelected:a,selectedDay:o,locale:n})=>{const[i,l]=T([]);f((()=>{const t=[];r.map((r=>{if(!e(new Date(r.startTime)))throw new Error(`Invalid date for start time on slot ${r.availableTimeslot.id}`);const a=C(r.startTime,n);return-1===t.indexOf(a)&&t.push(a),null})),l(t)}),[r]);return v.createElement(S,{defaultView:"month",onClickDay:e=>{a(e)},showNavigation:!1,tileDisabled:e=>"month"===e.view&&!i.some((t=>t===C(e.date,n))),tileClassName:e=>i.some((t=>t===C(e.date,n)))?["day-tile","active-day-tile"]:"month"===e.view?"day-tile":null,value:o,activeStartDate:t(o)})},N=w("button")`
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
`,B=w("button")`
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
`,L=w("div")`
  display: flex;
  width: 100%;
  align-items: center;
`,$=w("button")`
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
`,F=({confirmState:e,onStartTimeSelect:t,startTimeEvent:a,selected:o,onCancelClicked:n,format_startTimeFormatString:i,lang_confirmButtonText:l,lang_cancelButtonText:c,lang_selectedButtonText:d,locale:s})=>v.createElement(L,{className:"rsm-start-time-item"},v.createElement(N,{type:"button",className:"rsm-confirm-button",selected:Boolean(o||e),onClick:t},e&&!o&&`${l} `,o&&`${d} `,r(a.startTime,i,{locale:s})),(e||o)&&v.createElement($,{type:"button",className:"rsm-cancel-button",onClick:n},c)),z=w("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 24px;
  padding-top: 16px;
`,j=w("div")`
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
`,R=w("div")`
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
`,G=w("div")`
  flex-shrink: 0;
  flex: 1;
  padding: 0.5px;
  margin: 0px 8px;
  position: relative;
  background: ${({makeTransparent:e})=>e?"transparent":"rgba(var(--background-color-contrast-rgb), 0.05)"};
`,A=w("p")`
  margin: 0;
  opacity: 0.5;
  margin-bottom: 24px;
  font-size: 18px;
  color: rgba(var(--text-color-rgb), 1);
`,M=w("div")`
  height: 100%;
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`,I=w(N)`
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
`,O=w(A)`
  font-size: 90%;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: var(--border-radius);
  border: 1px solid rgba(var(--background-color-contrast-rgb), 0.5);
`,U=({skipConfirmCheck:e,selectedDay:t,selectedStartTime:a,startTimeListItems:o=[],onStartTimeSelect:n,emptyListContentEl:i,lang_emptyListText:l,format_startTimeFormatString:c,lang_confirmButtonText:d,lang_cancelButtonText:s,lang_goToNextAvailableDayText:m,lang_noFutureTimesText:g,lang_selectedButtonText:b,onGoToNextAvailableDayClick:u,nextFutureStartTimeAvailable:p,format_nextFutureStartTimeAvailableFormatString:x,startTimeListStyle:y,setSelectedStartTime:h,locale:_})=>{const[w,k]=T(-1);f((()=>{k(-1)}),[t]);const S=v.createElement(M,null,v.createElement(v.Fragment,null,i||v.createElement(A,{className:"rsm-empty-list-text"},l),p?v.createElement(I,{type:"button",selected:!0,className:"rsm-next-available-date-button",onClick:u},v.createElement("p",null,v.createElement("small",null,m),v.createElement("br",null),r(p,x,{locale:_})),v.createElement(E,{direction:"forward"})):v.createElement(O,{className:"rsm-no-future-times-text"},g)));return v.createElement(v.Fragment,null,0===o.length?S:"scroll-list"===y?v.createElement(v.Fragment,null,v.createElement(R,{className:"top"}),v.createElement(R,{className:"bottom"}),v.createElement(z,null,o.map(((t,r)=>v.createElement(v.Fragment,{key:r},v.createElement(F,{locale:_,lang_selectedButtonText:b,lang_confirmButtonText:d,lang_cancelButtonText:s,format_startTimeFormatString:c,onCancelClicked:()=>(e=>{k(-1),a&&e.startTime.getTime()===a&&h(void 0)})(t),selected:Boolean(a&&a===t.startTime.getTime()),confirmState:r===w,startTimeEvent:t,onStartTimeSelect:()=>((t,r)=>{e||w===r?(n(t),k(-1)):k(r)})(t,r)}),r!==o.length-1&&v.createElement(G,{makeTransparent:w===r||w===r+1})))))):v.createElement(j,{className:a?"has-selection":""},o.map(((e,t)=>v.createElement(B,{key:t,type:"button",className:a&&a===e.startTime.getTime()?"is-selected":"",onClick:()=>n(e)},r(e.startTime,c,{locale:_}))))))},H=w("div")`
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
`,V=w("div")`
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
`,W=w("div")`
  width: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 16px;
  @media (max-width: 768px) {
    width: auto;
    height: 1px;
  }
`,q=w("div")`
  flex: 1;
`,J=w("div")`
  flex: 1;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    min-height: 301px;
  }
`,K=w("div")`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`,P=w("h3")`
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 24px;
  color: rgba(var(--text-color-rgb), 1);
`,Q=w("div")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`,X=w("button")`
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
`,Y=({availableTimeslots:e=[],backgroundColor:t="#ffffff",borderRadius:u=0,className:p,defaultDate:x,emptyListContentEl:h,eventDurationInMinutes:_=30,eventStartTimeSpreadInMinutes:w=0,format_nextFutureStartTimeAvailableFormatString:k="cccc, LLLL do",format_selectedDateDayTitleFormatString:S="cccc, LLLL do",format_selectedDateMonthTitleFormatString:C="LLLL yyyy",format_startTimeFormatString:N="h:mm a",lang_cancelButtonText:B="Cancel",lang_confirmButtonText:L="Confirm",lang_emptyListText:$="No times available",lang_goToNextAvailableDayText:F="Next Available",lang_noFutureTimesText:z="No future times available",lang_selectedButtonText:j="Selected:",locale:R,onNoFutureTimesAvailable:G,onSelectedDayChange:A,onStartTimeSelect:M,primaryColor:I="#3f5b85",scheduleMeetingStyles:O,selectedStartTime:Y,skipConfirmCheck:Z=!1,startTimeListStyle:ee="grid",textColor:te})=>{const re=y(I).rgb().array().join(","),ae=y(t).rgb().array().join(","),oe=y(t).isDark(),ne=te||(oe?"255, 255, 255":"34, 34, 34"),ie=y(I).isDark()?"255, 255, 255":"34, 34, 34",le=oe?"255, 255, 255":"34, 34, 34",ce=oe?y(I).lighten(.5).rgb().array().join(","):y(I).darken(.5).rgb().array().join(","),[de,se]=T(Y?Y.getTime():void 0),[me,ge]=T(new Date),[be,ue]=T([]),[pe,xe]=T([]),[ve,Te]=T(),[fe,ye]=T([]);f((()=>{se(Y?Y.getTime():void 0)}),[Y]),f((()=>{const t=[...e];t.sort(((e,t)=>new Date(e.startTime).getTime()-new Date(t.startTime).getTime())),ye(t)}),[e]);f((()=>{const e=[];for(const t of fe){const r=a(new Date(t.endTime),new Date(t.startTime));let n=Math.floor(r/(_+w))-1;for(;n>=0;){const r={availableTimeslot:t,startTime:o(new Date(t.startTime),n*(_+w))};e.push(r),n--}}x&&ge(x),ue(e)}),[fe,_,w,x]),f((()=>{var e;const t=[];for(const e of be)n(e.startTime,me)&&0===t.filter((t=>i(t.startTime,e.startTime))).length&&(l(e.startTime)||t.push(e));const r=t.sort(((e,t)=>e.startTime.getTime()-t.startTime.getTime())),a=null===(e=be.find((e=>c(e.startTime,me)&&!d(e.startTime))))||void 0===e?void 0:e.startTime;be.length>0&&G&&!a&&0===r.length&&G(me),Te(a),xe(r)}),[me,be]);return v.createElement(H,{className:p,$primaryColorRGB:re,$borderRadius:u,style:O,$backgroundColorContrastRGB:le,$textColorRGB:ne,$backgroundColorRGB:ae,$primaryColorContrastRGB:ie,$calendarColoredTextRGB:ce},v.createElement(V,null,v.createElement(q,null,v.createElement(Q,null,v.createElement(X,{type:"button",className:"rsm-arrow-button",onClick:()=>{ge(s(me,1))}},v.createElement(E,{direction:"back"})),v.createElement(P,{className:"rsm-date-title"},r(me,C,{locale:R})),v.createElement(X,{type:"button",className:"rsm-arrow-button",onClick:()=>{ge(m(me,1))}},v.createElement(E,{direction:"forward"}))),v.createElement(D,{locale:R,selectedDay:me,startTimeEventsList:be,onDaySelected:e=>{ge(e),A&&A(e)}})),v.createElement(W,null),v.createElement(J,null,v.createElement(K,null,v.createElement(Q,null,v.createElement(X,{type:"button",className:"rsm-arrow-button",onClick:()=>{ge(g(me,1))}},v.createElement(E,{direction:"back"})),v.createElement(P,{className:"rsm-date-title"},r(me,S,{locale:R})),v.createElement(X,{type:"button",className:"rsm-arrow-button",onClick:()=>{ge(b(me,1))}},v.createElement(E,{direction:"forward"}))),v.createElement(U,{skipConfirmCheck:Z,selectedDay:me,selectedStartTime:de,locale:R,format_nextFutureStartTimeAvailableFormatString:k,nextFutureStartTimeAvailable:ve,lang_goToNextAvailableDayText:F,lang_noFutureTimesText:z,onGoToNextAvailableDayClick:()=>{ve&&ge(ve)},lang_confirmButtonText:L,lang_cancelButtonText:B,lang_emptyListText:$,lang_selectedButtonText:j,emptyListContentEl:h,onStartTimeSelect:e=>{const t=(e=>{const t=[null,null],r=a(e.startTime,new Date(e.availableTimeslot.startTime));if(0!==r){const a={oldId:e.availableTimeslot.id,startTime:e.availableTimeslot.startTime,endTime:o(new Date(e.availableTimeslot.startTime),r)};t[0]=a}const n=o(new Date(e.availableTimeslot.startTime),r+_);if(0!==a(n,new Date(e.availableTimeslot.endTime))){const r={oldId:e.availableTimeslot.id,startTime:n,endTime:e.availableTimeslot.endTime};t[1]=r}return t})(e),r=Object.assign(Object.assign({},e),{splitTimeslot:t,resetDate:()=>ge(x||new Date),resetSelectedTimeState:()=>se(void 0)});se(e.startTime.getTime()),M&&M(r)},startTimeListItems:pe,format_startTimeFormatString:N,startTimeListStyle:ee,setSelectedStartTime:se})))))};function Z(e,t){if(!e||!t)return[];const r=[...e],a=[...t];r.sort(((e,t)=>new Date(e.startTime).getTime()-new Date(t.startTime).getTime()));let o=0;for(;o<r.length;){const e=r[o];try{const t=new Date(e.startTime),n=new Date(e.endTime);"string"==typeof e.startTime&&(e.startTime=t),"string"==typeof e.endTime&&(e.endTime=n);for(const i of a)try{const a=new Date(i.startTime),l=new Date(i.endTime);if("string"==typeof i.startTime&&(i.startTime=a),"string"==typeof i.endTime&&(i.endTime=l),u(a,t)||p(a,t))u(t,l)&&(u(l,n)?e.startTime=l:(r.splice(o,1),o--));else if(u(a,n))if(u(l,n)){const t=Object.assign(Object.assign({},e),{startTime:l});e.endTime=a,r.splice(o+1,0,t),o--}else e.endTime=a}catch(e){throw console.error("Invalid Date for unavailable slot: ",i),e}}catch(t){throw console.error("Invalid Date for available slot: ",e),t}o++}return r}export{Y as ScheduleMeeting,Z as timeSlotDifference};
