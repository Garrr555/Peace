/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import CustomFetch from "../config/db";
import type { DivisiType } from "../types/type";

const useDivisis = () => {
  const [divisis, setDivisis] = useState<DivisiType[]>([]);
  const [loading, setLoading] = useState(false);

  const getDivisis = useCallback(async () => {
    try {
      setLoading(true);

      const response = await CustomFetch.get("/divisis");

      setDivisis(response.data.divisis);
    } catch (error) {
      console.error("Gagal mengambil data divisi:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDivisis();
  }, [getDivisis]);

  return {
    divisis,
    loading,
    getDivisis,
  };
};

export default useDivisis;
