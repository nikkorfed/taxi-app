import { useState } from "react";

import api from "../api";

export default () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const patched = {};
  Object.keys(api).map((key) => (patched[key] = {}));

  let patch = (api) => async (...args) => {
    setError("");
    setLoading(true);
    const response = await api(...args).catch((error) => ({ error: error.response?.data.error || error.message }));
    if (response.error) setError(response.error);
    setLoading(false);
    return response;
  };

  for (let group in api) for (let endpoint in api[group]) patched[group][endpoint] = patch(api[group][endpoint]);
  return { api: patched, loading, error };
};
