
'use client';

import { useRouter, useSearchParams } from "next/navigation";

interface QueryParams {
    [key: string]: string | undefined;
  }

const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getQueryParam = (param:string) => {
    return searchParams.get(param) || "0x0";
  };

  const updateQueryParams = (updatedParams:QueryParams, route: string = "/burn?") => {
    const currentParams = new URLSearchParams(window.location.search);

    for (const [key, value] of Object.entries(updatedParams)) {
      value ? currentParams.set(key, value) : currentParams.delete(key);
    }

    router.replace(route + currentParams.toString());
  };

  return { getQueryParam, updateQueryParams };
};

export default useQueryParams;
