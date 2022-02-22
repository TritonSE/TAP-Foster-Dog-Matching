/**
 * Dog Card Component
 *
 * @summary  Reusable card component for each dog with general info (age, breed, bio, etc.)
 * @author   Artyom Muradyan
 *
 */

import React from "react";
import love from "../images/love.png";
import like from "../images/like.png";
import dislike from "../images/dislike.png";
import "../dogcard.css";

function DogCard(props) {
  return (
    <div className="card-border">
      <div className="name"> {props.name} </div>
      <img className="image" src={props.image} alt="Cute dog!" />
      <img className="love" src={love} alt="Love" />
      <img className="like" src={like} alt="Like" />
      <img className="dislike" src={dislike} alt="Dislike" />
      <div className="age info-title">
        Age:
        <span className="info-text"> {props.age} </span>
      </div>
      <div className="gender info-title">
        Gender:
        <span className="info-text"> {props.gender} </span>
      </div>
      <div className="breed info-title">
        Breed:
        <span className="info-text"> {props.breed} </span>
      </div>
      <div className="weight info-title">
        Weight:
        <span className="info-text"> {props.weight} </span>
      </div>

      <div className="background info-title"> Background </div>
      <div className="background-text"> {props.background} </div>

      <div className="vetting info-title"> Vetting Information </div>
      <div className="vetting-text"> {props.vetting} </div>
    </div>
  );
}

export default DogCard;
