"use client";

import Layout from "@producer/app/(footered)/layout";

const LayoutWithFooter = ({ children }: { children: React.ReactNode }) => (
  <Layout>{children}</Layout>
);

export default LayoutWithFooter;
