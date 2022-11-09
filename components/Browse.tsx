import React, { useContext } from "react";
import { ModalContext, TmdbContext } from "../context";
import Feature from "./Feature";
import Footer from "./Footer";
import ListRow from "./ListRow";
import Modal from "./Modal";
import { Toaster } from "react-hot-toast";
import { SlideRows } from "../types/typings";

function Browse() {
  const { slideRows } = useContext(TmdbContext);
  // console.log({ slideRows });

  const { isModal } = useContext(ModalContext);
  return (
    <>
      <Toaster position="bottom-center" />
      {isModal && <Modal />}
      <Feature />
      <div className="flex flex-col relative z-40 bg-[#141414] overflow-x-clip">
        <div className="absolute top-[-120px] ">
          {slideRows?.map(
            (slideItem: SlideRows, index: React.Key | null | undefined) => (
              <ListRow key={index} slideItem={slideItem} />
            )
          )}
          <hr className="border-gray-600" />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Browse;
