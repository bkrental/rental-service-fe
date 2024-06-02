import Image from "next/image";
import banner from "@public/auth-banner.svg";
import authIcon from "@public/auth_icon.png";
import "@scss/authentication.scss";
import { Suspense } from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="auth_container">
      <div className="auth_banner">
        <Image priority={true} src={banner} alt="banner" />
      </div>

      <div className="auth_icon">
        <Image src={authIcon} alt="auth-icon" />
      </div>

      <div className="auth_content">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
