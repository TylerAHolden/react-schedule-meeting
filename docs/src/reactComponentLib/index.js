import{isValid as e,startOfMonth as t,format as r,differenceInMinutes as a,addMinutes as o,isSameDay as n,isSameMinute as i,isPast as l,isAfter as c,subMonths as d,addMonths as s,subDays as m,addDays as g,isBefore as b,isEqual as u}from"date-fns";import*as p from"react";import x,{useState as v,useEffect as T}from"react";import f from"color";import y from"react-calendar";import{setup as h,styled as _}from"goober";import{shouldForwardProp as w}from"goober/should-forward-prop";const k=({direction:e})=>p.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"26",height:"26",viewBox:"0 0 512 512"},p.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"48",d:"back"===e?"M328 112L184 256l144 144":"M184.001 400L328.001 256L184.001 112"}));h(x.createElement,void 0,void 0,w((e=>"$"!==e[0])));const E=_(y)`
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
`,S=(e,t)=>r(e,"MM/dd/yyyy",{locale:t}),C=({startTimeEventsList:r,onDaySelected:a,selectedDay:o,locale:n})=>{const[i,l]=v([]);T((()=>{const t=[];r.map((r=>{if(!e(new Date(r.startTime)))throw new Error(`Invalid date for start time on slot ${r.availableTimeslot.id}`);const a=S(r.startTime,n);return-1===t.indexOf(a)&&t.push(a),null})),l(t)}),[r]);return x.createElement(E,{defaultView:"month",onClickDay:e=>{a(e)},showNavigation:!1,tileDisabled:e=>"month"===e.view&&!i.some((t=>t===S(e.date,n))),tileClassName:e=>i.some((t=>t===S(e.date,n)))?["day-tile","active-day-tile"]:"month"===e.view?"day-tile":null,value:o,activeStartDate:t(o),locale:"fr"===(null==n?void 0:n.code)?"fr-FR":(null==n?void 0:n.code)||"en-US"})},D=_("button")`
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
`,N=_("button")`
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
`,B=_("div")`
  display: flex;
  width: 100%;
  align-items: center;
`,L=_("button")`
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
`,$=({confirmState:e,onStartTimeSelect:t,startTimeEvent:a,selected:o,onCancelClicked:n,format_startTimeFormatString:i,lang_confirmButtonText:l,lang_cancelButtonText:c,lang_selectedButtonText:d,locale:s})=>x.createElement(B,{className:"rsm-start-time-item"},x.createElement(D,{type:"button",className:"rsm-confirm-button",selected:Boolean(o||e),onClick:t},e&&!o&&`${l} `,o&&`${d} `,r(a.startTime,i,{locale:s})),(e||o)&&x.createElement(L,{type:"button",className:"rsm-cancel-button",onClick:n},c)),F=_("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 24px;
  padding-top: 16px;
`,z=_("div")`
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
`,R=_("div")`
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
`,j=_("div")`
  flex-shrink: 0;
  flex: 1;
  padding: 0.5px;
  margin: 0px 8px;
  position: relative;
  background: ${({makeTransparent:e})=>e?"transparent":"rgba(var(--background-color-contrast-rgb), 0.05)"};
`,G=_("p")`
  margin: 0;
  opacity: 0.5;
  margin-bottom: 24px;
  font-size: 18px;
  color: rgba(var(--text-color-rgb), 1);
`,A=_("div")`
  height: 100%;
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`,M=_(D)`
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
`,I=_(G)`
  font-size: 90%;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: var(--border-radius);
  border: 1px solid rgba(var(--background-color-contrast-rgb), 0.5);
`,O=({skipConfirmCheck:e,selectedDay:t,selectedStartTime:a,startTimeListItems:o=[],onStartTimeSelect:n,emptyListContentEl:i,lang_emptyListText:l,format_startTimeFormatString:c,lang_confirmButtonText:d,lang_cancelButtonText:s,lang_goToNextAvailableDayText:m,lang_noFutureTimesText:g,lang_selectedButtonText:b,onGoToNextAvailableDayClick:u,nextFutureStartTimeAvailable:p,format_nextFutureStartTimeAvailableFormatString:f,startTimeListStyle:y,setSelectedStartTime:h,locale:_})=>{const[w,E]=v(-1);T((()=>{E(-1)}),[t]);const S=x.createElement(A,null,x.createElement(x.Fragment,null,i||x.createElement(G,{className:"rsm-empty-list-text"},l),p?x.createElement(M,{type:"button",selected:!0,className:"rsm-next-available-date-button",onClick:u},x.createElement("p",null,x.createElement("small",null,m),x.createElement("br",null),r(p,f,{locale:_})),x.createElement(k,{direction:"forward"})):x.createElement(I,{className:"rsm-no-future-times-text"},g)));return x.createElement(x.Fragment,null,0===o.length?S:"scroll-list"===y?x.createElement(x.Fragment,null,x.createElement(R,{className:"top"}),x.createElement(R,{className:"bottom"}),x.createElement(F,null,o.map(((t,r)=>x.createElement(x.Fragment,{key:r},x.createElement($,{locale:_,lang_selectedButtonText:b,lang_confirmButtonText:d,lang_cancelButtonText:s,format_startTimeFormatString:c,onCancelClicked:()=>(e=>{E(-1),a&&e.startTime.getTime()===a&&h(void 0)})(t),selected:Boolean(a&&a===t.startTime.getTime()),confirmState:r===w,startTimeEvent:t,onStartTimeSelect:()=>((t,r)=>{e||w===r?(n(t),E(-1)):E(r)})(t,r)}),r!==o.length-1&&x.createElement(j,{makeTransparent:w===r||w===r+1})))))):x.createElement(z,{className:a?"has-selection":""},o.map(((e,t)=>x.createElement(N,{key:t,type:"button",className:a&&a===e.startTime.getTime()?"is-selected":"",onClick:()=>n(e)},r(e.startTime,c,{locale:_}))))))},U=_("div")`
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
`,H=_("div")`
  display: flex;
  border-radius: var(--border-radius);
  background: rgba(var(--background-color-rgb), 1);
  box-shadow:
    0 5px 22px rgba(20, 21, 21, 0.22),
    0px 1px 4px rgba(20, 21, 21, 0.14);
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
`,V=_("div")`
  width: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 16px;
  @media (max-width: 768px) {
    width: auto;
    height: 1px;
  }
`,W=_("div")`
  flex: 1;
`,q=_("div")`
  flex: 1;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    min-height: 301px;
  }
