import { ReactElement, ReactNode, useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { animated, useTransition } from "react-spring";
import cx from "classnames";
import { Box, Button } from "grommet";
import "@reach/dialog/styles.css";
import styles from "./Modal.module.scss";

type Props = {
  ariaLabel: string;
  modalKey?: string;
  open: boolean;
  className?: string;
  overlayClassName?: string;
  children: ReactNode;
  onClose: () => void;
};

type ConfirmProps = {
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
  className?: string;
};

interface StaticComponents {
  Confirm?: ConfirmProps;
}

const Modal = ({
  ariaLabel,
  open = false,
  className = "",
  overlayClassName = "",
  children,
  onClose,
  modalKey,
}: Props & StaticComponents): ReactElement => {
  const [showDialog, setShowDialog] = useState(open);

  const transitions = useTransition(showDialog, {
    // ref: null,
    from: { opacity: 0, y: -1000 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 2000 },
  });

  useEffect(() => {
    setShowDialog(open);
  }, [open]);

  return (
    open && (
      <div key={modalKey}>
        {transitions(
          (style, item, t, i) =>
            item && (
              <animated.div key={modalKey}>
                <DialogOverlay
                  className={cx(styles.new_modal, className)}
                  style={{ opacity: style.opacity as any }}
                  key={modalKey}
                >
                  <animated.div>
                    <DialogContent
                      // style={{
                      //   transform: style?.y?.to(
                      //     (value) => `translate3d(0px, ${value}px, 0px)`
                      //   ),
                      //   border: "none",
                      //   borderRadius: 10
                      // }}
                      aria-label={ariaLabel}
                      key={modalKey + i}
                      className={overlayClassName}
                    >
                      <IconButton
                        disableFocusRipple
                        className={styles.button_clear}
                        type="submit"
                        aria-label="Close dialog"
                        onClick={() => {
                          onClose();
                          setShowDialog(false);
                        }}
                        data-test="closeDialogButton"
                      >
                        <CloseIcon />
                      </IconButton>
                      {children}
                    </DialogContent>
                  </animated.div>
                </DialogOverlay>
              </animated.div>
            )
        )}
      </div>
    )
  );
};

const ModalConfirm = ({
  className,
  open,
  onCancel,
  onConfirm,
  title,
  ...props
}: ConfirmProps) => {
  return (
    <Modal
      open={open}
      ariaLabel="confirmation"
      data-test="confirmModal"
      onClose={onCancel}
      // overlayClassName={cx(className, styles.confirm)}
      {...props}
    >
      <Box fill pad="medium">
        <span>{title}</span>
        <div className={styles.button_group_reversed}>
          <Box pad="large" align="center">
            <Button secondary onClick={onCancel} margin="large">
              NEI
            </Button>
            <Button primary onClick={onConfirm} margin="large">
              JÁ
            </Button>
          </Box>
        </div>
      </Box>
    </Modal>
  );
};
Modal.Confirm = ModalConfirm;

export default Modal;
