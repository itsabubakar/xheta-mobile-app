import { SvgXml } from "react-native-svg";

export const Home = ({ props }: any) => {
  const xml = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.25 6C4.25 4.75736 5.25736 3.75 6.5 3.75H8.75C9.99264 3.75 11 4.75736 11 6V8.25C11 9.49264 9.99264 10.5 8.75 10.5H6.5C5.25736 10.5 4.25 9.49264 4.25 8.25V6Z" stroke="#686868" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.25 15.75C4.25 14.5074 5.25736 13.5 6.5 13.5H8.75C9.99264 13.5 11 14.5074 11 15.75V18C11 19.2426 9.99264 20.25 8.75 20.25H6.5C5.25736 20.25 4.25 19.2426 4.25 18V15.75Z" stroke="#686868" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 6C14 4.75736 15.0074 3.75 16.25 3.75H18.5C19.7426 3.75 20.75 4.75736 20.75 6V8.25C20.75 9.49264 19.7426 10.5 18.5 10.5H16.25C15.0074 10.5 14 9.49264 14 8.25V6Z" stroke="#686868" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 15.75C14 14.5074 15.0074 13.5 16.25 13.5H18.5C19.7426 13.5 20.75 14.5074 20.75 15.75V18C20.75 19.2426 19.7426 20.25 18.5 20.25H16.25C15.0074 20.25 14 19.2426 14 18V15.75Z" stroke="#686868" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>




  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};

export const HomeFilled = ({ props }: any) => {
  const xml = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 6C3.5 4.34315 4.84315 3 6.5 3H8.75C10.4069 3 11.75 4.34315 11.75 6V8.25C11.75 9.90685 10.4069 11.25 8.75 11.25H6.5C4.84315 11.25 3.5 9.90685 3.5 8.25V6ZM13.25 6C13.25 4.34315 14.5931 3 16.25 3H18.5C20.1569 3 21.5 4.34315 21.5 6V8.25C21.5 9.90685 20.1569 11.25 18.5 11.25H16.25C14.5931 11.25 13.25 9.90685 13.25 8.25V6ZM3.5 15.75C3.5 14.0931 4.84315 12.75 6.5 12.75H8.75C10.4069 12.75 11.75 14.0931 11.75 15.75V18C11.75 19.6569 10.4069 21 8.75 21H6.5C4.84315 21 3.5 19.6569 3.5 18V15.75ZM13.25 15.75C13.25 14.0931 14.5931 12.75 16.25 12.75H18.5C20.1569 12.75 21.5 14.0931 21.5 15.75V18C21.5 19.6569 20.1569 21 18.5 21H16.25C14.5931 21 13.25 19.6569 13.25 18V15.75Z" fill="#03363D"/>
</svg>





  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};
