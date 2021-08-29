import styles from "./styles.module.css";
import { useToastPortal, useToastAutoClose } from "hooks";
import ReactDom from "react-dom";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Toast } from "components";
import { uuid } from "shared";

export const ToastPortal = forwardRef(
  ({ autoClose, autoCloseTime = 2000 }, ref) => {
    const { loaded, portalId } = useToastPortal();
    const [toasts, setToasts] = useState([]);

    useToastAutoClose({ toasts, setToasts, autoClose, autoCloseTime });

    const removeToast = (id) => {
      setToasts(toasts.filter((toast) => toast.id !== id));
    };

    useImperativeHandle(ref, () => ({
      addMessage(toast) {
        setToasts([{ ...toast, id: uuid() }, ...toasts]);
      },
    }));

    return loaded ? (
      ReactDom.createPortal(
        <div id="importal" className={styles.toastContainer}>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              mode={toast.mode}
              message={toast.message}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>,
        document.getElementById(portalId)
      )
    ) : (
      <></>
    );
  }
);
