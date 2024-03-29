import Header from "@/components/Header/Header";
import StoreProvider from "@app/StoreProvider";
import { Roboto } from "next/font/google";
import "@scss/_global.scss";

export const metadata = {
  title: "BKrental",
  description: "Generated by Next.js",
};

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={roboto.className}>
        <StoreProvider>
          {/* Header goes here */}
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
