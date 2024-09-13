import { SvgXml } from "react-native-svg";

export default (props: any) => {
  const xml = `
  <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="28" height="28" rx="14" fill="#EDEDED"/>
<path d="M13.5 12.5L16.5 15.5M16.5 12.5L13.5 15.5M21 14C21 17.3137 18.3137 20 15 20C11.6863 20 9 17.3137 9 14C9 10.6863 11.6863 8 15 8C18.3137 8 21 10.6863 21 14Z" stroke="#8E8E8E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>



  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};
