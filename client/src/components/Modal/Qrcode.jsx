import { useState } from "react";
import QRCode from "react-qr-code";
import * as Material from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 8,
};

export default function Qrcode({ username, date, coach, admin }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        className="btn btn-secondary btn-sm"
        type="button"
        onClick={handleOpen}
      >
        Open Qr code
      </button>
      <Material.Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Material.Box sx={style}>
          <Material.Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Hello there!
          </Material.Typography>
          <Material.Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <QRCode
              value={`Username : ${username} \n Coach : ${coach} \n Admin : ${admin} \n Date :
            ${date}`}
            />
          </Material.Typography>
        </Material.Box>
      </Material.Modal>
    </div>
  );
}
