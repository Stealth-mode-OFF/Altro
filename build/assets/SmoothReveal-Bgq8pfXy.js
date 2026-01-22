import{j as f,r as i}from"./react-vendor-Cv45K04h.js";function c({children:o,variant:t="default",className:a="",gradientFrom:n="none",id:s}){const e={default:"bg-[var(--background)]",elevated:"bg-[var(--background-elevated)]",subtle:"bg-[var(--background-subtle)]",accent:"bg-gradient-to-br from-[var(--primary-soft)] to-transparent"},r={top:"before:absolute before:inset-x-0 before:top-0 before:h-32 before:bg-gradient-to-b before:from-[var(--background)] before:to-transparent before:pointer-events-none before:z-10",bottom:"after:absolute after:inset-x-0 after:bottom-0 after:h-32 after:bg-gradient-to-t after:from-[var(--background)] after:to-transparent after:pointer-events-none after:z-10",none:""};return f.jsx("section",{id:s,className:`
        relative 
        ${e[t]}
        ${r[n]}
        ${a}
      `,style:{isolation:"isolate"},children:o})}function l({children:o,delay:t=0,className:a=""}){const[n,s]=i.useState(!1),e=i.useRef(null);return i.useEffect(()=>{const r=new IntersectionObserver(([b])=>{b.isIntersecting&&setTimeout(()=>s(!0),t)},{threshold:.1,rootMargin:"0px 0px -50px 0px"});return e.current&&r.observe(e.current),()=>{e.current&&r.unobserve(e.current)}},[t]),f.jsx("div",{ref:e,className:`
        transition-all
        duration-[var(--animation-duration-ultra-slow)]
        ease-[var(--ease-out-smooth)]
        ${n?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}
        ${a}
      `,children:o})}export{c as F,l as S};
