import { Layout } from "@/components/layout/layout";
import { useStatusQuery } from "@/features/auth/api";
import { User } from "@/features/auth/types";
import React from "react";

interface WithAuthProps<T> {
  Component: React.ComponentType<T & { status: User }>;
  Context?: React.ComponentType<{ children: React.ReactNode; status: User }>;
}

const withAuth = <T extends {}>({ Component, Context }: WithAuthProps<T>) => {
  return (props: T) => {
    const {
      isSuccess,
      isFetching,
      isLoading,
      data: status,
    } = useStatusQuery(null, {
      // ms
      pollingInterval: 1000 * 60 * 10,
      refetchOnMountOrArgChange: false,
    });

    return (
      <Layout status={status} loading={isFetching || isLoading}>
        {isSuccess &&
          (Context ? (
            <Context status={status}>
              <Component {...props} status={status} />
            </Context>
          ) : (
            <Component {...props} status={status} />
          ))}
      </Layout>
    );
  };
};

export default withAuth;
