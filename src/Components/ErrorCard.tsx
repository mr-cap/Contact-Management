import React from "react";
import { useRouteError } from "react-router-dom";
import TopBanners from "./TopBanners";
const ErrorCard = () => {
  const err: any = useRouteError();
  return (
    <div>
      <TopBanners msg={"404"} />
      <img
        alt={`${err?.status}: ${err?.statusText}`}
        className=" h-[50rem] w-full"
        src="https://img.freepik.com/premium-photo/flat-concept-404-error-page-file-found-web-page-banner-presentation-social-media-documents-website-maintenance-error-webpage-construction-vector-ultraviolet-illustration_317038-260.jpg?w=2000"
      />
    </div>
  );
};

export default ErrorCard;
