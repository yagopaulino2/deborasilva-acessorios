const base = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
export const IconSearch = (p) => (<svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>);
export const IconHeart = ({ filled, ...p }) => (<svg {...base} {...p} fill={filled ? "currentColor" : "none"}><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z" /></svg>);
export const IconBag = (p) => (<svg {...base} {...p}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>);
export const IconClose = (p) => (<svg {...base} {...p}><path d="M5 5l14 14M19 5 5 19" /></svg>);
export const IconMenu = (p) => (<svg {...base} {...p}><path d="M4 8h16M4 16h16" /></svg>);
export const IconWhats = (p) => (
  <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.8 2 6.8L3 29l6.6-2c1.9 1 4 1.6 6.3 1.6 7.2 0 13-5.7 13-12.8S23.200 3 16 3Zm0 23.300c-2 0-3.900-.6-5.500-1.600l-.4-.2-3.900 1.200 1.300-3.800-.3-.4a10.300 10.300 0 0 1-1.600-5.500C5.600 10.200 10.200 5.700 16 5.700s10.400 4.500 10.400 10.100S21.700 26.300 16 26.300Zm5.700-7.600c-.3-.2-1.800-.9-2.100-1-.3-.1-.5-.2-.7.200l-.9 1.100c-.2.200-.3.200-.6.100-1.800-.9-3-1.600-4.100-3.600-.3-.5.300-.5.900-1.700.1-.2 0-.4 0-.5l-1-2.300c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1.100 1.100-1.100 2.600s1.100 3 1.300 3.200c.2.200 2.200 3.400 5.300 4.700 2 .8 2.700.9 3.700.7.600-.1 1.800-.7 2.100-1.500.3-.7.300-1.300.2-1.500-.1-.1-.3-.2-.6-.4Z" />
  </svg>
);
export const IconInstagram = (p) => (<svg {...base} {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></svg>);
export const IconMail = (p) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>);
export const IconPin = (p) => (<svg {...base} {...p}><path d="M12 21s-6.5-5.6-6.5-11a6.500 6.500 0 0 1 13 0c0 5.400-6.500 11-6.500 11Z" /><circle cx="12" cy="10" r="2.400" /></svg>);
export const IconArrow = (p) => (<svg {...base} width={18} height={18} {...p}><path d="M5 12h14m-5-5 5 5-5 5" /></svg>);
export const IconPlay = (p) => (<svg {...base} {...p}><path d="M8 5.500v13l11-6.500-11-6.500Z" fill="currentColor" /></svg>);
export const IconCube = (p) => (<svg {...base} {...p}><path d="m12 3 8 4.500v9L12 21l-8-4.500v-9L12 3Z" /><path d="m4 7.500 8 4.500 8-4.500M12 12v9" /></svg>);
export const IconRotate = (p) => (<svg {...base} {...p}><path d="M20 12a8 8 0 1 1-2.500-5.800M20 4v4.500h-4.500" /></svg>);
export const IconImage = (p) => (<svg {...base} {...p}><rect x="3.500" y="4.500" width="17" height="15" rx="2" /><circle cx="9" cy="10" r="1.600" /><path d="m4 18 5-5 4 4 3-3 4 4" /></svg>);
