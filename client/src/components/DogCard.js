/**
 * Dog Card Component
 *
 * @summary  Reusable card component for each dog with general info (age, breed, bio, etc.)
 * @author   Artyom Muradyan, Parth Patel
 *
 */

import React from "react";
import styled from "styled-components";
import { device } from "../utils/useResponsive";
import Portal from "./Portal";
import { updateApplication } from "../services/application";

// image assets
import love from "../images/love.png";
import like from "../images/like.png";
import dislike from "../images/dislike.png";
import greenlove from "../images/greenlove.png";
import greenlike from "../images/greenlike.png";
import greendislike from "../images/greendislike.png";
import X from "../images/X.png";
import dogDefault from "../images/dog-default.png";

const DogInfoContainer = styled.div`
  width: 100%;
  height: 100%;

  background: #ffffff;
  border-radius: 20px;
  border: 5px solid #8dc442;
  box-sizing: border-box;
  border-radius: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 4%;
  overflow-y: scroll;

  position: relative;

  ${device.mobile} {
    flex-direction: column;
    align-items: center;
    gap: 3vh;
    overflow-y: scroll;
    height: 75vh;
    width: 90%;
    left: 5%;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  ${device.mobile} {
    width: 90%;
  }
`;

const Name = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 50px;
  color: #8dc442;
  margin-bottom: 3vh;

  ${device.mobile} {
    font-size: max(4.5vw, 20px);
  }
`;

const DogImg = styled.img`
  width: min(300px, 80%);
  height: min(300px, 80%);
`;

const PreferenceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4vw;
  margin-top: 3vh;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LikeImg = styled.img`
  width: 70px;
  cursor: pointer;
`;

const DogInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5vh;
  width: 45%;
  ${device.mobile} {
    width: 90%;
  }
`;

const InlineInfo = styled.p`
  font-weight: bold;
  font-size: 29px;
  max-width: 100%;
  color: #8dc442;
  margin: 0;

  ${device.mobile} {
    font-size: max(15px, 3vw);
    margin-bottom: 2vh;
  }
`;

const BlockInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MultilineInfo = styled.p`
  margin: 0;
  max-height: 10vh;
  min-height: 5vh;
  overflow-y: scroll;
`;

const XButton = styled.img`
  position: absolute;
  left: 15px;
  top: 15px;
  width: 25px;
  height: 25px;
`;

function DogCard(props) {
  const [preference, setPreference] = React.useState("");

  const updatePreference = (update) => {
    if (preference === update) return;

    setPreference(update);
    const temp = props.prefArr;
    temp[props.isOpen - 1] = update;
    updateApplication(props.appId, { preference: temp }).then((response) =>
      props.setApplicationState(response.data.application)
    );
  };

  // update initial preference
  React.useEffect(() => {
    setPreference(props.prefArr[props.isOpen - 1] || "");
  }, [props]);

  if (!props.isOpen) {
    return null;
  }

  return (
    <Portal>
      <DogInfoContainer>
        <XButton src={X} onClick={props.closeModal} />
        <Left>
          <Name> {props.name} </Name>
          <DogImg src={props.imageRef || dogDefault} alt="Cute dog!" />
          <PreferenceWrapper>
            <IconContainer>
              <LikeImg
                onClick={() => updatePreference("love")}
                src={preference === "love" ? greenlove : love}
                alt="Love"
              />
              <div>Love</div>
            </IconContainer>
            <IconContainer>
              <LikeImg
                onClick={() => updatePreference("like")}
                src={preference === "like" ? greenlike : like}
                alt="Like"
              />
              <div>Like</div>
            </IconContainer>
            <IconContainer>
              <LikeImg
                onClick={() => updatePreference("dislike")}
                src={preference === "dislike" ? greendislike : dislike}
                alt="Dislike"
              />
              <div>Dislike</div>
            </IconContainer>
          </PreferenceWrapper>
        </Left>

        <DogInfo>
          <InlineInfo>
            {" "}
            Age: <span style={{ color: "black", fontWeight: "normal" }}>{props.age}</span>{" "}
          </InlineInfo>
          <InlineInfo>
            Gender: <span style={{ color: "black", fontWeight: "normal" }}>{props.gender}</span>
          </InlineInfo>
          <InlineInfo>
            Breed: <span style={{ color: "black", fontWeight: "normal" }}>{props.breed}</span>
          </InlineInfo>
          <InlineInfo>
            Weight: <span style={{ color: "black", fontWeight: "normal" }}>{props.weight}</span>
          </InlineInfo>
          <BlockInfo>
            <InlineInfo> Background </InlineInfo>
            <MultilineInfo> {props.background} </MultilineInfo>
          </BlockInfo>
          <BlockInfo>
            <InlineInfo> Vetting Information </InlineInfo>
            <MultilineInfo> {props.vettingInfo} </MultilineInfo>
          </BlockInfo>
        </DogInfo>
      </DogInfoContainer>
    </Portal>
  );
}

export default DogCard;
