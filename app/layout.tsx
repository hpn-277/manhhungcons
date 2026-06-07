import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xây Dựng Mạnh Hùng",
  description:
    "Công Ty TNHH Xây Dựng Mạnh Hùng - Chuyên xây dựng nhà xưởng, công trình công nghiệp và dân dụng tại Bà Rịa - Vũng Tàu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
