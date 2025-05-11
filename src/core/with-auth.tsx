import { Layout } from "@/components/layout/layout";
import { useStatusQuery } from "@/features/auth/api";
import { User } from "@/features/auth/types";
import React from "react";

const withAuth = <T extends {}>(
  Component: React.ComponentType<T & { status: User }>
) => {
  return (props: T) => {
    const {
      isSuccess,
      isFetching,
      isLoading,
      data: status,
    } = useStatusQuery(null, {
      // ms
      pollingInterval: 1000 * 60,
      refetchOnMountOrArgChange: false,
    });

    return (
      <Layout status={status} loading={isFetching || isLoading}>
        {isSuccess && <Component {...props} status={status} />}
      </Layout>
    );
  };
};

export default withAuth;
