import { SvgXml } from "react-native-svg";

export const Learnings = (props: any) => {
  const xml = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.25 6.04168C10.6577 4.61656 8.55506 3.75 6.25 3.75C5.19809 3.75 4.18834 3.93046 3.25 4.26212V18.5121C4.18834 18.1805 5.19809 18 6.25 18C8.55506 18 10.6577 18.8666 12.25 20.2917M12.25 6.04168C13.8423 4.61656 15.9449 3.75 18.25 3.75C19.3019 3.75 20.3117 3.93046 21.25 4.26212V18.5121C20.3117 18.1805 19.3019 18 18.25 18C15.9449 18 13.8423 18.8666 12.25 20.2917M12.25 6.04168V20.2917" stroke="#686868" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};

export const LearningsFilled = (props: any) => {
  const xml = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.1499 20.1835C14.5994 19.1846 16.3553 18.6001 18.2499 18.6001C19.1023 18.6001 19.9256 18.7183 20.705 18.9388C20.9763 19.0155 21.2679 18.9607 21.4928 18.7905C21.7177 18.6204 21.8499 18.3547 21.8499 18.0728V4.87276C21.8499 4.47004 21.5824 4.11633 21.1948 4.00673C20.2576 3.74165 19.2696 3.6001 18.2499 3.6001C16.4062 3.6001 14.6691 4.06269 13.1499 4.87794V20.1835Z" fill="#03363D"/>
<path d="M11.3499 4.87794C9.83066 4.06269 8.09358 3.6001 6.2499 3.6001C5.23025 3.6001 4.24217 3.74165 3.30496 4.00673C2.91744 4.11633 2.6499 4.47004 2.6499 4.87276V18.0728C2.6499 18.3547 2.78207 18.6204 3.00697 18.7905C3.23187 18.9607 3.5235 19.0155 3.79485 18.9388C4.57423 18.7183 5.39751 18.6001 6.2499 18.6001C8.14451 18.6001 9.9004 19.1846 11.3499 20.1835V4.87794Z" fill="#03363D"/>
</svg>



  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};
