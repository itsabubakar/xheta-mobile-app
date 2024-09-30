import { SvgXml } from "react-native-svg";

export default (props: any) => {
  const xml = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 2V3M3 5.5H2M14 5.5H13M3 8H2M14 8H13M3 10.5H2M14 10.5H13M5.5 13V14M8 2V3M8 13V14M10.5 2V3M10.5 13V14M4.5 13H11.5C12.3284 13 13 12.3284 13 11.5V4.5C13 3.67157 12.3284 3 11.5 3H4.5C3.67157 3 3 3.67157 3 4.5V11.5C3 12.3284 3.67157 13 4.5 13ZM5 5H11V11H5V5Z" stroke="#686868" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    
  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};
