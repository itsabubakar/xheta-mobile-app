import { SvgXml } from "react-native-svg";

export default (props: any) => {
  const xml = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 2V3.5M11.5 2V3.5M2 12.5V5C2 4.17157 2.67157 3.5 3.5 3.5H12.5C13.3284 3.5 14 4.17157 14 5V12.5M2 12.5C2 13.3284 2.67157 14 3.5 14H12.5C13.3284 14 14 13.3284 14 12.5M2 12.5V7.5C2 6.67157 2.67157 6 3.5 6H12.5C13.3284 6 14 6.67157 14 7.5V12.5M8 8.5H8.005V8.505H8V8.5ZM8 10H8.005V10.005H8V10ZM8 11.5H8.005V11.505H8V11.5ZM6.5 10H6.505V10.005H6.5V10ZM6.5 11.5H6.505V11.505H6.5V11.5ZM5 10H5.005V10.005H5V10ZM5 11.5H5.005V11.505H5V11.5ZM9.5 8.5H9.505V8.505H9.5V8.5ZM9.5 10H9.505V10.005H9.5V10ZM9.5 11.5H9.505V11.505H9.5V11.5ZM11 8.5H11.005V8.505H11V8.5ZM11 10H11.005V10.005H11V10Z" stroke="#686868" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>    
  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};