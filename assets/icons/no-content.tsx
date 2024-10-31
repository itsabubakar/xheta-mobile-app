import { SvgXml } from "react-native-svg";

export default (props: any) => {
  const xml = `<svg width="217" height="93" viewBox="0 0 217 93" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="36.2647" y="25.0587" width="145.717" height="61.0267" rx="10.5863" fill="white"/>
<rect x="36.2647" y="25.0587" width="145.717" height="61.0267" rx="10.5863" stroke="#E9E9E9" stroke-width="1.24544"/>
<rect x="51.8328" y="40.6266" width="120.808" height="11.209" rx="4.98178" fill="#F0F0F0"/>
<rect x="51.8328" y="59.3083" width="88.4264" height="11.209" rx="4.98178" fill="#F0F0F0"/>
<g filter="url(#filter0_d_5978_6001)">
<rect x="25.6782" y="16.9636" width="165.644" height="59.7812" rx="9.96355" fill="white" shape-rendering="crispEdges"/>
<rect x="25.0555" y="16.3409" width="166.889" height="61.0267" rx="10.5863" stroke="#E9E9E9" stroke-width="1.24544" shape-rendering="crispEdges"/>
<rect x="40.6235" y="31.9087" width="120.808" height="11.209" rx="4.98178" fill="#F0F0F0"/>
<rect x="40.6235" y="50.5906" width="88.4264" height="11.209" rx="4.98178" fill="#F0F0F0"/>
</g>
<g filter="url(#filter1_d_5978_6001)">
<rect x="11.9783" y="7" width="193.044" height="59.7812" rx="9.96355" fill="white" shape-rendering="crispEdges"/>
<rect x="11.3555" y="6.37728" width="194.289" height="61.0267" rx="10.5863" stroke="#E9E9E9" stroke-width="1.24544" shape-rendering="crispEdges"/>
<rect x="26.9236" y="21.9454" width="120.808" height="11.209" rx="4.98178" fill="#F0F0F0"/>
<rect x="26.9236" y="40.6268" width="88.4264" height="11.209" rx="4.98178" fill="#F0F0F0"/>
</g>
<defs>
<filter id="filter0_d_5978_6001" x="14.4693" y="10.7364" width="188.062" height="82.1993" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4.98178"/>
<feGaussianBlur stdDeviation="4.98178"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.191667 0 0 0 0 0.191667 0 0 0 0 0.191667 0 0 0 0.03 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5978_6001"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5978_6001" result="shape"/>
</filter>
<filter id="filter1_d_5978_6001" x="0.769359" y="0.772741" width="215.462" height="82.1993" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4.98178"/>
<feGaussianBlur stdDeviation="4.98178"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.129167 0 0 0 0 0.129167 0 0 0 0 0.129167 0 0 0 0.05 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5978_6001"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5978_6001" result="shape"/>
</filter>
</defs>
</svg>

    
  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};
