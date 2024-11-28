import { SvgXml } from "react-native-svg";

export default (props: any) => {
  const xml = `
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" rx="24" fill="#F3F3F3"/>
<path d="M24 17C24.8284 17 25.5 17.6716 25.5 18.5C25.5 19.3284 24.8284 20 24 20C23.1716 20 22.5 19.3284 22.5 18.5C22.5 17.6716 23.1716 17 24 17Z" fill="#03363D"/>
<path d="M24 22.5C24.8284 22.5 25.5 23.1716 25.5 24C25.5 24.8284 24.8284 25.5 24 25.5C23.1716 25.5 22.5 24.8284 22.5 24C22.5 23.1716 23.1716 22.5 24 22.5Z" fill="#03363D"/>
<path d="M25.5 29.5C25.5 28.6716 24.8284 28 24 28C23.1716 28 22.5 28.6716 22.5 29.5C22.5 30.3284 23.1716 31 24 31C24.8284 31 25.5 30.3284 25.5 29.5Z" fill="#03363D"/>
</svg>

    
  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};
