import React, { useState, useEffect } from "react";
import "./index.scss";
import api from "../../../../api";
import Mastermind from "./../../../../static/img/dark-character/Mastermind.png";
import Pioneer from "./../../../../static/img/dark-character/Pioneer.png";
import Artist from "./../../../../static/img/dark-character/Artist.png";
import Conductor from "./../../../../static/img/dark-character/Conductor.png";
import Actor from "./../../../../static/img/dark-character/Actor.png";
import Antiquer from "./../../../../static/img/dark-character/Antiquer.png";
import Spy from "./../../../../static/img/dark-character/Spy.png";
import Magician from "./../../../../static/img/dark-character/Magician.png";
import Healer from "./../../../../static/img/dark-character/Healer.png";
import Volcanologist from "./../../../../static/img/dark-character/Volcanologist.png";
import Photographer from "./../../../../static/img/dark-character/Photographer.png";
import Designer from "./../../../../static/img/dark-character/Designer.png";
import Architect from "./../../../../static/img/dark-character/Architect.png";
import Engineer from "./../../../../static/img/dark-character/Engineer.png";
import Promotor from "./../../../../static/img/dark-character/Promotor.png";
import Supervisor from "./../../../../static/img/dark-character/Supervisor.png";
import Mobilizer from "./../../../../static/img/dark-character/Mobilizer.png";
import Counselor from "./../../../../static/img/dark-character/Counselor.png";
import Musician from "./../../../../static/img/dark-character/Musician.png";
import Motivator from "./../../../../static/img/dark-character/Motivator.png";
import Demonstrator from "./../../../../static/img/dark-character/Demonstrator.png";

const background = {
    Mastermind: Mastermind,
    Pioneer: Pioneer,
    Artist: Artist,
    Conductor: Conductor,
    Actor: Actor,
    Antiquer: Antiquer,
    Spy: Spy,
    Magician: Magician,
    Healer: Healer,
    Volcanologist: Volcanologist,
    Photographer: Photographer,
    Designer: Designer,
    Architect: Architect,
    Engineer: Engineer,
    Promotor: Promotor,
    Supervisor: Supervisor,
    Mobilizer: Mobilizer,
    Counselor: Counselor,
    Musician: Musician,
    Motivator: Motivator,
    Demonstrator: Demonstrator,
}

const Character = (props: any) => {

    const [imgUrl, setImgUrl] = useState<any>("");

    const getRadar = async () => {
        console.log(props.profileId)
        const res: any = await api.get(`/lens/scores/14234`);
        let arr = [
            { type: 'influReda', score: res.data.influReda * 1.05 },
            { type: 'campaignReda', score: res.data.campaignReda * 1.09 },
            { type: 'engagementReda', score: res.data.engagementReda * 1.07 },
            { type: 'collectReda', score: res.data.collectReda * 1.06 },
            { type: 'creationReda', score: res.data.creationReda * 1.08 },
            { type: 'curationReda', score: res.data.curationReda * 1.1 },
        ];
        arr.sort((a: any, b: any) => { return b.score - a.score })
        const img = getImg(arr);
        setImgUrl(img)
    };

    useEffect(() => {
        if(props.profileId){
            getRadar();
            console.log(props.profileId)
        }
        
    }, [props.profileId]);

    const getImg = (arr: any) => {
        if (arr[0].score - arr[1].score > 1.6) {
            switch (arr[0].type) {
                case 'curationReda': //灰色
                    return background['Mastermind'];
                case 'campaignReda': //蓝色
                    return background['Pioneer'];
                case 'creationReda': //紫色
                    return background['Artist'];
                case 'influReda': // 红色
                    return background['Conductor'];
                case 'engagementReda': // 橘色
                    return background['Actor'];
                case 'collectReda': //绿色
                    return background['Antiquer'];
            }
        } else {
            if (
                (arr[0].type === 'collectReda' && arr[1].type === 'curationReda') ||
                (arr[0].type === 'curationReda' && arr[1].type === 'collectReda')
            ) {
                return background['Spy'];
            }
            if (
                (arr[0].type === 'creationReda' && arr[1].type === 'curationReda') ||
                (arr[0].type === 'curationReda' && arr[1].type === 'creationReda')
            ) {
                return background['Magician'];
            }
            if (
                (arr[0].type === 'creationReda' && arr[1].type === 'collectReda') ||
                (arr[0].type === 'collectReda' && arr[1].type === 'creationReda')
            ) {
                return background['Healer'];
            }
            if (
                (arr[0].type === 'engagementReda' && arr[1].type === 'curationReda') ||
                (arr[0].type === 'curationReda' && arr[1].type === 'engagementReda')
            ) {
                return background['Volcanologist'];
            }
            if (
                (arr[0].type === 'engagementReda' && arr[1].type === 'collectReda') ||
                (arr[0].type === 'collectReda' && arr[1].type === 'engagementReda')
            ) {
                return background['Photographer'];
            }
            if (
                (arr[0].type === 'engagementReda' && arr[1].type === 'creationReda') ||
                (arr[0].type === 'creationReda' && arr[1].type === 'engagementReda')
            ) {
                return background['Designer'];
            }
            if (
                (arr[0].type === 'campaignReda' && arr[1].type === 'curationReda') ||
                (arr[0].type === 'curationReda' && arr[1].type === 'campaignReda')
            ) {
                return background['Architect'];
            }
            if (
                (arr[0].type === 'campaignReda' && arr[1].type === 'collectReda') ||
                (arr[0].type === 'collectReda' && arr[1].type === 'campaignReda')
            ) {
                return background['Engineer'];
            }
            if (
                (arr[0].type === 'campaignReda' && arr[1].type === 'creationReda') ||
                (arr[0].type === 'creationReda' && arr[1].type === 'campaignReda')
            ) {
                return background['Promotor'];
            }
            if (
                (arr[0].type === 'campaignReda' && arr[1].type === 'engagementReda') ||
                (arr[0].type === 'engagementReda' && arr[1].type === 'campaignReda')
            ) {
                return background['Supervisor'];
            }
            if (
                (arr[0].type === 'influReda' && arr[1].type === 'curationReda') ||
                (arr[0].type === 'curationReda' && arr[1].type === 'influReda')
            ) {
                return background['Mobilizer'];
            }
            if (
                (arr[0].type === 'influReda' && arr[1].type === 'collectReda') ||
                (arr[0].type === 'collectReda' && arr[1].type === 'influReda')
            ) {
                return background['Counselor'];
            }
            if (
                (arr[0].type === 'influReda' && arr[1].type === 'creationReda') ||
                (arr[0].type === 'creationReda' && arr[1].type === 'influReda')
            ) {
                return background['Musician'];
            }
            if (
                (arr[0].type === 'influReda' && arr[1].type === 'campaignReda') ||
                (arr[0].type === 'campaignReda' && arr[1].type === 'influReda')
            ) {
                return background['Motivator'];
            }
            if (
                (arr[0].type === 'influReda' && arr[1].type === 'engagementReda') ||
                (arr[0].type === 'engagementReda' && arr[1].type === 'influReda')
            ) {
                return background['Demonstrator'];
            }
        }
    }

    return (
        <div>
            {
                imgUrl && 
                <img src={imgUrl} alt="" />
            }
        </div>
    );
};

export default Character;
