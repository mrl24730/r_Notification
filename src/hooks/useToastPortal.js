import { uuid } from "shared";
import { useState, useEffect } from "react";

export const useToastPortal = () => {
  const [loaded, setLoaded] = useState(false);
  const [portalId] = useState(`toast-portal-${uuid()}`);

  useEffect(() => {
    const div = document.createElement("div");
    div.id = portalId;
    div.style = "position: fixed; top: 10px; right: 10px";
    document.body.append(div);
    setLoaded(true);

    return () => document.body.removeChild(div);
  }, [portalId]);

  return { loaded, portalId };
};
