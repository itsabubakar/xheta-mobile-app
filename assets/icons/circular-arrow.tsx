import { SvgXml } from "react-native-svg";

export default (props: any) => {
  const xml = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.625 12.5L13.125 10M13.125 10L10.625 7.5M13.125 10L6.875 10M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" stroke="#686868" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    
  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};