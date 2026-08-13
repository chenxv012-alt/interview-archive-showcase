import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
export const metadata: Metadata = { title: "面试档案 · 产品展示版", description: "覆盖岗位准备、模拟练习、录音复盘与错题管理的面试工作台。" };
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="zh-CN"><body>{children}</body></html>; }

