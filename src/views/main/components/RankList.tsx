import React, { useState, useEffect } from "react";
import { Dropdown, Space, Menu, Drawer, Pagination, Modal } from "antd";
import imgRadarSmall from "./../../../static/img/radar-small.png";
import {
    DownOutlined,
    RightOutlined,
} from "@ant-design/icons";

const typeList = [
    "Overall",
    "Influence",
    "Campaign",
    "Creation",
    "Curation",
    "Collection",
    "Engagement",
];

const rankList = [
    {
        name: "Lens Protocol",
        score: "201",
    },
    {
        name: "KNN3 Network",
        score: "150",
    },
    {
        name: "Stani",
        score: "130",
    },
    {
        name: "Stani",
        score: "130",
    },
    {
        name: "Stani",
        score: "130",
    },
    {
        name: "Stani",
        score: "130",
    },
];

const RankList = (props: any) => {

    const [activeHandleIdx, setActiveHandleIdx] = useState<number>(0);

    useEffect(() => {
        if (props.activeName) {
            setActiveHandleIdx(typeList.indexOf(props.activeName))
        }
    }, [props.activeName]);

    return (
        <Drawer
            title=""
            placement="right"
            onClose={() => props.close()}
            open={props.isShow}
            closable={false}
        >
            <div className="drawer">
                <div
                    className="rightOut"
                    onClick={() => {
                        props.close();
                    }}
                >
                    <RightOutlined />
                </div>
                <Dropdown
                    overlay={
                        <Menu>
                            {typeList.map((t, i) => (
                                <div className="drop-menu" key={i} onClick={() => setActiveHandleIdx(i)}>
                                    {t}
                                </div>
                            ))}
                        </Menu>
                    }
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space className="space overall">
                            <span className="list-type">{typeList[activeHandleIdx]}</span>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                {rankList.map((t, i) => (
                    <div className="rank-item" key={i}>
                        <span>{i + 1}</span>
                        <span>k</span>
                        <span>{t.name}</span>
                        <span>
                            <img src={imgRadarSmall} alt="" />
                        </span>
                        <span>Score: {t.score}</span>
                    </div>
                ))}
                <div className="pagination">
                    <Pagination simple total={50} />
                </div>
            </div>
        </Drawer>
    );
};

export default RankList;
