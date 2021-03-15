import { useState } from "react";

import api from "../api";

export default () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const patched = {};
  Object.keys(api).map((key) => (patched[key] = {}));

  const patch = (api) => async (...args) => {
    setError(false);
    setLoading(true);
    const response = await api(...args).catch((error) => error.response?.data);
    setLoading(false);

    // Доделать и проверить корректную обработку ошибок (сервер ответил кодом ошибки, не ответил совсем, или что-то ещё пошло не так)
    if (response.error) setError({ message: response.error });

    return response;
  };

  for (let group in api) for (let endpoint in api[group]) patched[group][endpoint] = patch(api[group][endpoint]);
  return { api: patched, loading, error };
};
