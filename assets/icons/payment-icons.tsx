import { SvgXml } from "react-native-svg";

export const GreenIconDown = ({ props }: any) => {
  const xml = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 3L3 13M3 13L10.5 13M3 13L3 5.5" stroke="#12B76A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


      `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};

export const RedIconUp = ({ props }: any) => {
  const xml = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 11L11 1M11 1L3.5 1M11 1V8.5" stroke="#F04438" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  
      `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};
