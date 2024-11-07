import { SvgXml } from "react-native-svg";

export const UBA = ({ props }: any) => {
  const xml = `<svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1829_23933)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.6876 27.303C8.2314 27.3623 7.31901 27.4809 7.23967 27.4809H0L4.87934 4.62628C7.43802 9.60843 9.99669 14.6499 12.5157 19.6914C12.9521 20.7985 13.3488 21.9847 13.3488 23.1116C13.3686 25.6225 11.5835 26.8483 8.6876 27.303ZM19.081 22.8546C17.6132 19.9879 16.1256 17.0817 14.6777 14.2149C13.8645 12.6135 13.0512 10.9726 12.238 9.41073C11.9802 8.85716 11.6826 8.3629 11.4446 7.84887C11.1868 7.27552 10.6116 5.49618 10.6116 4.66582V4.05294C10.6314 3.75638 10.6711 3.42029 10.7504 3.16327C11.6231 0.415179 14.8364 0.138393 16.7603 0H24L19.081 22.8546Z" fill="url(#paint0_linear_1829_23933)"/>
</g>
<defs>
<linearGradient id="paint0_linear_1829_23933" x1="11.9999" y1="0" x2="11.9999" y2="27.4809" gradientUnits="userSpaceOnUse">
<stop stop-color="#ED1500"/>
<stop offset="1" stop-color="#D70900"/>
</linearGradient>
<clipPath id="clip0_1829_23933">
<rect width="24" height="27.4809" fill="white"/>
</clipPath>
</defs>
</svg>
      `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};
