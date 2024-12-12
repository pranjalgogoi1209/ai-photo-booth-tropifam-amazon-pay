import React, { useState, useRef, useEffect } from "react";
import styles from "./outputPage.module.css";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import Qr from "../../components/qr/Qr";
import Email from "../../components/email/Email";
import Loader from "../../components/loader/Loader";
import printJS from "print-js";

import downloadTxt from "./../../assets/output/download-txt.png";
import waitTxt from "./../../assets/output/wait-txt.png";
import emailBtn from "./../../assets/output/email-btn.png";
import homeBtn from "./../../assets/output/home-btn.png";
import qrBtn from "./../../assets/output/qr-btn.png";
import printBtn from "./../../assets/output/print-icon.png"

export default function OutputPage({ generatedImg, url, setUrl }) {
  const printRef = useRef(null);
  const [showQr, setShowQr] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  // handle print
  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
  // });
  const handlePrint=()=>{
    printJS({
      printable: "contentToPrint", // ID of the element to print
      type: "html",
      targetStyles: ["*"], // Include all styles
      style: `
        #contentToPrint {
          width: 100%;
          height: auto;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
  
        #contentToPrint img {
          width: 100%; /* Ensures the image takes full width */
          height: auto; /* Maintains aspect ratio */
        }
  
        @page {
          margin: 0; /* Removes default page margins for full-width content */
        }
  
        body {
          margin: 0; /* Ensures body has no margin when printing */
        }
      `,
    });
  }

  return (
    <div className={`flex-col-center ${styles.OutputPage}`}>
      <header
        className={`flex-row-center ${
          generatedImg ? styles.downloadTxtImg : styles.waitTxtImg
        }`}
      >
        <img
          src={generatedImg ? downloadTxt : waitTxt}
          alt="ready-to-download"
        />
      </header>

      {/* <h1>{generatedImg ? "READY TO DOWNLOAD ?" : "PLEASE WAIT...!"}</h1> */}

      {generatedImg ? (
        <div className={styles.generatedImgContainer}>
          <div className={`flex-row-center ${styles.imgWrapper}`}>
            <div className={`flex-row-center ${styles.imgContainer}`}>
              <img ref={printRef} id="contentToPrint" src={generatedImg} alt="generated-image" />
            </div>
          </div>
          <div className={`flex-row-center ${styles.btnContainer}`}>
            {/* generate qr */}
            <div
              onClick={() => setShowQr(true)}
              className="flex-row-center btnImg"
            >
              {/* <button className={`btn2`}>QR</button> */}
              <img src={qrBtn} alt="qr-btn" />
            </div>

            {/* email */}
            <div
              onClick={() => setShowEmail(true)}
              className="flex-row-center btnImg"
            >
              {/* <button className={`btn2`}>EMAIL</button> */}
              <img src={emailBtn} alt="email-btn" />
            </div>

            {/* print */}
             <div onClick={handlePrint} className={`flex-row-center btnImg `}>
              <img src={printBtn} alt="generate-qr-button" />
            </div> 

            <Link to={"/"} className="flex-row-center btnImg">
              {/* <button className={`btn2`}>HOME</button> */}
              <img src={homeBtn} alt="home-btn" />
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.loader}>
          {/* <img src={loader} alt="loader" /> */}
          <Loader />
        </div>
      )}

      {/* qr */}
      {showQr && <Qr url={url} setShowQr={setShowQr} />}

      {/* email */}
      {showEmail && <Email setShowEmail={setShowEmail} url={url} />}
    </div>
  );
}
