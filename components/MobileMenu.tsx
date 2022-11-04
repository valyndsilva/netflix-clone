import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context";
import TmdbContext from "../context/TmdbContext";
import { useSubscription } from "../hooks";

export default function MobileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user } = useContext(AuthContext);
  const subscription = useSubscription(user);
  const {  setCategory } = useContext(TmdbContext);
  return (
    <div className="md:!hidden self-center">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="!capitalize !text-white"
      >
        Browse
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className={`${subscription !== undefined ? "menu" : "invisible"}`}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          className="cursor-pointer"
          onClick={() => setCategory("home")}
        >
          Home
        </MenuItem>
        <MenuItem
          className="cursor-pointer"
          onClick={() => setCategory("series")}
        >
          Series
        </MenuItem>
        <MenuItem
          className="cursor-pointer"
          onClick={() => setCategory("movies")}
        >
          Films
        </MenuItem>
        <MenuItem
          className="cursor-pointer"
          onClick={() => setCategory("trending")}
        >
          New & Popular
        </MenuItem>
        <MenuItem
          className="cursor-pointer"
          onClick={() => setCategory("myList")}
        >
          My List
        </MenuItem>
        <MenuItem onClick={handleClose}>Browse By Language</MenuItem>
      </Menu>
    </div>
  );
}
