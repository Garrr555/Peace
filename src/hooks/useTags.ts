/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import CustomFetch from "../config/db";
import type { TagType } from "../types/type";

const useTags = () => {
  const [tags, setTags] = useState<TagType[]>([]);
  const [loading, setLoading] = useState(false);

  const getTags = useCallback(async () => {
    try {
      setLoading(true);

      const response = await CustomFetch.get("/tags");

      setTags(response.data.tags);
    } catch (error) {
      console.error("Gagal mengambil data tag:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTags();
  }, [getTags]);

  return {
    tags,
    loading,
    getTags,
  };
};

export default useTags;
