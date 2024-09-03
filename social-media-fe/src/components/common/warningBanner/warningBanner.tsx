/* eslint-disable react/no-unescaped-entities */
import WarningIcon from "@mui/icons-material/Warning";
import Link from "next/link";

const WarningBanner = () => {
  return (
    <div className="bg-yellow-200 text-text-primary px-4 py-1 flex items-center justify-between">
      <p className="text-base flex items-center gap-1">
        <WarningIcon />
        "This is a demo version, so some features may be locked. Log in to
        experience the full functionality."
      </p>
      <div className="flex space-x-2">
        <Link
          className="bg-accent-color text-light rounded-lg hover:bg-primary py-2 px-4"
          href={"/login"}
        >
          Login
        </Link>
        <Link
          className="bg-gray text-light rounded-lg hover:bg-gray/80 py-2 px-4"
          href={"/register"}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default WarningBanner;
