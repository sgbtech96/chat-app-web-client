import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/core";
import "./loader.css";

function Loader(props) {
    const override = css`
        display: block;
        margin: 2 auto;
        border-color: #0000ff;
    `;
    return (
        <div className="Loader">
            <SyncLoader
                css={override}
                size={15}
                color={"#0000ff"}
                loading={true}
            />
            <div className="loader-text">{props.msg}</div>
        </div>
    );
}

export default Loader;
