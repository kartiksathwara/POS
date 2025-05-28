import { IoMdClose } from "react-icons/io";
import { PiHandbagSimpleDuotone } from "react-icons/pi";
import { FiLink } from "react-icons/fi";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { useState, type ReactNode } from "react";
import FeePopup from "./FeePopup";
import LinkPopup from "./LinkPopup";
import CollectionPopup from "./CollectionPopup";

type ActionItemProps = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

type ActionBarProps = {
  handleClose: () => void;
};

const ActionBar: React.FC<ActionBarProps> = ({ handleClose }) => {
  const [showFeePopup, setShowFeePopup] = useState(false);
  const [showLinkPopup, setShowLinkPopup] = useState(false);
  const [showCollection, setShowCollection] = useState(false);

  if (showFeePopup) {
    return <FeePopup closeFeePopup={() => setShowFeePopup(false)} />;
  }

  if (showLinkPopup) {
    return <LinkPopup closeLinkPopup={() => setShowLinkPopup(false)} />;
  }
  if (showCollection) {
    return <CollectionPopup closeCollection={() => setShowCollection(false)} />;
  }

  const ActionItem: React.FC<ActionItemProps> = ({ icon, label, onClick }) => (
    <div
      onClick={onClick}
      className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50"
    >
      <span className="text-gray-600 text-xl">{icon}</span>
      <span className="text-gray-700">{label}</span>
    </div>
  );

  return (
    <div className="absolute bottom-0 bg-white rounded-t-2xl h-[75%] w-[122vh] px-5 pt-5 border border-b-0 shadow-lg z-40">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-700 font-semibold text-lg">
          Add quick action
        </h2>
        <button
          className="text-2xl text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          <IoMdClose />
        </button>
      </div>

      <div>
        <ActionItem
          icon={<PiHandbagSimpleDuotone />}
          label="Fee"
          onClick={() => setShowFeePopup(true)}
        />
        <ActionItem
          icon={<FiLink />}
          label="Link"
          onClick={() => setShowLinkPopup(true)}
        />
        <ActionItem
          icon={<MdOutlineCollectionsBookmark />}
          label="Collection"
          onClick={() => setShowCollection(true)}
        />
      </div>
    </div>
  );
};

export default ActionBar;