`,J=_("div")`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`,K=_("h3")`
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 24px;
  color: rgba(var(--text-color-rgb), 1);
`,P=_("div")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`,Q=_("button")`
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
`,X=({availableTimeslots:e=[],backgroundColor:t="#ffffff",borderRadius:b=0,className:u,defaultDate:p,emptyListContentEl:y,eventDurationInMinutes:h=30,eventStartTimeSpreadInMinutes:_=0,format_nextFutureStartTimeAvailableFormatString:w="cccc, LLLL do",format_selectedDateDayTitleFormatString:E="cccc, LLLL do",format_selectedDateMonthTitleFormatString:S="LLLL yyyy",format_startTimeFormatString:D="h:mm a",lang_cancelButtonText:N="Cancel",lang_confirmButtonText:B="Confirm",lang_emptyListText:L="No times available",lang_goToNextAvailableDayText:$="Next Available",lang_noFutureTimesText:F="No future times available",lang_selectedButtonText:z="Selected:",locale:R,onNoFutureTimesAvailable:j,onSelectedDayChange:G,onStartTimeSelect:A,primaryColor:M="#3f5b85",scheduleMeetingStyles:I,selectedStartTime:X,skipConfirmCheck:Y=!1,startTimeListStyle:Z="grid",textColor:ee})=>{const te=f(M).rgb().array().join(","),re=f(t).rgb().array().join(","),ae=f(t).isDark(),oe=ee||(ae?"255, 255, 255":"34, 34, 34"),ne=f(M).isDark()?"255, 255, 255":"34, 34, 34",ie=ae?"255, 255, 255":"34, 34, 34",le=ae?f(M).lighten(.5).rgb().array().join(","):f(M).darken(.5).rgb().array().join(","),[ce,de]=v(X?X.getTime():void 0),[se,me]=v(new Date),[ge,be]=v([]),[ue,pe]=v([]),[xe,ve]=v(),[Te,fe]=v([]);T((()=>{de(X?X.getTime():void 0)}),[X]),T((()=>{const t=[...e];t.sort(((e,t)=>new Date(e.startTime).getTime()-new Date(t.startTime).getTime())),fe(t)}),[e]);T((()=>{const e=[];for(const t of Te){const r=a(new Date(t.endTime),new Date(t.startTime));let n=Math.floor(r/(h+_))-1;for(;n>=0;){const r={availableTimeslot:t,startTime:o(new Date(t.startTime),n*(h+_))};e.push(r),n--}}p&&me(p);const t=e.sort(((e,t)=>e.startTime.getTime()-t.startTime.getTime()));be(t)}),[Te,h,_,p]),T((()=>{var e;const t=[];for(const e of ge)n(e.startTime,se)&&0===t.filter((t=>i(t.startTime,e.startTime))).length&&(l(e.startTime)||t.push(e));const r=t.sort(((e,t)=>e.startTime.getTime()-t.startTime.getTime())),a=null===(e=ge.find((e=>c(e.startTime,se))))||void 0===e?void 0:e.startTime;ge.length>0&&j&&!a&&0===r.length&&j(se),ve(a),pe(r)}),[se,ge]);return x.createElement(U,{className:u,$primaryColorRGB:te,$borderRadius:b,style:I,$backgroundColorContrastRGB:ie,$textColorRGB:oe,$backgroundColorRGB:re,$primaryColorContrastRGB:ne,$calendarColoredTextRGB:le},x.createElement(H,null,x.createElement(W,null,x.createElement(P,null,x.createElement(Q,{type:"button",className:"rsm-arrow-button",onClick:()=>{me(d(se,1))}},x.createElement(k,{direction:"back"})),x.createElement(K,{className:"rsm-date-title"},r(se,S,{locale:R})),x.createElement(Q,{type:"button",className:"rsm-arrow-button",onClick:()=>{me(s(se,1))}},x.createElement(k,{direction:"forward"}))),x.createElement(C,{locale:R,selectedDay:se,startTimeEventsList:ge,onDaySelected:e=>{me(e),G&&G(e)}})),x.createElement(V,null),x.createElement(q,null,x.createElement(J,null,x.createElement(P,null,x.createElement(Q,{type:"button",className:"rsm-arrow-button",onClick:()=>{me(m(se,1))}},x.createElement(k,{direction:"back"})),x.createElement(K,{className:"rsm-date-title"},r(se,E,{locale:R})),x.createElement(Q,{type:"button",className:"rsm-arrow-button",onClick:()=>{me(g(se,1))}},x.createElement(k,{direction:"forward"}))),x.createElement(O,{skipConfirmCheck:Y,selectedDay:se,selectedStartTime:ce,locale:R,format_nextFutureStartTimeAvailableFormatString:w,nextFutureStartTimeAvailable:xe,lang_goToNextAvailableDayText:$,lang_noFutureTimesText:F,onGoToNextAvailableDayClick:()=>{xe&&me(xe)},lang_confirmButtonText:B,lang_cancelButtonText:N,lang_emptyListText:L,lang_selectedButtonText:z,emptyListContentEl:y,onStartTimeSelect:e=>{const t=(e=>{const t=[null,null],r=a(e.startTime,new Date(e.availableTimeslot.startTime));if(0!==r){const a={oldId:e.availableTimeslot.id,startTime:e.availableTimeslot.startTime,endTime:o(new Date(e.availableTimeslot.startTime),r)};t[0]=a}const n=o(new Date(e.availableTimeslot.startTime),r+h);if(0!==a(n,new Date(e.availableTimeslot.endTime))){const r={oldId:e.availableTimeslot.id,startTime:n,endTime:e.availableTimeslot.endTime};t[1]=r}return t})(e),r=Object.assign(Object.assign({},e),{splitTimeslot:t,resetDate:()=>me(p||new Date),resetSelectedTimeState:()=>de(void 0)});de(e.startTime.getTime()),A&&A(r)},startTimeListItems:ue,format_startTimeFormatString:D,startTimeListStyle:Z,setSelectedStartTime:de})))))};function Y(e,t){if(!e||!t)return[];const r=[...e],a=[...t];r.sort(((e,t)=>new Date(e.startTime).getTime()-new Date(t.startTime).getTime()));let o=0;for(;o<r.length;){const e=r[o];try{const t=new Date(e.startTime),n=new Date(e.endTime);"string"==typeof e.startTime&&(e.startTime=t),"string"==typeof e.endTime&&(e.endTime=n);for(const i of a)try{const a=new Date(i.startTime),l=new Date(i.endTime);if("string"==typeof i.startTime&&(i.startTime=a),"string"==typeof i.endTime&&(i.endTime=l),b(a,t)||u(a,t))b(t,l)&&(b(l,n)?e.startTime=l:(r.splice(o,1),o--));else if(b(a,n))if(b(l,n)){const t=Object.assign(Object.assign({},e),{startTime:l});e.endTime=a,r.splice(o+1,0,t),o--}else e.endTime=a}catch(e){throw console.error("Invalid Date for unavailable slot: ",i),e}}catch(t){throw console.error("Invalid Date for available slot: ",e),t}o++}return r}export{X as ScheduleMeeting,Y as timeSlotDifference};
