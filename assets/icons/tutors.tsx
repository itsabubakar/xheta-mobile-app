import { SvgXml } from "react-native-svg";

export const Tutors = (props: any) => {
  const xml = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.4815 18.7248C17.1121 16.9175 14.9424 15.75 12.5 15.75C10.0576 15.75 7.88789 16.9175 6.51846 18.7248M18.4815 18.7248C20.3335 17.0763 21.5 14.6744 21.5 12C21.5 7.02944 17.4706 3 12.5 3C7.52944 3 3.5 7.02944 3.5 12C3.5 14.6744 4.6665 17.0763 6.51846 18.7248M18.4815 18.7248C16.8915 20.1401 14.7962 21 12.5 21C10.2038 21 8.10851 20.1401 6.51846 18.7248M15.5 9.75C15.5 11.4069 14.1569 12.75 12.5 12.75C10.8431 12.75 9.5 11.4069 9.5 9.75C9.5 8.09315 10.8431 6.75 12.5 6.75C14.1569 6.75 15.5 8.09315 15.5 9.75Z" stroke="#686868" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};

export const TutorsFilled = (props: any) => {
  const xml = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0999 11.9999C22.0999 17.3018 17.8018 21.5999 12.4999 21.5999C7.19797 21.5999 2.8999 17.3018 2.8999 11.9999C2.8999 6.69797 7.19797 2.3999 12.4999 2.3999C17.8018 2.3999 22.0999 6.69797 22.0999 11.9999ZM15.4999 8.9999C15.4999 10.6568 14.1568 11.9999 12.4999 11.9999C10.843 11.9999 9.4999 10.6568 9.4999 8.9999C9.4999 7.34305 10.843 5.9999 12.4999 5.9999C14.1568 5.9999 15.4999 7.34305 15.4999 8.9999ZM12.4999 14.3999C10.1495 14.3999 8.06215 15.5261 6.74805 17.2684C8.17401 18.8243 10.223 19.7999 12.4999 19.7999C14.7768 19.7999 16.8258 18.8243 18.2518 17.2684C16.9377 15.5261 14.8503 14.3999 12.4999 14.3999Z" fill="#03363D"/>
</svg>



  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};
