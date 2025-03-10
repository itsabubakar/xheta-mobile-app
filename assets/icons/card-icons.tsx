import { SvgXml } from "react-native-svg";

export const Mastercard = ({ props }: any) => {
  const xml = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2157_19558)">
<circle cx="11.25" cy="17.9531" r="11.25" fill="#EB001B"/>
<circle cx="24.7517" cy="17.9531" r="11.25" fill="#F79E1B"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.9989 26.9554C21.1041 25.1588 23.1933 21.8012 23.1933 17.9557C23.1933 14.1102 21.1041 10.7526 17.9989 8.95605C14.8936 10.7526 12.8045 14.1102 12.8045 17.9557C12.8045 21.8012 14.8936 25.1588 17.9989 26.9554Z" fill="#FF5F00"/>
</g>
<defs>
<clipPath id="clip0_2157_19558">
<rect width="36" height="36" fill="white"/>
</clipPath>
</defs>
</svg>

      `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};

export const Visacard = ({ props }: any) => {
  const xml = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="36" height="36" fill="url(#pattern0_2157_19571)"/>
<defs>
<pattern id="pattern0_2157_19571" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_2157_19571" transform="scale(0.0078125)"/>
</pattern>
<image id="image0_2157_19571" width="128" height="128" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>

  
        `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};
