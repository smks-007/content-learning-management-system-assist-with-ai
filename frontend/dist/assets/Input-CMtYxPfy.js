import{r as i,j as e,k as m,l as u}from"./index-Cm_8sblt.js";const y=i.forwardRef(({label:o,error:s,icon:t,type:l="text",className:n="",...d},c)=>{const[r,x]=i.useState(!1),a=l==="password",p=a?r?"text":"password":l;return e.jsxs("div",{className:"w-full",children:[o&&e.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5",children:o}),e.jsxs("div",{className:"relative",children:[t&&e.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400",children:t}),e.jsx("input",{ref:c,type:p,className:`
            block w-full rounded-lg bg-white dark:bg-dark-900 border 
            ${s?"border-rose-500 focus:ring-rose-500":"border-gray-300 dark:border-white/10 focus:border-primary-500 focus:ring-primary-500"}
            ${t?"pl-10":"pl-3"}
            ${a?"pr-10":"pr-3"}
            py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors
            ${n}
          `,...d}),a&&e.jsx("button",{type:"button",className:"absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",onClick:()=>x(!r),children:r?e.jsx(m,{}):e.jsx(u,{})})]}),s&&e.jsx("p",{className:"mt-1 text-sm text-rose-500",children:s.message||s})]})});y.displayName="Input";export{y as I};
